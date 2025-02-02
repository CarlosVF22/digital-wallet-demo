import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./swaggerOptions";

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
