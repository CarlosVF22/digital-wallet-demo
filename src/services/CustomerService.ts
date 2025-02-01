import Customer from "../models/Customer.model";

interface CustomerData {
    document: string;
    name: string;
    email: string;
    phone: string;
}

export async function registerCustomer(CustomerData: CustomerData) {
    //verificar si ya existe un cliente con el mismo email
    const existing = await Customer.findOne({
        where: { email: CustomerData.email },
    });
    if (existing) {
        throw new Error("El cliente ya existe");
    }

    // Crear y retornar el nuevo Customere
    const newCustomer = await Customer.create(CustomerData);
    return newCustomer;
}
