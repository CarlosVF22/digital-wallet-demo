"use strict";

import { QueryInterface, DataTypes } from "sequelize";

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.createTable("Payments", {
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
        await queryInterface.dropTable("Payments");
    },
};
