import { conexao } from "./db.js";

export async function listarUsuarios() {
  const [usuario] = await conexao.execute("SELECT * FROM usuario");
  return usuario || null;
}

export async function buscarUsuarioPorEmail(email) {
  const [usuario] = await conexao.execute(
    "SELECT * FROM usuario WHERE email = ?",
    [email],
  );

  return usuario[0] || null;
}

export async function buscarUsuarioPorCelular(celular) {
  const [usuario] = await conexao.execute(
    "SELECT * FROM usuario WHERE celular = ?",
    [celular],
  );

  return usuario[0] || null;
}
export async function buscarUsuarioPorId(id) {
  const [usuarios] = await conexao.execute(
    "SELECT * FROM usuario WHERE id = ?",
    [id],
  );

  return usuarios[0] || null;
}
export async function excluirUsuarioPorEmail(email) {
  const [resultado] = await conexao.execute(
    "DELETE FROM usuario WHERE email = ?",
    [email],
  );

  return resultado;
}
export async function criarUsuario(usuario) {
  const resultado = await conexao.execute(
    `INSERT INTO usuario
    (id, nome, celular, email, senha)
    VALUES (?, ?, ?, ?, ?)`,
    [usuario.id, usuario.nome, usuario.celular, usuario.email, usuario.senha],
  );
  return resultado.insertId;
}
