"use strict";

import { QueryInterface, DataTypes } from "sequelize";

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.createTable("Customers", {
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
            // Campos de auditoría (si deseas mantener createdAt y updatedAt):
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: new Date(), // o Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: new Date(),
            },
        });
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.dropTable("Customers");
    },
};
