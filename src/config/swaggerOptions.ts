export const swaggerOptions = {
    definition: {
        openapi: "3.0.0", // Versión de OpenAPI
        info: {
            title: "ePayco Wallet API",
            version: "1.0.0",
            description: "API REST para la billetera virtual de ePayco",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
            },
        ],
    },
    // Ruta(s) de los archivos que contienen anotaciones Swagger (ejemplo: JSDoc comments)
    apis: ["./src/routes/rest/*.ts", "./src/controllers/rest/*.ts"],
};
