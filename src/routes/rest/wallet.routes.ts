import { Router } from "express";
import { walletController } from "../../controllers/rest/walletRestController";

const router = Router();

// Ruta para recargar la billetera vía REST
router.post("/recharge", walletController.rechargeWallet);
router.get("/test", (req, res) => {
    res.json({ message: "Wallet test route working" });
});

export default router;
