import { Router } from "express";
import customerRoutes from "./customer.routes";
import walletRoutes from "./wallet.routes";

const router = Router();

router.use("/customer", customerRoutes);
router.use("/wallet", walletRoutes);

export default router;
