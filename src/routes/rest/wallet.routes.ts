import { Router } from "express";
import { walletController } from "../../controllers/rest/walletRestController";

const router = Router();

router.post("/recharge", walletController.rechargeWallet);
router.get("/balance", walletController.consultBalance);
router.get("/test", (req, res) => {
    res.json({ message: "Wallet test route working" });
});

export default router;
