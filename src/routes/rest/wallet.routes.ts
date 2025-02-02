import { Router } from "express";
import { walletController } from "../../controllers/rest/walletRestController";

const router = Router();

/**
 * @swagger
 * /wallet/recharge:
 *   post:
 *     summary: Recargar la billetera.
 *     description: Permite recargar la billetera enviando el documento, el número de teléfono y el valor a recargar.
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
 *         description: Billetera recargada exitosamente.
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
router.post("/recharge", walletController.rechargeWallet);

/**
 * @swagger
 * /wallet/balance:
 *   get:
 *     summary: Consultar el saldo de la billetera.
 *     description: Permite consultar el saldo de la billetera enviando el documento y el número de teléfono como parámetros de consulta.
 *     parameters:
 *       - in: query
 *         name: document
 *         required: true
 *         schema:
 *           type: string
 *         description: Documento del cliente.
 *       - in: query
 *         name: phone
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de teléfono del cliente.
 *     responses:
 *       200:
 *         description: Saldo consultado exitosamente.
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
 *             example:
 *               success: true
 *               cod_error: "00"
 *               message: "Balance retrieved successfully"
 *               data:
 *                 balance: "5000.00"
 *                 createdAt: "2025-02-02T15:00:00.000Z"
 *                 updatedAt: "2025-02-02T15:00:00.000Z"
 */
router.get("/balance", walletController.consultBalance);

/**
 * @swagger
 * /wallet/test:
 *   get:
 *     summary: Ruta de prueba para billetera.
 *     description: Retorna un mensaje simple para verificar que la ruta de billetera funciona.
 *     responses:
 *       200:
 *         description: Mensaje de prueba.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Wallet test route working"
 */
router.get("/test", (req, res) => {
    res.json({ message: "Wallet test route working" });
});

export default router;
