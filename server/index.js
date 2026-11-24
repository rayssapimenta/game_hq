const path = require('node:path');
const { createApp } = require('./app');
const { createDatabase } = require('./database');

const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT deve ser uma porta TCP válida.');
}

const databasePath = process.env.DB_PATH ?? path.join(__dirname, 'data', 'game-hq.sqlite');
const database = createDatabase(databasePath);
const server = createApp(database).listen(port, process.env.HOST ?? '127.0.0.1', () => {
  console.log(`GAME HQ API disponível em http://${process.env.HOST ?? '127.0.0.1'}:${port}`);
});

function shutdown() {
  server.close(() => {
    database.close();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
