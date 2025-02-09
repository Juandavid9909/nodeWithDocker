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


# Clean Architecture

Una arquitectura limpia tiene en su primer nivel la base de datos, luego los presenters que es la app que ve el usuario, luego los use cases donde dividimos nuestro código en pequeñas tareas y las entidades, por ejemplo si hicieramos arquitectura limpia para una app de monitoreo todo se dividiría de la siguiente manera:

- **Entities:** LogEntity para el nivel de severidad, mensaje del suceso y cuándo pasó.
- **Use Cases:** Grabar logs, leer logs por severidad o enviar el email.
- **Presenters:** App de consola.
- **DataBase:** FileSystem, MongoDB y PostgreSQL.

Esta arquitectura no debería afectar si:

- Cambiamos la base de datos.
- Cambiamos el motor de correos.
- Añadimos o eliminamos tareas.
- Queremos trabajar con múltiples orígenes de datos.


# Repository Pattern

Con este patrón podemos crear un repositorio al que le podremos conectar Remote Data Sources (servicios web, SQL, FileSystem, etc). Todos estos Data Sources son consumidos por nuestro repositorio.

- **Domain:** Todo lo que rige el dominio de mi empresa, todo lo que rige la aplicación (cómo va a funcionar, qué tipos de datos tendremos, etc).
- **Entities:** Algo que ya va a terminar llegando a la base de datos. Es quien va a gobernar nuestra aplicación cuando queramos trabajar con nuestras entidades.
- **Data Sources:** Va a contener los orígenes de datos (PostgreSQL, MySQL, MongoDB, etc).
- **Repository:** Es el cómo vamos a llamar nuestro Data Source.
- **Infrastructure:** Es como el intermediario entre Presentation y Domain para ejecutar las acciones que necesitemos.


#  Pasos para usar Node con TypeScript con Nodemon

Más información - [Docs Oficiales](https://nodejs.dev/en/learn/nodejs-with-typescript/).

1. Instalar TypeScript y tipos de Node, como dependencia de desarrollo.

```bash
npm i -D typescript @types/node
```

2. Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto).

```bash
npx tsc --init --outDir dist/ --rootDir src
```

3.  **Opcional** - Para traspilar el código, se puede usar este comando.

```bash
npx tsc

npx tsc --watch
```

4. Configurar Nodemon y Node-TS.

```bash
npm install -D ts-node nodemon
```

5. Crear archivo de configuración de Nodemon - **nodemon.json**.

```json
{
"watch": ["src"],
"ext": ".ts,.js",
"ignore": [],
"exec": "npx ts-node ./src/app.ts"
}
```

6. Crear script para correr en desarrollo en el **package.json**.

```json
"dev": "nodemon"

"dev": "npx nodemon"  // En caso de no querer instalar nodemon
```

7. Instalar rimraf (Herramienta que funciona similar al rm -f) eliminar directorio.

```bash
npm  install  -D  rimraf
```

8. Crear scripts en el package.json para construir e iniciar en producción.

```json
{
"build": "rimraf ./dist && tsc",
"start": "npm run build && node dist/app.js"
}
```


#  Librerías para pruebas

Hay 3 opciones muy buenas, estas son Jest, Mocha y Jasmine.


#  Pasos para configurar Jest con TypeScript, en Node

Documentación [oficial sobre Jest](https://jestjs.io/docs/getting-started).

1. Instalaciones de desarrollo (super test es útil para probar Express).

```bash
npm install -D jest @types/jest ts-jest supertest
```

2. Crear archivo de configuración de Jest.

```bash
npx jest --init
```

3. En el archivo **jest.config.js** configurar.

```json
preset: 'ts-jest',
testEnvironment: "jest-environment-node",
  
// Opcional - The paths to modules that run some code to configure or set up the testing environment before each test

// setupFiles: ['dotenv/config'],
```

4. Crear scripts en el **package.json**.
```json
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage",
```

5. Ignorar Jest en el **tsconfig.json**.

```json
"include": ["src/**/*"],
"exclude": ["node_modules", "**/*.spec.ts", "**/*.test.ts"],
```


#  Node con TypeScript - Recomendado

1. Instalar TypeScript y demás dependencias.

```bash
npm i -D typescript @types/node ts-node nodemon rimraf
```

2. Inicializar el archivo de configuración de TypeScript (Se puede configurar al gusto).

```bash
npx tsc --init --outDir dist/ --rootDir src
```

3. Crear archivo de configuración Nodemon - nodemon.json.

```json
{
"watch": ["src"],
"ext": ".ts,.js",
"ignore": [],
"exec": "npx ts-node ./src/app.ts"
}
```

4. Crear scripts para dev, build y start.

```json
"dev": "nodemon",
"build": "rimraf ./dist && tsc",
"start": "npm run build && node dist/app.js"
```


# Node con TypeScript - TS-Node-dev (preferido)

1. Instalar TypeScript y demás dependencias.

```bash
npm i -D typescript @types/node ts-node-dev rimraf
```

2. Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto).

```bash
npx tsc --init --outDir dist/ --rootDir src
```

3. Crear scripts para dev, build y start ([Más sobre TS-Node-dev aquí](https://www.npmjs.com/package/ts-node-dev)).

```json
  "dev": "tsnd --respawn --clear src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"
```


# JWT

Estos nos permiten realizar la autenticación de usuarios mediante JSON Web Tokens. La información y ejemplo se puede encontrar [aquí](https://jwt.io/).

Un JWT tiene 3 partes sumamente importantes:

- **Header:** Algoritmo que fue utilizado para la encriptación o hasheo de nuestro token.
- **Payload:** Puede ser cualquier cosa (podemos almacenar la información que queramos aquí). Sin embargo, lo mejor es no guardar muchos datos.
- **Verify signature:** Utilizado para firmar nuestro token, esto es lo que lo hace seguro. Esto contiene una llave secreta (semilla) para validar y estar seguros de que el token es válido.

```javascript
// Ejemplo
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
const header = {
	"alg": "HS256",
	"typ": "JWT"
};

// eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
const payload = {
	"sub": "1234567890",
	"name": "John Doe",
	"iat": 1516239022
}};

// SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
const verifySignature = HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  our256BitSecret
);
```


# Webhooks

Estos nos permiten detectar cambios en otro portal para realizar un proceso de forma automática sin depender del cliente, etc. Es importante implementar seguridad en nuestros Webhooks, se puede usar un Secret Token, una llave secreta, etc. Ya que esto nos permite indicarle al proveedor dicho Token, y obligar a que retorne la información con dicho Token, y si es así se puede procesar la información.

Para implementar nuestros Webhooks debemos tener en cuenta lo siguiente:

- Nunca compartir los secrets.
- Deben de ser aleatorios seguros.
- Sigue las recomendaciones de la documentación.
- Nunca confíes en el anonimato.
- La idea es la misma entre servicios.

Para los Webhooks de GitHub, podemos ingresar al siguiente [link](https://docs.github.com/es/webhooks).


# Glosario

- **Middlewares:** Son funciones que se ejecutan en todo momento que se pasa por una ruta.

