import Customer from "../models/Customer.model";
import Wallet from "../models/Wallet.model";
import PendingPayment from "../models/PendingPayments.model";
import { generateToken } from "../utils/tokenGenerator";
import { sendEmail } from "../utils/emailSender";
import { v4 as uuidv4 } from "uuid";

interface PaymentData {
    document: string;
    phone: string;
    value: number;
}

/**
 * Inicia el proceso de pago:
 *  - Verifica que el cliente exista y que la billetera tenga saldo suficiente.
 *  - Genera un token de 6 dígitos y un id de sesión (UUID).
 *  - Envía el token al email del cliente.
 *  - Almacena el pago pendiente en la base de datos.
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

    // Almacenar el pago pendiente en la base de datos
    await PendingPayment.create({
        sessionId,
        token,
        amount: value,
        expiresAt,
        customerId: customer.getDataValue("id"),
    });

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
 * Confirma el pago dado un sessionId y un token:
 *  - Consulta el pago pendiente en la base de datos.
 *  - Verifica expiración y validez del token.
 *  - Si es correcto, descuenta el monto de la billetera y elimina el registro pendiente.
 */
export async function confirmPayment(sessionId: string, token: string) {
    const pending = await PendingPayment.findOne({ where: { sessionId } });
    if (!pending) {
        throw new Error("Invalid session id");
    }

    if (pending.getDataValue("expiresAt") < new Date()) {
        await pending.destroy();
        throw new Error("Session expired");
    }

    if (pending.getDataValue("token") !== token) {
        throw new Error("Invalid token");
    }

    // Descontar el monto de la billetera
    const wallet = await Wallet.findOne({
        where: { customerId: pending.getDataValue("customerId") },
    });
    if (!wallet) {
        throw new Error("Wallet not found");
    }
    const currentBalance = parseFloat(
        wallet.getDataValue("balance").toString()
    );
    const newBalance = currentBalance - pending.getDataValue("amount");
    await wallet.update({ balance: Number(newBalance.toFixed(2)) });

    // Eliminar el registro pendiente
    await pending.destroy();

    return { message: "Payment confirmed and processed" };
}
