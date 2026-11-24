# GAME HQ

Loja virtual de eletrônicos e produtos gamer feita com Angular standalone, Bootstrap 5, API Node.js/Express e SQLite.

## Requisitos

- Node.js 24 LTS (recomendado)
- npm

## Desenvolvimento

Instale as dependências:

```bash
npm install
```

Inicie a API e o Angular em terminais separados:

```bash
npm run start:api
```

```bash
npm start
```

Abra `http://localhost:4200/`. O Angular encaminha as chamadas `/api` para `http://127.0.0.1:3000`. O servidor cria `server/data/game-hq.sqlite` na primeira execução; esse arquivo não é versionado.

## API

- `GET /api/health` — estado do servidor.
- `GET /api/products` — catálogo lido do SQLite e semeado de `shared/catalog.json`.
- `POST /api/coupons/validate` — recebe `{ "code": "GAME10" }` e valida o cupom no servidor.
- `POST /api/orders` — recebe `{ "items": [{ "productId": 1, "quantity": 1 }], "couponCode": "GAME10" }`; valida os itens, recalcula os valores pelo catálogo do servidor e registra o pedido.
- `POST /api/contact` — valida e armazena `{ "name", "email", "phone", "subject", "message" }`.

Pedidos são registrados como pendentes; este projeto não processa pagamentos nem envia e-mails. Configure `PORT`, `HOST`, `DB_PATH` e a lista de origens `CORS_ORIGINS` por variáveis de ambiente ao implantar. Em produção, use HTTPS, restrinja as origens ao domínio da loja e proteja o acesso operacional ao banco e às mensagens.

O servidor limita o tamanho das solicitações e a frequência de escrita, valida os dados com esquemas, usa consultas preparadas, calcula valores no servidor e retorna erros sem detalhes internos. As respostas de erro usam o formato `{ "error": { "code": "...", "message": "..." } }`. O SQLite não criptografa o arquivo por padrão; em produção, configure criptografia de armazenamento, controle de acesso, backups protegidos e uma política de retenção para os dados pessoais.

## Build e testes

```bash
npm run build
npm test -- --watch=false
npm run test:api
```

O estado da interface fica em `src/app/app.ts`; os modelos e chamadas HTTP ficam em `src/app/api.models.ts` e `src/app/api.service.ts`.
