const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { once } = require('node:events');
const { after, before, test } = require('node:test');
const { createApp } = require('./app');
const { createDatabase } = require('./database');

let database;
let server;
let databaseDirectory;
let baseUrl;

before(async () => {
  databaseDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'game-hq-api-'));
  database = createDatabase(path.join(databaseDirectory, 'test.sqlite'));
  server = createApp(database).listen(0, '127.0.0.1');
  await once(server, 'listening');
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  database.close();
  fs.rmSync(databaseDirectory, { recursive: true, force: true });
});

async function postJson(route, body) {
  return fetch(`${baseUrl}${route}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

test('returns the seeded catalog and security headers', async () => {
  const response = await fetch(`${baseUrl}/api/products`);
  const products = await response.json();

  assert.equal(response.status, 200);
  assert.equal(products.length, 8);
  assert.equal(products[0].price, 5499);
  assert.equal(response.headers.get('x-powered-by'), null);
  assert.ok(response.headers.has('x-content-type-options'));
});

test('validates coupons on the server', async () => {
  const validResponse = await postJson('/api/coupons/validate', { code: ' game10 ' });
  assert.deepEqual(await validResponse.json(), { code: 'GAME10', discountPercent: 10 });

  const invalidResponse = await postJson('/api/coupons/validate', { code: 'UNKNOWN' });
  assert.equal(invalidResponse.status, 400);
  assert.equal((await invalidResponse.json()).error.code, 'INVALID_COUPON');
});

test('calculates and persists orders using server-side prices', async () => {
  const response = await postJson('/api/orders', {
    items: [{ productId: 1, quantity: 2 }],
    couponCode: 'GAME10',
  });
  const order = await response.json();

  assert.equal(response.status, 201);
  assert.match(order.orderNumber, /^GHQ-/);
  assert.equal(order.subtotal, 10998);
  assert.equal(order.discount, 1099.8);
  assert.equal(order.total, 9898.2);
  assert.equal(database.prepare('SELECT COUNT(*) AS count FROM orders').get().count, 1);
  assert.equal(database.prepare('SELECT COUNT(*) AS count FROM order_items').get().count, 1);
});

test('rejects invalid quantities without creating an order', async () => {
  const response = await postJson('/api/orders', {
    items: [{ productId: 1, quantity: 11 }],
  });
  const error = await response.json();

  assert.equal(response.status, 400);
  assert.equal(error.error.code, 'VALIDATION_ERROR');
  assert.equal(database.prepare('SELECT COUNT(*) AS count FROM orders').get().count, 1);
});

test('validates and stores contact messages', async () => {
  const response = await postJson('/api/contact', {
    name: '  Ana Silva  ',
    email: '  ANA@example.com ',
    phone: '',
    subject: 'Suporte e Garantia',
    message: 'Preciso de ajuda com meu pedido.',
  });
  const result = await response.json();
  const contact = database.prepare('SELECT * FROM contacts WHERE id = ?').get(result.id);

  assert.equal(response.status, 201);
  assert.equal(contact.name, 'Ana Silva');
  assert.equal(contact.email, 'ana@example.com');
  assert.equal(contact.phone, null);
  assert.equal(contact.message, 'Preciso de ajuda com meu pedido.');
});
