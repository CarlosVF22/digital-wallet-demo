// src/models/Customer.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

// Interfaz para las propiedades que tiene el cliente
export interface CustomerAttributes {
    id: number;
    document: string;
    name: string;
    email: string;
    phone: string;
}

// Interfaz para la creación (id es opcional ya que es autogenerado)
export interface CustomerCreationAttributes
    extends Optional<CustomerAttributes, "id"> {}

class Customer
    extends Model<CustomerAttributes, CustomerCreationAttributes>
    implements CustomerAttributes
{
    public id!: number;
    public document!: string;
    public name!: string;
    public email!: string;
    public phone!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Customer.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        document: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "Customers",
        timestamps: true,
    }
);

export default Customer;
