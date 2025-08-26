FROM node:20.17.0-alpine3.19 AS builder

WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json ./

# Instala TODAS as dependências (incluindo as de desenvolvimento para a build)
RUN npm install

# Copia o resto do código-fonte
COPY . .

RUN npm run build

RUN npm prune --production

FROM node:20.17.0-alpine3.19 AS final

WORKDIR /app


COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./


COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expõe a porta da aplicação
EXPOSE 3001

# Comando para iniciar a aplicação em modo de produção
CMD ["node", "dist/main"]
