import { Router } from "express";
import { customerController } from "../../controllers/rest/customerRestController";

const router = Router();

router.post("/register", customerController.registerCustomer);
router.get("/test", (req, res) => {
    res.json({ message: "¡Ruta de prueba!" });
});

export default router;
