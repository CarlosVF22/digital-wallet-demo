# Imagen oficial de Node.js 22.13
FROM node:22.13

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de dependencias (package.json y package-lock.json / yarn.lock)
COPY package*.json ./

# Establecemos las variables de entorno para desarrollo e indicamos que se instalen las devDependencies
ENV NODE_ENV=development
ENV NPM_CONFIG_PRODUCTION=false

# Instalamos todas las dependencias (incluyendo devDependencies)
RUN npm install

# Copiamos el resto del código
COPY . .

# Compilamos TypeScript
RUN npm run build

# Exponemos el puerto donde correrá la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "start"]