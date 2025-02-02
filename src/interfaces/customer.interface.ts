import { Optional } from "sequelize";

export interface ICustomer {
    id: number;
    document: string;
    name: string;
    email: string;
    phone: string;
}

export interface ICustomerCreationAttributes
    extends Optional<ICustomer, "id"> {}
