import { Optional } from "sequelize";

export interface IPendingPayment {
    sessionId: string;
    token: string;
    amount: number;
    expiresAt: Date;
    customerId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPendingPaymentCreationAttributes
    extends Optional<IPendingPayment, "sessionId"> {}
