import { juegos } from "./datos.js";

const contenedorListado = document.querySelector("#listado-jugadores");
const contenedorDetalle = document.querySelector("#detalle-jugador");

export function limpiarHTML(contenedor) {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}

export function buscarJuego(juegoId) {
  return juegos.find((juego) => juego.id === juegoId);
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
