# Crear certificado

```bash
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```

# Instalación de dependencias

```bash
npm i express dotenv env-var

npm i -D @types/express
```