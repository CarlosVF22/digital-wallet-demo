import { Router } from "express";
import { paymentController } from "../../controllers/rest/paymentRestController";

const router = Router();

// Ruta para iniciar el pago
router.post("/initiate", paymentController.initiatePayment);

// (Opcional) Ruta para confirmar el pago en el futuro
// router.post("/confirm", paymentController.confirmPayment);

export default router;
