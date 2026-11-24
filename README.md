# GAME HQ

Loja virtual de eletrônicos e produtos gamer feita com Angular standalone e Bootstrap 5.

## Requisitos

- Node.js 24 LTS (recomendado)
- npm

## Desenvolvimento

Instale as dependências e inicie o servidor local:

```bash
npm install
npm start
```

Abra `http://localhost:4200/`. O servidor recarrega a aplicação quando os arquivos de `src/` são alterados.

## Build e testes

```bash
npm run build
npm test
```

O catálogo está em `src/app/products.ts`; o estado e a interação da página ficam no componente `src/app/app.ts`.
