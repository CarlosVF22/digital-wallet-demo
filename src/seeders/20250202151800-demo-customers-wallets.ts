"use strict";

import { QueryInterface } from "sequelize";

module.exports = {
    async up(queryInterface: QueryInterface) {
        // Insertar clientes de ejemplo con IDs explícitos para relacionar con las billeteras.
        await queryInterface.bulkInsert("Customers", [
            {
                id: 1,
                document: "123456789",
                name: "John Doe",
                email: "john@example.com",
                phone: "1234567890",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                document: "987654321",
                name: "Jane Smith",
                email: "jane@example.com",
                phone: "0987654321",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        // Insertar billeteras para cada cliente.
        await queryInterface.bulkInsert("Wallets", [
            {
                customerId: 1,
                balance: 5000.0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                customerId: 2,
                balance: 10000.0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface: QueryInterface) {
        // Eliminar primero las billeteras y luego los clientes para respetar las restricciones de claves foráneas.
        await queryInterface.bulkDelete("Wallets", {});
        await queryInterface.bulkDelete("Customers", {});
    },
};
