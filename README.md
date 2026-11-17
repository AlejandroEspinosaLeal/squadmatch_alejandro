# SquadMatch

Aplicación web para buscar compañeros de equipo en videojuegos competitivos según su juego, rango, rol, horario y valoración.

## Backlog

1. Menú de navegación entre las páginas de la aplicación.
2. Creación de los datos de ejemplo con las entidades de juegos y jugadores en `datos.js`.
3. Listado de jugadores generado desde JavaScript.
4. Ficha de detalle completa al pulsar sobre un jugador del listado.
5. Filtro de jugadores por juego, rango, rol y uso de micrófono.
6. Ordenación del listado por valoración y compatibilidad.
7. Formulario de alta con validación de campos en la vista de buscar compañeros.
8. Guardado de datos en `localStorage`.
9. Paso de la aplicación a SPA sin recargar la página al cambiar de sección.

## Mapa de pantallas

- **Jugadores compatibles (`index.html`)**: pantalla principal. Muestra el listado de jugadores con su nombre, rol, juego, rango, puntuación de karma y si tienen micrófono. Al pulsar en cualquiera de ellos, a la derecha aparece su ficha completa con el modo de juego, plataforma, estado de verificación, compatibilidad, horario, personajes que juega y una nota.
- **Buscar compañeros (`crear.html`)**: pantalla donde irá el formulario para filtrar y crear búsquedas por rango, rol y preferencias de equipo. En este primer hito está enlazada en el menú.
