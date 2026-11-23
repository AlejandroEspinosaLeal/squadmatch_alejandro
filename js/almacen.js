import { juegos, jugadores } from "./datos.js";

const datosIniciales = {
  juegos: juegos,
  jugadores: jugadores,
  usuarios: [],
  mensajes: [],
  ultimoContacto: [],
};

export function obtenerTodos(coleccion) {
  const guardado = localStorage.getItem(coleccion);

  if (guardado) {
    return JSON.parse(guardado);
  }

  const inicial = datosIniciales[coleccion] || [];
  localStorage.setItem(coleccion, JSON.stringify(inicial));
  return inicial;
}

export function obtenerPorId(coleccion, id) {
  const lista = obtenerTodos(coleccion);
  return lista.find((item) => item.id === Number(id)) || null;
}

export function crear(coleccion, dato) {
  const lista = obtenerTodos(coleccion);

  let nuevoId = 1;
  lista.forEach((item) => {
    if (item.id >= nuevoId) {
      nuevoId = item.id + 1;
    }
  });

  const nuevo = {
    ...dato,
    id: nuevoId,
  };

  lista.push(nuevo);
  localStorage.setItem(coleccion, JSON.stringify(lista));
  return nuevo;
}

export function actualizar(coleccion, id, dato) {
  const lista = obtenerTodos(coleccion);
  const idNum = Number(id);

  const actualizada = lista.map((item) => {
    if (item.id === idNum) {
      return {
        ...item,
        ...dato,
        id: idNum,
      };
    }
    return item;
  });

  localStorage.setItem(coleccion, JSON.stringify(actualizada));
}

export function borrar(coleccion, id) {
  const lista = obtenerTodos(coleccion);
  const idNum = Number(id);

  const filtrada = lista.filter((item) => item.id !== idNum);
  localStorage.setItem(coleccion, JSON.stringify(filtrada));
}
