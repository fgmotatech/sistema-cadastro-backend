import { Router } from "express";
import rateLimit from "express-rate-limit";

import { login } from "../controllers/authController.js";

const router = Router();

const limitadorLogin = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 5, // no máximo 5 tentativas por IP nesse período
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    erro: "MUITAS_TENTATIVAS",
    mensagem: "Muitas tentativas de login. Tente novamente em alguns minutos.",
  },
});

router.post("/", limitadorLogin, login);


export default router;
