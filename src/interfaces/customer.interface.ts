// src/interfaces/customer.interface.ts
import { Optional } from "sequelize";

export interface CustomerAttributes {
    id: number;
    document: string;
    name: string;
    email: string;
    phone: string;
}

export interface CustomerCreationAttributes
    extends Optional<CustomerAttributes, "id"> {}
