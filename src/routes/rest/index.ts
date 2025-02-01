import { Router } from "express";
import customerRoutes from "./customer.routes";
// import walletRoutes from './wallet.routes'; // Si ya tienes rutas para wallet

const router = Router();

router.use("/customer", customerRoutes);
// router.use('/wallet', walletRoutes); // Puedes agregar otras rutas según convenga

export default router;
