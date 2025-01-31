# Imagen oficial de Node.js 22.13
FROM node:22.13

# Creamos y establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de dependencias (package.json y package-lock.json / yarn.lock)
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Compilamos TypeScript
RUN npm run build

# Exponemos el puerto donde correrá la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]