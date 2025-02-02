# Guía para Ejecutar el Proyecto

## Clonar el Repositorio

Ejecutar https://github.com/CarlosVF22/digital-wallet-demo.git

## Usar Docker preferiblemente

1. asegúrate de tener Docker instalado y ejecuta:

docker-compose up --build

Esto levantará todos los servicios definidos en el archivo `docker-compose.yml`.

2. Ingresa a http://localhost/8080 con las credenciales especificadas en `docker-compose.yml` y crea la base de datos que vas a utilizar, por defecto es [epayco_wallet]

3. Ejecuta las migraciones según el ambiente necesario.

-   migraciones en desarrollo: `npx sequelize-cli db:migrate --env development`
-   migraciones en producción: `npx sequelize-cli db:migrate --env production`

### Acceso a la Aplicación

Una vez que la aplicación esté en funcionamiento, podrás acceder a ella en:

-   **API REST**: `http://localhost:3000/api/v1`
-   **Servidor SOAP**: `http://localhost:3000/soap`
-   **Adminer**: `http://localhost:8080`

## Si prefieres no utilizar Docker

1. Asegúrate de tener instalados los siguientes programas en tu máquina:

-   [Node.js](https://nodejs.org/) (versión 22.13 o superior)
-   [PostgreSQL](https://www.postgresql.org/) (16.6 o superior)

2. Tenemos la opción de ejecutar migraciones según el ambiente de base de datos que estemos utilizando.

Si estas utilizando Docker, recuerda ejecutar el comando en la terminal del contenedor.

-   migraciones en desarrollo: npx sequelize-cli db:migrate --env development
-   migraciones en producción: npx sequelize-cli db:migrate --env production
