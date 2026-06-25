# Imagen base con Node.js
FROM node:18-slim

# Instalar dependencias del sistema para Playwright
RUN apt-get update && apt-get install -y \
    chromium \
    && rm -rf /var/lib/apt/lists/*

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de Node
RUN npm install

# Instalar navegadores de Playwright
RUN npx playwright install chromium --with-deps

# Copiar todo el proyecto
COPY . .

# Comando por defecto al correr el contenedor
CMD ["npx", "playwright", "test", "--project=chromium"]