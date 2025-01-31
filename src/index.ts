import dotenv from "dotenv";
dotenv.config();

import { startServer } from "./server";
// Aquí podrías importar la conexión a la BD si fuera necesario, por ejemplo:
import { connectDB } from "./config/database";

// Función principal para iniciar la aplicación
async function main() {
    try {
        // Inicializar la conexión a la base de datos, si es asíncrono
        await connectDB();

        // Arrancamos el servidor
        startServer();
    } catch (error) {
        console.error("Error al iniciar la aplicación:", error);
        process.exit(1);
    }
}

// Ejecutamos la función principal
main();
