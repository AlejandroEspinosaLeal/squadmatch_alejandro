import { obtenerPorId } from "./almacen.js";

const contenedorListado = document.querySelector("#listado-jugadores");
const contenedorDetalle = document.querySelector("#detalle-jugador");
const contenedorUsuarios = document.querySelector("#listado-usuarios");
const contenedorMensajes = document.querySelector("#listado-mensajes");

export function limpiarHTML(contenedor) {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}

export function buscarJuego(juegoId) {
  return obtenerPorId("juegos", juegoId);
}

// Muestra el error debajo del campo y marca aria-invalid
export function mostrarErrorCampo(campo, textoError) {
  const idParrafo = campo.getAttribute("aria-describedby");
  const parrafoError = document.querySelector(`#${idParrafo}`);

  if (textoError) {
    campo.setAttribute("aria-invalid", "true");
    campo.classList.add("input-error");
    parrafoError.textContent = textoError;
  } else {
    campo.setAttribute("aria-invalid", "false");
    campo.classList.remove("input-error");
    parrafoError.textContent = "";
  }
}

export function limpiarErroresFormulario(formulario) {
  const campos = formulario.querySelectorAll("input, select, textarea");
  campos.forEach((campo) => {
    campo.removeAttribute("aria-invalid");
    campo.classList.remove("input-error");
  });

  const avisos = formulario.querySelectorAll(".error-msg");
  avisos.forEach((aviso) => {
    aviso.textContent = "";
  });
}

export function crearCardJugador(jugador) {
  const juego = buscarJuego(jugador.juegoId);

  const card = document.createElement("article");
  card.classList.add("card");

  const info = document.createElement("div");
  info.classList.add("info");

  const avatar = document.createElement("div");
  avatar.classList.add("avatar");
  avatar.textContent = jugador.gamerTag[0];

  const textos = document.createElement("div");

  const nombre = document.createElement("p");
  nombre.classList.add("titulo");
  nombre.textContent = `${jugador.gamerTag} · Rol: ${jugador.rol}`;

  const datos = document.createElement("p");
  datos.classList.add("subtitulo");
  const textoMicro = jugador.microfono ? "Micrófono activo" : "Sin micrófono";
  datos.textContent = `${juego.nombre} · ${jugador.rango} · ★ ${jugador.karma} · ${textoMicro}`;

  textos.appendChild(nombre);
  textos.appendChild(datos);

  info.appendChild(avatar);
  info.appendChild(textos);

  const boton = document.createElement("button");
  boton.classList.add("boton");
  boton.textContent = "Ver detalle";

  card.appendChild(info);
  card.appendChild(boton);

  card.addEventListener("click", () => {
    pintarDetalle(jugador);
  });

  return card;
}

export function pintarListado(lista) {
  limpiarHTML(contenedorListado);

  lista.forEach((jugador) => {
    const card = crearCardJugador(jugador);
    contenedorListado.appendChild(card);
  });
}

export function pintarDetalle(jugador) {
  limpiarHTML(contenedorDetalle);

  const juego = buscarJuego(jugador.juegoId);

  const ficha = document.createElement("div");
  ficha.classList.add("ficha");

  const nombre = document.createElement("h3");
  nombre.textContent = jugador.gamerTag;

  const estado = document.createElement("p");
  estado.classList.add("badge");
  estado.textContent = jugador.verificado ? "Cuenta verificada" : "Sin verificar";

  const parrafoJuego = document.createElement("p");
  parrafoJuego.textContent = `Juego: ${juego.nombre} (${juego.modo})`;

  const parrafoPlataforma = document.createElement("p");
  parrafoPlataforma.textContent = `Plataforma: ${juego.desarrollador} · ${juego.plataforma}`;

  const parrafoRango = document.createElement("p");
  parrafoRango.textContent = `Rango: ${jugador.rango}`;

  const parrafoRol = document.createElement("p");
  parrafoRol.textContent = `Rol: ${jugador.rol}`;

  const parrafoKarma = document.createElement("p");
  parrafoKarma.textContent = `Karma: ★ ${jugador.karma} (${jugador.valoraciones} valoraciones)`;

  const parrafoCompatibilidad = document.createElement("p");
  parrafoCompatibilidad.textContent = `Compatibilidad: ${jugador.compatibilidad}%`;

  const parrafoMicro = document.createElement("p");
  parrafoMicro.textContent = jugador.microfono
    ? "Comunicación: Micrófono activo"
    : "Comunicación: Solo chat";

  const parrafoHorario = document.createElement("p");
  parrafoHorario.textContent = `Horario: ${jugador.horario}`;

  const parrafoEspecialidad = document.createElement("p");
  parrafoEspecialidad.textContent = `Especialidad: ${jugador.especialidad}`;

  const parrafoNota = document.createElement("p");
  parrafoNota.classList.add("nota");
  parrafoNota.textContent = jugador.nota;

  ficha.appendChild(nombre);
  ficha.appendChild(estado);
  ficha.appendChild(parrafoJuego);
  ficha.appendChild(parrafoPlataforma);
  ficha.appendChild(parrafoRango);
  ficha.appendChild(parrafoRol);
  ficha.appendChild(parrafoKarma);
  ficha.appendChild(parrafoCompatibilidad);
  ficha.appendChild(parrafoMicro);
  ficha.appendChild(parrafoHorario);
  ficha.appendChild(parrafoEspecialidad);
  ficha.appendChild(parrafoNota);

  contenedorDetalle.appendChild(ficha);
}

