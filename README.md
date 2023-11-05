# Code Execution

JavaScript es Blocking y Single-threaded, lo que quiere decir que ejecuta una cosa a la vez, Node lo solucionó para poder hacer múltiples respuestas para nuestros usuarios, etc. NodeJS tiene 3 componentes principales:

- JS Library.
- C/C++ features.
- V8, libuv, zlib, crypto, etc.

Libuv es lo que le permite a Node trabajar en tareas asíncronas, callbacks, etc.

# Event Loop

El Event Loop sigue ciertas reglas:

- Código síncrono.
- Callbacks en el microtask se ejecutan primero.
- Todos los callbacks dentro del timer queue se ejecutan.
- Callbacks en el microtask queue (si hay) se ejecutan después de los callback timers, primero tareas en el nextTick queue y luego tareas en el promise queue.
- Callbacks de I/O se ejecutan.
- Callbacks en el microtask queue se ejecutan (si hay), y luego promise queue (si hay).
- Todos los callbacks en el check queue se ejecutan.
- Callbacks en el microtask se ejecutan después de cada callback en el check queue. (Siguiendo el mismo orden anterior, nextTick y luego promise).
- Todos los callbacks en el close queue son ejecutados.
- Por una última vez en el mismo ciclo, los microtask queues son ejecutados de la misma forma, nextTick y luego promise queue.

[Ver más](https://builder.io/blog/visual-guide-to-nodejs-event-loop).