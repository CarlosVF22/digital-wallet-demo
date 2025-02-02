import dotenv from "dotenv";
dotenv.config();
import { startServer } from "./server";
import { connectDB } from "./config/database";

// Función principal para iniciar la aplicación
async function main() {
    try {
        // Inicializar la conexión a la base de datos
        await connectDB();

        // Arrancamos el servidor
        startServer();
    } catch (error) {
        console.error("Error al iniciar la aplicación:", error);
        process.exit(1);
    }
}
main();
