import { Router } from "express";
import customerRoutes from "./customer.routes";
import walletRoutes from "./wallet.routes";
import paymentRoutes from "./payment.routes";

const router = Router();

router.use("/customer", customerRoutes);
router.use("/wallet", walletRoutes);
router.use("/payment", paymentRoutes);

export default router;
