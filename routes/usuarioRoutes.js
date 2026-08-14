import { Router } from "express";
import {
  cadastrarUsuario,
  obterUsuarioLogado,
  excluirUsuario,
} from "../controllers/usuarioController.js";
import { exigirAutenticacao } from "../middleware/authMiddleware.js";
import rateLimit from "express-rate-limit";

const router = Router();


const limitadorCadastro = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 5, // no máximo 5 tentativas por IP nesse período
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    erro: "MUITAS_TENTATIVAS",
    mensagem: "Muitas tentativas. Tente novamente em alguns minutos.",
  },
});

router.post("/",limitadorCadastro, cadastrarUsuario);

router.get("/me", exigirAutenticacao, obterUsuarioLogado);

router.delete("/me", exigirAutenticacao, excluirUsuario);
export default router;
