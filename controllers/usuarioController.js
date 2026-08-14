import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

import {
  buscarUsuarioPorId,
  buscarUsuarioPorEmail,
  buscarUsuarioPorCelular,
  criarUsuario,
  excluirUsuarioPorEmail,
} from "../db/usuarios.js";

import { validarDados } from "../validators/usuarioValidator.js";

export async function obterUsuarioLogado(req, res) {
  try {
    const usuario = await buscarUsuarioPorEmail(req.usuario.email);

    if (!usuario) {
      return res.status(404).json({
        erro: "USUARIO_NAO_ENCONTRADO",
        mensagem: "Usuário não encontrado.",
      });
    }

    const { senha: _senha, ...usuarioSemSenha } = usuario;

    return res.json({ usuario: usuarioSemSenha });
  } catch (erro) {
    console.error("Erro ao obter usuário logado:", erro);

    return res.status(500).json({
      erro: "ERRO_INTERNO",
      mensagem: "Não foi possível obter os dados do usuário.",
    });
  }
}

const SALT_ROUNDS = 10;

export async function cadastrarUsuario(req, res) {
  try {
    const { nomeCompleto, celular, email, senha } = req.body ?? {};

    const erroValidacao = validarDados({
      nomeCompleto,
      celular,
      email,
      senha,
    });

    if (erroValidacao) {
      return res.status(400).json({
        erro: "DADOS_INVALIDOS",
        mensagem: erroValidacao,
      });
    }

    const emailNormalizado = email.trim().toLowerCase();

    const celularLimpo = celular.replace(/\D/g, "");

    const emailExiste = await buscarUsuarioPorEmail(emailNormalizado);

    if (emailExiste) {
      return res.status(409).json({
        erro: "EMAIL_EXISTE",
        mensagem: "Este email já está cadastrado.",
      });
    }

    const celularExiste = await buscarUsuarioPorCelular(celularLimpo);

    if (celularExiste) {
      return res.status(409).json({
        erro: "CELULAR_EXISTE",
        mensagem: "Este celular já está cadastrado.",
      });
    }

    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

    const novoUsuario = {
      id: randomUUID(),

      nome: nomeCompleto.trim(),

      celular: celularLimpo,

      email: emailNormalizado,

      senha: senhaHash,

      criadoEm: new Date().toISOString(),
    };
    await criarUsuario(novoUsuario);

    const { senha: _senha, ...usuarioSemSenha } = novoUsuario;

    return res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso.",

      usuario: usuarioSemSenha,
    });
  } catch (erro) {
    console.error("Erro ao cadastrar usuário:", erro);

    return res.status(500).json({
      erro: "ERRO_INTERNO",

      mensagem: "Não foi possível concluir o cadastro.",
    });
  }
}
export async function excluirUsuario(req, res) {
  try {
    const email = req.usuario?.email;

    if (!email) {
      return res.status(401).json({
        erro: "NAO_AUTENTICADO",
        mensagem: "Usuário não autenticado.",
      });
    }

    const resultado = await excluirUsuarioPorEmail(email);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        erro: "USUARIO_NAO_ENCONTRADO",
        mensagem: "Usuário não encontrado.",
      });
    }

    return res.status(200).json({
      mensagem: "Usuário excluído com sucesso.",
    });
  } catch (erro) {
    console.error("Erro ao excluir usuário:", erro);

    return res.status(500).json({
      erro: "ERRO_INTERNO",
      mensagem: "Erro ao excluir usuário.",
    });
  }
}