export function pintarUsuarios(listaUsuarios) {
  limpiarHTML(contenedorUsuarios);

  if (listaUsuarios.length === 0) {
    const aviso = document.createElement("p");
    aviso.classList.add("aviso");
    aviso.textContent = "No hay usuarios registrados.";
    contenedorUsuarios.appendChild(aviso);
    return;
  }

  listaUsuarios.forEach((usuario) => {
    const card = document.createElement("article");
    card.classList.add("card");

    const info = document.createElement("div");
    info.classList.add("info");

    const avatar = document.createElement("div");
    avatar.classList.add("avatar");
    avatar.textContent = usuario.username[0].toUpperCase();

    const textos = document.createElement("div");

    const nombre = document.createElement("p");
    nombre.classList.add("titulo");
    nombre.textContent = usuario.username;

    const datos = document.createElement("p");
    datos.classList.add("subtitulo");
    datos.textContent = `${usuario.email} · Nacimiento: ${usuario.fechaNacimiento}`;

    textos.appendChild(nombre);
    textos.appendChild(datos);

    info.appendChild(avatar);
    info.appendChild(textos);

    const acciones = document.createElement("div");
    acciones.classList.add("acciones-card");

    const btnEditar = document.createElement("button");
    btnEditar.classList.add("boton", "boton-editar");
    btnEditar.setAttribute("data-id", usuario.id);
    btnEditar.textContent = "Editar";

    const btnBorrar = document.createElement("button");
    btnBorrar.classList.add("boton", "boton-borrar");
    btnBorrar.setAttribute("data-id", usuario.id);
    btnBorrar.textContent = "Borrar";

    acciones.appendChild(btnEditar);
    acciones.appendChild(btnBorrar);

    card.appendChild(info);
    card.appendChild(acciones);

    contenedorUsuarios.appendChild(card);
  });
}

export function pintarMensajes(listaMensajes) {
  limpiarHTML(contenedorMensajes);

  if (listaMensajes.length === 0) {
    const aviso = document.createElement("p");
    aviso.classList.add("aviso");
    aviso.textContent = "No hay mensajes enviados.";
    contenedorMensajes.appendChild(aviso);
    return;
  }

  listaMensajes.forEach((item) => {
    const card = document.createElement("article");
    card.classList.add("ficha", "card-mensaje");

    const cabecera = document.createElement("div");
    cabecera.classList.add("cabecera-mensaje");

    const autor = document.createElement("h3");
    autor.textContent = `${item.nombre} · ${item.email}`;

    const btnBorrar = document.createElement("button");
    btnBorrar.classList.add("boton", "boton-borrar");
    btnBorrar.setAttribute("data-id", item.id);
    btnBorrar.textContent = "Borrar";

    cabecera.appendChild(autor);
    cabecera.appendChild(btnBorrar);

    const parrafoMotivo = document.createElement("p");
    parrafoMotivo.classList.add("badge");
    parrafoMotivo.textContent = item.motivo;

    const parrafoTel = document.createElement("p");
    parrafoTel.classList.add("subtitulo");
    if (item.telefono !== "") {
      parrafoTel.textContent = item.preferenciaLlamada
        ? `Teléfono: ${item.telefono} (Prefiere llamada)`
        : `Teléfono: ${item.telefono}`;
    } else {
      parrafoTel.textContent = "Sin teléfono";
    }

    const parrafoMensaje = document.createElement("p");
    parrafoMensaje.classList.add("nota");
    parrafoMensaje.textContent = item.mensaje;

    card.appendChild(cabecera);
    card.appendChild(parrafoMotivo);
    card.appendChild(parrafoTel);
    card.appendChild(parrafoMensaje);

    contenedorMensajes.appendChild(card);
  });
}
