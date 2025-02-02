import { Router } from "express";
import { customerController } from "../../controllers/rest/customerRestController";

const router = Router();

/**
 * @swagger
 * /customer/register:
 *   post:
 *     summary: Registra un nuevo cliente.
 *     description: Crea un nuevo cliente recibiendo documento, name, email y phone.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 cod_error:
 *                   type: string
 *                 message_error:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.post("/register", customerController.registerCustomer);

/**
 * @swagger
 * customer/test:
 *   get:
 *     summary: Ruta de prueba
 *     description: Retorna un mensaje de prueba.
 *     responses:
 *       200:
 *         description: Éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ¡Ruta de prueba!
 */
router.get("/test", (req, res) => {
    res.json({ message: "¡Ruta de prueba!" });
});

export default router;
