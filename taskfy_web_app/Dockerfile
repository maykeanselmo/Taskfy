# Usar uma imagem base do Node.js
FROM node:22

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração e código fonte
COPY package.json package-lock.json ./
COPY . .

# Instalar dependências
RUN npm install

# Definir a variável de ambiente para contornar o erro OpenSSL
ENV NODE_OPTIONS=--openssl-legacy-provider

# Rodar o build do frontend
RUN npm run build

# Expor a porta do frontend
EXPOSE 3000

# Comando para rodar o servidor do frontend
CMD ["npm", "start"]

