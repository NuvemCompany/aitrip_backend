#!/bin/sh

# 1. Aplicar as migrações
npx prisma migrate dev --name init
npx prisma migrate deploy

npx prisma generate

# 2. Instalar as dependências
yarn install

# 3. Iniciar a aplicação
exec "$@"
