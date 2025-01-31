import express, { Application, Request, Response } from "express";
import cors from "cors";

// Importar tus rutas
// import { clientRoutes } from './routes/rest/client.routes';
// import { walletRoutes } from './routes/rest/wallet.routes';

export function startServer() {
    const app: Application = express();

    // Puedes obtener el puerto de las variables de entorno (por defecto 3000)
    const port = process.env.PORT || 3000;

    // Middlewares
    app.use(cors());
    app.use(express.json());

    // Rutas REST (ejemplo)
    // app.use('/api/client', clientRoutes);
    // app.use('/api/wallet', walletRoutes);

    // Endpoint de prueba
    app.get("/", (req: Request, res: Response) => {
        res.json({ message: "¡Servidor en funcionamiento !!!!!" });
    });

    // Iniciamos el servidor
    app.listen(port, () => {
        console.log(`Servidor escuchando en el puerto: ${port}`);
    });
}
