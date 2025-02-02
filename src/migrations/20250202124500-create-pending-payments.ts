"use strict";

import { QueryInterface, DataTypes } from "sequelize";

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.createTable("PendingPayments", {
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
                    model: "Customers",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
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
        await queryInterface.dropTable("PendingPayments");
    },
};
