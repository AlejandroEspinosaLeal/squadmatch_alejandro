import {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  borrar,
} from "./almacen.js";
import {
  validarNombre,
  validarEmail,
  validarPassword,
  validarRepetirPassword,
  validarFechaNacimiento,
  validarCondiciones,
  validarTelefono,
  validarMotivo,
  validarMensaje,
} from "./validacion.js";
import {
  pintarListado,
  pintarUsuarios,
  pintarMensajes,
  mostrarErrorCampo,
  limpiarErroresFormulario,
} from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  iniciarJugadores();
  iniciarRegistroUsuarios();
  iniciarContacto();
});

function formatearFechaISO(fechaTexto) {
  const fecha = new Date(fechaTexto);
  const anio = fecha.getFullYear();
  const mesNum = fecha.getMonth() + 1;
  const diaNum = fecha.getDate();
  const mes = mesNum < 10 ? `0${mesNum}` : `${mesNum}`;
  const dia = diaNum < 10 ? `0${diaNum}` : `${diaNum}`;
  return `${anio}-${mes}-${dia}`;
}

function iniciarJugadores() {
  const contenedor = document.querySelector("#listado-jugadores");
  if (!contenedor) {
    return;
  }

  const listaJugadores = obtenerTodos("jugadores");
  pintarListado(listaJugadores);
}

