const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexMayuscula = /[A-Z]/;
const regexNumero = /[0-9]/;
const regexTelefono = /^[6789][0-9]{8}$/;

function aniosDesde(fechaTexto) {
  const fecha = new Date(fechaTexto);
  const hoy = new Date();
  return Math.floor((hoy - fecha) / (1000 * 60 * 60 * 24 * 365));
}

export function validarNombre(valor, min = 3, max = 40) {
  const texto = valor.trim();

  if (texto === "") {
    return "El nombre es obligatorio.";
  }

  if (texto.length < min || texto.length > max) {
    return `Debe tener entre ${min} y ${max} caracteres.`;
  }

  return null;
}

export function validarEmail(valor, max = 100) {
  const texto = valor.trim();

  if (texto === "") {
    return "El correo electrónico es obligatorio.";
  }

  if (texto.length > max || !regexEmail.test(texto)) {
    return "Introduce un correo electrónico válido.";
  }

  return null;
}

export function validarPassword(valor, min = 8, max = 50, obligatorio = true) {
  if (!obligatorio && valor === "") {
    return null;
  }

  if (valor === "") {
    return "La contraseña es obligatoria.";
  }

  if (valor.length < min || valor.length > max) {
    return `La contraseña debe tener al menos ${min} caracteres.`;
  }

  if (!regexMayuscula.test(valor)) {
    return "La contraseña debe tener al menos una mayúscula.";
  }

  if (!regexNumero.test(valor)) {
    return "La contraseña debe tener al menos un número.";
  }

  return null;
}

export function validarRepetirPassword(valor, passwordOriginal = "", obligatorio = true) {
  if (!obligatorio && valor === "" && passwordOriginal === "") {
    return null;
  }

  if (valor === "") {
    return "Debes repetir la contraseña.";
  }

  if (valor !== passwordOriginal) {
    return "Las contraseñas no coinciden.";
  }

  return null;
}

export function validarFechaNacimiento(valor, fechaMinima = "1930-01-01") {
  if (valor === "") {
    return "La fecha de nacimiento es obligatoria.";
  }

  const fechaNac = new Date(valor);
  const hoy = new Date();

  if (fechaNac > hoy) {
    return "La fecha de nacimiento no puede ser futura.";
  }

  if (fechaMinima && fechaNac < new Date(fechaMinima)) {
    return "Introduce una fecha de nacimiento válida.";
  }

  if (aniosDesde(valor) < 16) {
    return "Debes tener al menos 16 años para registrarte.";
  }

  return null;
}

export function validarCondiciones(marcado) {
  if (!marcado) {
    return "Debes aceptar las condiciones.";
  }

  return null;
}

export function validarTelefono(valor, esObligatorio = false) {
  const texto = valor.trim();

  if (texto === "") {
    if (esObligatorio) {
      return "El teléfono es obligatorio si marcas «Prefiero que me llaméis».";
    }
    return null;
  }

  if (!regexTelefono.test(texto)) {
    return "Teléfono no válido (debe tener 9 números y empezar por 6, 7, 8 o 9).";
  }

  return null;
}

export function validarMotivo(valor) {
  if (valor.trim() === "") {
    return "Selecciona un motivo de la lista.";
  }

  return null;
}

export function validarMensaje(valor, min = 15, max = 300) {
  const texto = valor.trim();

  if (texto === "") {
    return "El mensaje es obligatorio.";
  }

  if (texto.length < min || texto.length > max) {
    return `El mensaje debe tener entre ${min} y ${max} caracteres.`;
  }

  return null;
}
