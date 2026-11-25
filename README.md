# SquadMatch

Aplicación web para buscar compañeros de equipo en videojuegos competitivos según su juego, rango, rol, horario y valoración.

## Backlog

- [x] 1. Menú de navegación entre las páginas de la aplicación.
- [x] 2. Creación de los datos de ejemplo con las entidades de juegos y jugadores en `datos.js`.
- [x] 3. Listado de jugadores generado desde JavaScript.
- [x] 4. Ficha de detalle completa al pulsar sobre un jugador del listado.
- [x] 5. Módulo `almacen.js` para guardar y leer los datos en `localStorage`.
- [x] 6. Módulo `validacion.js` con las funciones para validar los formularios.
- [x] 7. Formulario de registro y listado de usuarios con edición y borrado en `usuarios.html`.
- [x] 8. Formulario de contacto con contador de caracteres, recuerdo del último envío y listado de mensajes en `crear.html`.
- [ ] 9. Filtro de jugadores por juego, rango, rol y uso de micrófono.
- [ ] 10. Ordenación del listado por valoración y compatibilidad.
- [ ] 11. Paso de la aplicación a SPA sin recargar la página al cambiar de sección.

## Mapa de pantallas

- **Jugadores compatibles (`index.html`)**: muestra el listado de jugadores y, al pulsar sobre uno, su ficha completa a la derecha.
- **Usuarios (`usuarios.html`)**: a la izquierda tiene el formulario de registro y a la derecha la lista de usuarios guardados con los botones de editar y borrar.
- **Contacto (`crear.html`)**: a la izquierda tiene el formulario de contacto (que recuerda el nombre y el correo en `localStorage`) y a la derecha la lista de mensajes enviados con el botón para borrarlos.

## Hito 2

### Mapa de validación

| Formulario | Campo | Regla | Mensaje de error |
| :--- | :--- | :--- | :--- |
| Registro | Nombre de usuario | Obligatorio, entre 3 y 25 caracteres | "El nombre es obligatorio." / "Debe tener entre 3 y 25 caracteres." |
| Registro | Correo electrónico | Obligatorio, expresión regular de correo y máximo 100 caracteres | "El correo electrónico es obligatorio." / "Introduce un correo electrónico válido." |
| Registro | Contraseña | Obligatoria al crear, mínimo 8 caracteres, una mayúscula y un número | "La contraseña es obligatoria." / "La contraseña debe tener al menos 8 caracteres." / "La contraseña debe tener al menos una mayúscula." / "La contraseña debe tener al menos un número." |
| Registro | Repetir contraseña | Obligatoria al crear, debe coincidir con la contraseña | "Debes repetir la contraseña." / "Las contraseñas no coinciden." |
| Registro | Fecha de nacimiento | Obligatoria, no futura y mínimo 16 años | "La fecha de nacimiento es obligatoria." / "La fecha de nacimiento no puede ser futura." / "Debes tener al menos 16 años para registrarte." |
| Registro | Condiciones | Casilla marcada obligatoria | "Debes aceptar las condiciones." |
| Contacto | Nombre | Obligatorio, entre 3 y 40 caracteres | "El nombre es obligatorio." / "Debe tener entre 3 y 40 caracteres." |
| Contacto | Correo | Obligatorio, expresión regular de correo y máximo 100 caracteres | "El correo electrónico es obligatorio." / "Introduce un correo electrónico válido." |
| Contacto | Teléfono | Opcional (obligatorio si marca «Prefiero que me llaméis»), 9 números empezando por 6, 7, 8 o 9 | "El teléfono es obligatorio si marcas «Prefiero que me llaméis»." / "Teléfono no válido (debe tener 9 números y empezar por 6, 7, 8 o 9)." |
| Contacto | Motivo | Obligatorio elegir una opción | "Selecciona un motivo de la lista." |
| Contacto | Mensaje | Obligatorio, entre 15 y 300 caracteres | "El mensaje es obligatorio." / "El mensaje debe tener entre 15 y 300 caracteres." |

### Qué he hecho, qué falta y qué me ha costado más

- **Qué he hecho:** He hecho el módulo `almacen.js` para leer y guardar en `localStorage`, el módulo `validacion.js` con las comprobaciones de cada campo, el formulario de registro con la lista de usuarios para poder crearlos, editarlos y borrarlos (sin guardar la contraseña) y el formulario de contacto con contador de caracteres, borrado de mensajes y guardado del último nombre y correo.
- **Qué falta:** Añadir los filtros para buscar jugadores por criterios, ordenar el listado y juntar todas las vistas en una sola página para que funcione como SPA.
- **Qué me ha costado más:** Hacer que el mismo formulario de registro sirva tanto para crear un usuario nuevo como para editar uno que ya existe cuando pulsas el botón de editar, y controlar cuándo mostrar o quitar los errores con `blur` e `input`.