function iniciarRegistroUsuarios() {
  const formRegistro = document.querySelector("#form-registro");
  const contenedorUsuarios = document.querySelector("#listado-usuarios");

  if (!formRegistro || !contenedorUsuarios) {
    return;
  }

  const inputUsername = document.querySelector("#reg-username");
  const inputEmail = document.querySelector("#reg-email");
  const inputPassword = document.querySelector("#reg-password");
  const inputPassword2 = document.querySelector("#reg-password2");
  const inputFecha = document.querySelector("#reg-fecha");
  const inputCondiciones = document.querySelector("#reg-condiciones");
  const tituloForm = document.querySelector("#titulo-form-registro");
  const btnSubmit = document.querySelector("#btn-submit-registro");
  const btnCancelar = document.querySelector("#btn-cancelar-edicion");

  const campos = [
    inputUsername,
    inputEmail,
    inputPassword,
    inputPassword2,
    inputFecha,
    inputCondiciones,
  ];

  let camposTocados = {};
  let idEditando = null;

  pintarUsuarios(obtenerTodos("usuarios"));

  function revisarCampoRegistro(campo) {
    let error = null;

    if (campo.id === "reg-username") {
      const min = Number.parseInt(inputUsername.getAttribute("minlength"));
      const max = Number.parseInt(inputUsername.getAttribute("maxlength"));
      error = validarNombre(inputUsername.value, min, max);
    }

    if (campo.id === "reg-email") {
      const max = Number.parseInt(inputEmail.getAttribute("maxlength"));
      error = validarEmail(inputEmail.value, max);
    }

    if (campo.id === "reg-password") {
      const min = Number.parseInt(inputPassword.getAttribute("minlength"));
      const max = Number.parseInt(inputPassword.getAttribute("maxlength"));
      error = validarPassword(inputPassword.value, min, max, inputPassword.required);

      if (camposTocados["reg-password2"]) {
        const errorRep = validarRepetirPassword(
          inputPassword2.value,
          inputPassword.value,
          inputPassword2.required
        );
        mostrarErrorCampo(inputPassword2, errorRep);
      }
    }

    if (campo.id === "reg-password2") {
      error = validarRepetirPassword(
        inputPassword2.value,
        inputPassword.value,
        inputPassword2.required
      );
    }

    if (campo.id === "reg-fecha") {
      const fechaMin = inputFecha.getAttribute("min");
      error = validarFechaNacimiento(inputFecha.value, fechaMin);
    }

    if (campo.id === "reg-condiciones") {
      error = validarCondiciones(inputCondiciones.checked);
    }

    mostrarErrorCampo(campo, error);
    return error;
  }

  campos.forEach((campo) => {
    campo.addEventListener("blur", () => {
      camposTocados[campo.id] = true;
      revisarCampoRegistro(campo);
    });

    const eventoCambio = campo.type === "checkbox" ? "change" : "input";
    campo.addEventListener(eventoCambio, () => {
      if (camposTocados[campo.id]) {
        revisarCampoRegistro(campo);
      }
    });
  });

  function limpiarModoEdicion() {
    idEditando = null;
    camposTocados = {};
    formRegistro.reset();
    inputPassword.required = true;
    inputPassword2.required = true;
    limpiarErroresFormulario(formRegistro);
    tituloForm.textContent = "Crea tu cuenta";
    btnSubmit.textContent = "REGISTRARSE Y CONTINUAR";
    btnCancelar.classList.add("oculto");
  }

  btnCancelar.addEventListener("click", () => {
    limpiarModoEdicion();
  });

  formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();

    let primerError = null;

    campos.forEach((campo) => {
      camposTocados[campo.id] = true;
      const error = revisarCampoRegistro(campo);
      if (error && !primerError) {
        primerError = campo;
      }
    });

    if (primerError) {
      primerError.focus();
      return;
    }

    const datosUsuario = {
      username: inputUsername.value.trim(),
      email: inputEmail.value.trim(),
      fechaNacimiento: formatearFechaISO(inputFecha.value),
      condiciones: inputCondiciones.checked === true,
    };

    if (idEditando !== null) {
      actualizar("usuarios", idEditando, datosUsuario);
    } else {
      crear("usuarios", datosUsuario);
    }

    limpiarModoEdicion();
    pintarUsuarios(obtenerTodos("usuarios"));
  });

  // Delegación de eventos para editar y borrar usuarios
  contenedorUsuarios.addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-id");
    if (!id) {
      return;
    }

    if (e.target.classList.contains("boton-editar")) {
      const usuario = obtenerPorId("usuarios", id);
      if (!usuario) {
        return;
      }

      idEditando = usuario.id;
      camposTocados = {};
      limpiarErroresFormulario(formRegistro);

      inputUsername.value = usuario.username;
      inputEmail.value = usuario.email;
      inputPassword.value = "";
      inputPassword2.value = "";
      inputPassword.required = false;
      inputPassword2.required = false;
      inputFecha.value = usuario.fechaNacimiento;
      inputCondiciones.checked = usuario.condiciones === true;

      tituloForm.textContent = `Editar usuario: ${usuario.username}`;
      btnSubmit.textContent = "GUARDAR CAMBIOS";
      btnCancelar.classList.remove("oculto");
      inputUsername.focus();
    }

    if (e.target.classList.contains("boton-borrar")) {
      const confirmar = confirm("¿Seguro que quieres borrar este usuario?");
      if (confirmar) {
        borrar("usuarios", id);
        if (idEditando === Number.parseInt(id)) {
          limpiarModoEdicion();
        }
        pintarUsuarios(obtenerTodos("usuarios"));
      }
    }
  });
}

