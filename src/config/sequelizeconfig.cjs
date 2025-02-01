module.exports = {
    development: {
        username: process.env.DB_USER || "user",
        password: process.env.DB_PASSWORD || "password",
        database: process.env.DB_NAME || "epayco_wallet",
        host: process.env.DB_HOST || "db",
        dialect: "postgres",
        port: parseInt(process.env.DB_PORT, 10) || 5432,
    },
    test: {
        username: process.env.DB_USER || "user",
        password: process.env.DB_PASSWORD || "password",
        database: process.env.DB_NAME || "epayco_wallet_test",
        host: process.env.DB_HOST || "db",
        dialect: "postgres",
        port: parseInt(process.env.DB_PORT, 10) || 5432,
    },
    production: {
        username: process.env.DB_USER || "user",
        password: process.env.DB_PASSWORD || "password",
        database: process.env.DB_NAME || "epayco_wallet_prod",
        host: process.env.DB_HOST || "db",
        dialect: "postgres",
        port: parseInt(process.env.DB_PORT, 10) || 5432,
    },
};
