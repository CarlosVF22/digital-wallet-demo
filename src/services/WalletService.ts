import Customer from "../models/Customer.model";
import Wallet from "../models/Wallet.model";

interface RechargeData {
    document: string;
    phone: string;
    value: number;
}

export async function rechargeWallet(data: RechargeData) {
    const { document, phone, value } = data;

    // Buscar el cliente por documento y teléfono
    const customer = await Customer.findOne({ where: { document, phone } });
    if (!customer) {
        throw new Error("Customer not found");
    }

    // Buscar la billetera asociada al cliente usando customerId
    let wallet = await Wallet.findOne({
        where: { customerId: customer.getDataValue("id") },
    });
    if (!wallet) {
        // Si no existe, se crea una nueva billetera con balance "0.00"
        wallet = await Wallet.create({
            customerId: customer.getDataValue("id"),
            balance: 0.0,
        });
    }

    // Convertir el balance actual (que puede venir como string) a número
    const currentBalance = parseFloat(
        wallet.getDataValue("balance").toString()
    );
    // Sumar el valor de la recarga
    const newBalance = currentBalance + value;
    // Actualizar la billetera formateando el balance a dos decimales
    await wallet.update({ balance: parseFloat(newBalance.toFixed(2)) });

    // Obtener la billetera actualizada
    const updatedWallet = wallet.toJSON();

    return {
        id: updatedWallet.id,
        customerId: updatedWallet.customerId,
        balance: updatedWallet.balance,
        createdAt: updatedWallet.createdAt,
        updatedAt: updatedWallet.updatedAt,
    };
}

export async function consultBalance(document: string, phone: string) {
    // Buscar el cliente por documento y teléfono
    const customer = await Customer.findOne({ where: { document, phone } });
    if (!customer) {
        throw new Error("Customer not found");
    }

    // Buscar la billetera asociada al cliente (usando customerId)
    const wallet = await Wallet.findOne({
        where: { customerId: customer.getDataValue("id") },
    });
    if (!wallet) {
        throw new Error("Wallet not found");
    }

    // Retornar la información relevante del saldo
    return {
        balance: wallet.getDataValue("balance"),
        createdAt: wallet.getDataValue("createdAt"),
        updatedAt: wallet.getDataValue("updatedAt"),
    };
}