function iniciarContacto() {
  const formContacto = document.querySelector("#form-contacto");
  const contenedorMensajes = document.querySelector("#listado-mensajes");

  if (!formContacto || !contenedorMensajes) {
    return;
  }

  const inputNombre = document.querySelector("#con-nombre");
  const inputEmail = document.querySelector("#con-email");
  const inputTelefono = document.querySelector("#con-telefono");
  const inputLlamar = document.querySelector("#con-llamar");
  const selectMotivo = document.querySelector("#con-motivo");
  const textareaMensaje = document.querySelector("#con-mensaje");
  const contador = document.querySelector("#contador-mensaje");

  const minMensaje = Number.parseInt(textareaMensaje.getAttribute("minlength"));
  const maxMensaje = Number.parseInt(textareaMensaje.getAttribute("maxlength"));

  const campos = [
    inputNombre,
    inputEmail,
    inputTelefono,
    selectMotivo,
    textareaMensaje,
  ];

  let camposTocados = {};

  rellenarUltimoContacto(inputNombre, inputEmail);
  pintarMensajes(obtenerTodos("mensajes"));

  function actualizarContador() {
    contador.textContent = `${textareaMensaje.value.length} / ${maxMensaje}`;
  }

  function revisarCampoContacto(campo) {
    let error = null;

    if (campo.id === "con-nombre") {
      const min = Number.parseInt(inputNombre.getAttribute("minlength"));
      const max = Number.parseInt(inputNombre.getAttribute("maxlength"));
      error = validarNombre(inputNombre.value, min, max);
    }

    if (campo.id === "con-email") {
      const max = Number.parseInt(inputEmail.getAttribute("maxlength"));
      error = validarEmail(inputEmail.value, max);
    }

    if (campo.id === "con-telefono") {
      error = validarTelefono(inputTelefono.value, inputTelefono.required);
    }

    if (campo.id === "con-motivo") {
      error = validarMotivo(selectMotivo.value);
    }

    if (campo.id === "con-mensaje") {
      error = validarMensaje(textareaMensaje.value, minMensaje, maxMensaje);
    }

    mostrarErrorCampo(campo, error);
    return error;
  }

  campos.forEach((campo) => {
    campo.addEventListener("blur", () => {
      camposTocados[campo.id] = true;
      revisarCampoContacto(campo);
    });

    campo.addEventListener("input", () => {
      if (campo.id === "con-mensaje") {
        actualizarContador();
      }
      if (camposTocados[campo.id]) {
        revisarCampoContacto(campo);
      }
    });
  });

  // Si marca "Prefiero que me llaméis", el teléfono pasa a ser obligatorio
  inputLlamar.addEventListener("change", () => {
    inputTelefono.required = inputLlamar.checked;
    if (camposTocados["con-telefono"] || inputLlamar.checked) {
      camposTocados["con-telefono"] = true;
      revisarCampoContacto(inputTelefono);
    }
  });

  formContacto.addEventListener("submit", (e) => {
    e.preventDefault();

    let primerError = null;

    campos.forEach((campo) => {
      camposTocados[campo.id] = true;
      const error = revisarCampoContacto(campo);
      if (error && !primerError) {
        primerError = campo;
      }
    });

    if (primerError) {
      primerError.focus();
      return;
    }

    const nuevoMensaje = {
      nombre: inputNombre.value.trim(),
      email: inputEmail.value.trim(),
      telefono: inputTelefono.value.trim(),
      preferenciaLlamada: inputLlamar.checked === true,
      motivo: selectMotivo.value,
      mensaje: textareaMensaje.value.trim(),
    };

    crear("mensajes", nuevoMensaje);
    guardarUltimoContacto(nuevoMensaje.nombre, nuevoMensaje.email);

    formContacto.reset();
    inputTelefono.required = false;
    camposTocados = {};
    limpiarErroresFormulario(formContacto);
    actualizarContador();
    pintarMensajes(obtenerTodos("mensajes"));
  });

  // Delegación de eventos para borrar mensajes
  contenedorMensajes.addEventListener("click", (e) => {
    if (e.target.classList.contains("boton-borrar")) {
      const id = e.target.getAttribute("data-id");
      if (id && confirm("¿Seguro que quieres borrar este mensaje?")) {
        borrar("mensajes", id);
        pintarMensajes(obtenerTodos("mensajes"));
      }
    }
  });
}

function guardarUltimoContacto(nombre, email) {
  const hoy = new Date();
  const msSieteDias = 7 * 24 * 60 * 60 * 1000;
  const fechaCaducidad = new Date(hoy.getTime() + msSieteDias);

  const recuerdo = {
    nombre: nombre,
    email: email,
    caducidad: formatearFechaISO(fechaCaducidad),
  };

  const existente = obtenerPorId("ultimoContacto", 1);
  if (existente) {
    actualizar("ultimoContacto", 1, recuerdo);
  } else {
    crear("ultimoContacto", recuerdo);
  }
}

function rellenarUltimoContacto(inputNombre, inputEmail) {
  const recuerdo = obtenerPorId("ultimoContacto", 1);
  if (!recuerdo) {
    return;
  }

  const hoy = new Date();
  const limite = new Date(recuerdo.caducidad);

  if (hoy > limite) {
    borrar("ultimoContacto", 1);
    return;
  }

  inputNombre.value = recuerdo.nombre;
  inputEmail.value = recuerdo.email;
}
