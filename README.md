#  Code Execution

JavaScript es Blocking y Single-threaded, lo que quiere decir que ejecuta una cosa a la vez, Node lo solucionó para poder hacer múltiples respuestas para nuestros usuarios, etc. NodeJS tiene 3 componentes principales:

- JS Library.
- C/C++ features.
- V8, libuv, zlib, crypto, etc.

Libuv es lo que le permite a Node trabajar en tareas asíncronas, callbacks, etc.


#  Event Loop

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


#  Factory Functions

Son funciones que retornan otras funciones, buena opción para tener aplicaciones mantenibles y escalables.


#  Patrón adaptador

Nos permite tener una capa de protección con paquetes de terceros, nos permite crear nuestro propio código que adapta una dependencia de terceros para que nuestro código no dependa de ellos.


#  Pasos para usar Node con TypeScript con Nodemon

Más información - [Docs Oficiales](https://nodejs.dev/en/learn/nodejs-with-typescript/)

1. Instalar TypeScript y tipos de Node, como dependencia de desarrollo

```bash
npm i -D typescript @types/node
```

2. Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto)

```bash
npx tsc --init --outDir dist/ --rootDir src
```

3.  **Opcional** - Para traspilar el código, se puede usar este comando

```bash
npx tsc

npx tsc --watch
```

4. Configurar Nodemon y Node-TS

```bash
npm install -D ts-node nodemon
```

5. Crear archivo de configuración de Nodemon - **nodemon.json**

```json
{
"watch": ["src"],
"ext": ".ts,.js",
"ignore": [],
"exec": "npx ts-node ./src/app.ts"
}
```

6. Crear script para correr en desarrollo en el **package.json**

```json
"dev": "nodemon"

"dev": "npx nodemon"  // En caso de no querer instalar nodemon
```

7. Instalar rimraf (Herramienta que funciona similar al rm -f) eliminar directorio

```bash
npm  install  -D  rimraf
```

8. Crear scripts en el package.json para construir e iniciar en producción

```json
{
"build": "rimraf ./dist && tsc",
"start": "npm run build && node dist/app.js"
}
```


#  Librerías para pruebas

Hay 3 opciones muy buenas, estas son Jest, Mocha y Jasmine.


#  Pasos para configurar Jest con TypeScript, en Node

Documentación [oficial sobre Jest](https://jestjs.io/docs/getting-started)

1. Instalaciones de desarrollo (super test es útil para probar Express)

```bash
npm install -D jest @types/jest ts-jest supertest
```

2. Crear archivo de configuración de Jest

```bash
npx jest --init
```

3. En el archivo **jest.config.js** configurar

```json
preset: 'ts-jest',
testEnvironment: "jest-environment-node",
  
// Opcional - The paths to modules that run some code to configure or set up the testing environment before each test

// setupFiles: ['dotenv/config'],
```

4. Crear scripts en el **package.json**
```json
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage",
```

5. Ignorar Jest en el **tsconfig.json**

```json
"include": ["src/**/*"],
"exclude": ["node_modules", "**/*.spec.ts", "**/*.test.ts"],
```


#  Node con TypeScript - Recomendado

1. Instalar TypeScript y demás dependencias

```bash
npm i -D typescript @types/node ts-node nodemon rimraf
```

2. Inicializar el archivo de configuración de TypeScript (Se puede configurar al gusto)

```bash
npx tsc --init --outDir dist/ --rootDir src
```

3. Crear archivo de configuración Nodemon - nodemon.json

```json
{
"watch": ["src"],
"ext": ".ts,.js",
"ignore": [],
"exec": "npx ts-node ./src/app.ts"
}
```

4. Crear scripts para dev, build y start

```json
"dev": "nodemon",
"build": "rimraf ./dist && tsc",
"start": "npm run build && node dist/app.js"
```