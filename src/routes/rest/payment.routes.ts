import { Router } from "express";
import { paymentController } from "../../controllers/rest/paymentRestController";

const router = Router();

// Ruta para iniciar el pago
router.post("/initiate", paymentController.initiatePayment);

router.get("/confirm", paymentController.confirmPayment);

export default router;
