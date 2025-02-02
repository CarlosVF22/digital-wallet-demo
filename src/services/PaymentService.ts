import Customer from "../models/Customer.model";
import Wallet from "../models/Wallet.model";
import { generateToken } from "../utils/tokenGenerator";
import { sendEmail } from "../utils/emailSender";
import { v4 as uuidv4 } from "uuid";

// Interfaz para la solicitud de pago
interface PaymentData {
    document: string;
    phone: string;
    value: number;
}

// Almacenamiento en memoria para pagos pendientes (en producción usar BD)
const pendingPayments: Record<
    string,
    { token: string; amount: number; expiresAt: Date; customerId: number }
> = {};

/**
 * Inicia el proceso de pago:
 *  - Verifica que el cliente exista y que la billetera tenga saldo suficiente.
 *  - Genera un token de 6 dígitos y un id de sesión (UUID).
 *  - Envía el token al email del cliente.
 *  - Retorna el id de sesión.
 */
export async function initiatePayment(data: PaymentData) {
    const { document, phone, value } = data;

    // Buscar el cliente
    const customer = await Customer.findOne({ where: { document, phone } });
    if (!customer) {
        throw new Error("Customer not found");
    }

    // Buscar la billetera asociada al cliente
    const wallet = await Wallet.findOne({
        where: { customerId: customer.getDataValue("id") },
    });
    if (!wallet) {
        throw new Error("Wallet not found");
    }

    // Verificar saldo suficiente
    const currentBalance = parseFloat(
        wallet.getDataValue("balance").toString()
    );
    if (currentBalance < value) {
        throw new Error("Insufficient balance");
    }

    // Generar token de 6 dígitos y session id
    const token = generateToken();
    const sessionId = uuidv4();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Expira en 10 minutos

    // Almacenar el pago pendiente
    pendingPayments[sessionId] = {
        token,
        amount: value,
        expiresAt,
        customerId: customer.getDataValue("id"),
    };

    // Enviar el token por email usando Resend
    const email = customer.getDataValue("email");
    const subject = "Este es tu token de confirmación de pago";
    const body = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">Confirmación de Pago</h2>
        <p>Hola,</p>
        <p>Gracias por tu compra. Aquí tienes tu token de confirmación de pago:</p>
        <p style="font-size: 1.2em; font-weight: bold; color: #FF5722;">${token}</p>
        <p>Por favor, utiliza el siguiente ID de sesión para confirmar tu compra:</p>
        <p style="font-size: 1.2em; font-weight: bold; color: #FF5722;">${sessionId}</p>
        <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
        <p>Gracias,</p>
    </div>
`;
    await sendEmail(email, subject, body);

    // Retornar el id de sesión y un mensaje
    return { sessionId, message: "Token sent via email" };
}

/**
 * (Opcional) Función para confirmar el pago.
 * Se espera que se envíe el sessionId y el token recibido.
 */
export async function confirmPayment(sessionId: string, token: string) {
    const pending = pendingPayments[sessionId];
    if (!pending) {
        throw new Error("Invalid session id");
    }

    // Verificar expiración
    if (pending.expiresAt < new Date()) {
        delete pendingPayments[sessionId];
        throw new Error("Session expired");
    }

    if (pending.token !== token) {
        throw new Error("Invalid token");
    }

    // descontar el monto de la billetera
    const wallet = await Wallet.findOne({
        where: { customerId: pending.customerId },
    });
    if (!wallet) {
        throw new Error("Wallet not found");
    }
    const currentBalance = parseFloat(
        wallet.getDataValue("balance").toString()
    );
    const newBalance = currentBalance - pending.amount;
    await wallet.update({ balance: parseFloat(newBalance.toFixed(2)) });

    // Eliminar el registro pendiente
    delete pendingPayments[sessionId];

    return { message: "Payment confirmed and processed" };
}

// Exportamos pendingPayments para fines de depuración si es necesario
export { pendingPayments };
