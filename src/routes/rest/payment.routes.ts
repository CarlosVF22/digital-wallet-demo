import { Router } from "express";
import { paymentController } from "../../controllers/rest/paymentRestController";

const router = Router();

/**
 * @swagger
 * /payment/initiate:
 *   post:
 *     summary: Inicia el proceso de pago.
 *     description: Inicia un proceso de pago validando el documento, teléfono y valor de la compra. Se genera un token y un sessionId que se envían al email del cliente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *               phone:
 *                 type: string
 *               value:
 *                 type: number
 *             example:
 *               document: "123456789"
 *               phone: "31783931110"
 *               value: 2000
 *     responses:
 *       200:
 *         description: Proceso de pago iniciado; se ha enviado el token al email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 cod_error:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.post("/initiate", paymentController.initiatePayment);

/**
 * @swagger
 * /payment/confirm:
 *   get:
 *     summary: Confirma el pago.
 *     description: Confirma un pago validando el sessionId y el token enviados al email. Los parámetros se envían por query.
 *     parameters:
 *       - in: query
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: El identificador de sesión generado al iniciar el pago.
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: El token de 6 dígitos enviado al email.
 *     responses:
 *       200:
 *         description: Pago confirmado y procesado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 cod_error:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.get("/confirm", paymentController.confirmPayment);

/**
 * @swagger
 * /payment/test:
 *   get:
 *     summary: Ruta de prueba del módulo de pagos.
 *     description: Retorna un mensaje simple para verificar que la ruta de pagos está funcionando.
 *     responses:
 *       200:
 *         description: Respuesta exitosa con un mensaje.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "¡Ruta de prueba!"
 */
router.get("/test", (req, res) => {
    res.json({ message: "¡Ruta de prueba!" });
});

export default router;
