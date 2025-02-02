import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { IWallet } from "../interfaces/wallet.interface";

class Wallet extends Model<IWallet> implements IWallet {
    public id!: number;
    public customerId!: number;
    public balance!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Wallet.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        customerId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        balance: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.0,
        },
    },
    {
        sequelize,
        tableName: "Wallets",
        timestamps: true,
    }
);

export default Wallet;
