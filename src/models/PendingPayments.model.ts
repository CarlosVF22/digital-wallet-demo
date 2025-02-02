import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import {
    IPendingPayment,
    IPendingPaymentCreationAttributes,
} from "../interfaces/pendingPayment.interface";

class PendingPayment
    extends Model<IPendingPayment, IPendingPaymentCreationAttributes>
    implements IPendingPayment
{
    public sessionId!: string;
    public token!: string;
    public amount!: number;
    public expiresAt!: Date;
    public customerId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PendingPayment.init(
    {
        sessionId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        customerId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "Customers", // Nombre de la tabla de clientes
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
    },
    {
        sequelize,
        tableName: "PendingPayments",
        timestamps: true,
    }
);

export default PendingPayment;
