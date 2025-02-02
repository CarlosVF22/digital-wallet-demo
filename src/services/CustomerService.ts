import Customer from "../models/Customer.model";

interface CustomerData {
    document: string;
    name: string;
    email: string;
    phone: string;
}

export async function registerCustomer(CustomerData: CustomerData) {
    const existing = await Customer.findOne({
        where: { email: CustomerData.email },
    });
    if (existing) {
        throw new Error("El cliente ya existe");
    }

    // Crear y retornar el nuevo Customer
    const newCustomer = await Customer.create(CustomerData);
    return newCustomer;
}
