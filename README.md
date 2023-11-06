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

Para el versionamiento de nuestro proyecto tenemos: `1.0.0` donde el primer numero equivale a versiones mayores, el segundo a nuevas características o features y el último a bug fixes.


# Factory Functions

Son funciones que retornan otras funciones, buena opción para tener aplicaciones mantenibles y escalables.


# Patrón adaptador

Nos permite tener una capa de protección con paquetes de terceros, nos permite crear nuestro propio código que adapta una dependencia de terceros para que nuestro código no dependa de ellos.