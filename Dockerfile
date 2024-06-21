# Limita Capacidade de Recursos no Build da Imagem
ARG MAX_CPU=0.5
ARG MAX_MEMORY=256M

# Etapa 1: Construir o projeto Angular
FROM node:12 AS build

WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Compila o projeto para produção
RUN npm run build

# Etapa 2: Servir os arquivos estáticos com Nginx
FROM nginx:alpine

# Remove o conteúdo padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos estáticos do build Angular para o diretório do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80 para acessar o servidor Nginx
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]