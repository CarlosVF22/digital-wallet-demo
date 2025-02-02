// src/interfaces/payment.interface.ts
import { Optional } from "sequelize";

export interface IPayment {
    id: number;
    sessionId: string;
    amount: number;
    customerId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPaymentCreationAttributes extends Optional<IPayment, "id"> {}
