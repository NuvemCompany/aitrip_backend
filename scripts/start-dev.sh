#!/bin/sh

# 1. Aplicar as migrações
npx prisma migrate deploy

# 2. Instalar as dependências
yarn install

# 3. Iniciar a aplicação
exec "$@"
