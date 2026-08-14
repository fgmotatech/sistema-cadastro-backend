import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "2h";

if (!JWT_SECRET) {
  console.warn(
    "[AVISO] JWT_SECRET não foi definido no ambiente. Defina essa variável antes de subir para produção.",
  );
}

export function gerarToken(usuario) {
  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );
}

export function verificarToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
