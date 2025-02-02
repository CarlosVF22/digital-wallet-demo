"use strict";

import { QueryInterface, DataTypes } from "sequelize";

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.createTable("Wallets", {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
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
            balance: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0.0,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: new Date(),
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: new Date(),
            },
        });
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.dropTable("Wallets");
    },
};
