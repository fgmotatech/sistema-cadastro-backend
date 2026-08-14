export function validarDados({ nomeCompleto, celular, email, senha }) {
  // ==================== NOME ====================

  if (
    typeof nomeCompleto !== "string" ||
    nomeCompleto.trim().length < 3 ||
    /[^a-zA-ZÀ-ÿ\s]/.test(nomeCompleto)
  ) {
    return "Nome inválido.";
  }

  // ==================== CELULAR ====================

  const celularLimpo = celular?.replace(/\D/g, "");

  if (
    typeof celular !== "string" ||
    celularLimpo.length < 10 ||
    celularLimpo.length > 11
  ) {
    return "Celular inválido.";
  }

  // ==================== EMAIL ====================

  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    return "Email inválido.";
  }

  // ==================== SENHA ====================

  if (
    typeof senha !== "string" ||
    !/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&*(),.?":{}|<>])\S{7,}$/.test(senha)
  ) {
    return "A senha deve ter pelo menos 7 caracteres, uma letra maiúscula, um número e um caractere especial.";
  }

  return null;
}