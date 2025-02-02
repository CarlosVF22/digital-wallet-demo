import Customer from "../models/Customer.model";

interface CustomerData {
    document: string;
    name: string;
    email: string;
    phone: string;
}

export async function registerCustomer(CustomerData: CustomerData) {
    const existingEmail = await Customer.findOne({
        where: { email: CustomerData.email },
    });
    if (existingEmail) {
        throw new Error("El email ya existe");
    }

    const existingPhone = await Customer.findOne({
        where: { phone: CustomerData.phone },
    });
    if (existingPhone) {
        throw new Error("El número de teléfono ya existe");
    }

    // Crear y retornar el nuevo Customer
    const newCustomer = await Customer.create(CustomerData);
    return newCustomer;
}
