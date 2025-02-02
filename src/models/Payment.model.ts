import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import {
    IPayment,
    IPaymentCreationAttributes,
} from "../interfaces/payment.interface";

class Payment
    extends Model<IPayment, IPaymentCreationAttributes>
    implements IPayment
{
    public id!: number;
    public sessionId!: string;
    public amount!: number;
    public customerId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Payment.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        sessionId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        customerId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "Customers",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
    },
    {
        sequelize,
        tableName: "Payments",
        timestamps: true,
    }
);

export default Payment;
