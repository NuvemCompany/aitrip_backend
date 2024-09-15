# Usar uma imagem base Node.js com Alpine Linux
FROM node:20-alpine

# Definir o diretório de trabalho
WORKDIR /app

RUN npm i -g @nestjs/cli

# Copiar os arquivos de dependências
COPY package*.json ./

# Instalar as dependências
RUN yarn install

# Copiar o restante do código
COPY . .

# Gerar o Prisma Client dentro do Docker

# Tornar o script executável
RUN npx prisma generate
RUN chmod +x /app/scripts/start-dev.sh
# Expor a porta da aplicação
EXPOSE 3001

# Definir o script como ponto de entrada
ENTRYPOINT ["/app/scripts/start-dev.sh"]

# Comando para iniciar a aplicação
CMD ["yarn", "start:dev"]
