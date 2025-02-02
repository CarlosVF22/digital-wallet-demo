# Guía para Ejecutar el Proyecto

## Clonar el Repositorio

Ejecutar https://github.com/CarlosVF22/digital-wallet-demo.git

## Usar Docker preferiblemente

asegúrate de tener Docker instalado y ejecuta:

docker-compose up --build

Esto levantará todos los servicios definidos en el archivo `docker-compose.yml`.

### Acceso a la Aplicación

Una vez que la aplicación esté en funcionamiento, podrás acceder a ella en:

-   **API REST**: `http://localhost:3000/api/v1`
-   **Servidor SOAP**: `http://localhost:3000/soap`
-   **Adminer**: `http://localhost:8080`

## Si prefieres no utilizar Docker

Asegúrate de tener instalados los siguientes programas en tu máquina:

-   [Node.js](https://nodejs.org/) (versión 22.13 o superior)
-   [PostgreSQL](https://www.postgresql.org/) (16.6 o superior)

## Ejecutar migraciones

Tenemos la opción de ejecutar migraciones según el ambiente de base de datos que estemos utilizando.

Si estas utilizando Docker, recuerda ejecutar el comando en la terminal del contenedor.

-   migraciones en desarrollo: npx sequelize-cli db:migrate --env development
-   migraciones en producción: npx sequelize-cli db:migrate --env production
