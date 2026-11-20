import { jugadores } from "./datos.js";
import { pintarListado } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  pintarListado(jugadores);
});
