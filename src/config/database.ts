import { Sequelize } from "sequelize";

// Obtenemos las variables de entorno
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || "5432";
const dbName = process.env.DB_NAME || "epayco_wallet";
const dbUser = process.env.DB_USER || "user";
const dbPassword = process.env.DB_PASSWORD || "password";

// Creamos la instancia de Sequelize para PostgreSQL
export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: Number(dbPort),
    dialect: "postgres",
});

export async function connectDB(): Promise<void> {
    try {
        await sequelize.authenticate();
        console.log("Conexión a la base de datos establecida correctamente.");
    } catch (error) {
        console.error("No se pudo conectar a la base de datos:", error);
        process.exit(1);
    }
}
