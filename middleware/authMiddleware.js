import { verificarToken } from "../utils/token.js";

export function exigirAutenticacao(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      erro: "NAO_AUTENTICADO",
      mensagem: "Token não informado.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verificarToken(token);
    req.usuario = payload;
    next();
  } catch (erro) {
    return res.status(401).json({
      erro: "TOKEN_INVALIDO",
      mensagem: "Sessão inválida ou expirada. Faça login novamente.",
    });
  }

}
