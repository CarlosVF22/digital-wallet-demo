import express, { Application, Request, Response } from "express";
import cors from "cors";
import restRoutes from "./routes/rest";
import { initSoapServer } from "./routes/soap/soapServer";

export function startServer() {
    const app: Application = express();

    const port = process.env.PORT || 3000;

    // Middlewares
    app.use(cors());
    app.use(express.json());

    // Rutas REST
    app.use("/api/v1", restRoutes);

    // servidor SOAP
    initSoapServer(app);

    // Endpoint de prueba
    app.get("/", (req: Request, res: Response) => {
        res.json({ message: "¡Servidor en funcionamiento !" });
    });

    // Iniciamos el servidor
    app.listen(port, () => {
        console.log(`Servidor escuchando en el puerto: ${port}`);
    });
}
