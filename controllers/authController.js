import bcrypt from "bcrypt";
import { buscarUsuarioPorEmail } from "../db/usuarios.js";

import { gerarToken } from "../utils/token.js";

export async function login(req, res) {
  try {
    const { email, senha } = req.body ?? {};

    if (!email || !senha) {
      return res.status(400).json({
        erro: "DADOS_INVALIDOS",
        mensagem: "Informe email e senha.",
      });
    }

    const usuario = await buscarUsuarioPorEmail(email);

    if (!usuario) {
      return res.status(401).json({
        erro: "LOGIN_INVALIDO",
        mensagem: "Email ou senha incorretos.",
      });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({
        erro: "LOGIN_INVALIDO",
        mensagem: "Email ou senha incorretos.",
      });
    }

    const { senha: _senha, ...usuarioSemSenha } = usuario;

    const token = gerarToken(usuario);

    return res.json({
      mensagem: "Login realizado com sucesso.",
      token,
      usuario: usuarioSemSenha,
    });
  } catch (erro) {
    console.error("Erro no login:", erro);

    return res.status(500).json({
      erro: "ERRO_INTERNO",
      mensagem: "Erro ao realizar login.",
    });
  }
}
