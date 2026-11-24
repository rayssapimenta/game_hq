const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const catalog = require('../shared/catalog.json');

const defaultDatabasePath = path.join(__dirname, 'data', 'game-hq.sqlite');

function createDatabase(databasePath = defaultDatabasePath) {
  fs.mkdirSync(path.dirname(databasePath), { recursive: true });

  const database = new DatabaseSync(databasePath);
  database.exec(`
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
      old_price_cents INTEGER CHECK (old_price_cents IS NULL OR old_price_cents >= 0),
      badge_type TEXT NOT NULL CHECK (badge_type IN ('offer', 'stock')),
      badge_text TEXT NOT NULL,
      short_specs TEXT NOT NULL,
      full_description TEXT NOT NULL,
      specs_json TEXT NOT NULL,
      image TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      order_number TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL,
      coupon_code TEXT,
      subtotal_cents INTEGER NOT NULL,
      discount_cents INTEGER NOT NULL,
      total_cents INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY,
      order_id TEXT NOT NULL REFERENCES orders(id),
      product_id INTEGER NOT NULL REFERENCES products(id),
      product_name TEXT NOT NULL,
      unit_price_cents INTEGER NOT NULL,
      quantity INTEGER NOT NULL CHECK (quantity BETWEEN 1 AND 10)
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  const upsertProduct = database.prepare(`
    INSERT INTO products (
      id, name, category, price_cents, old_price_cents, badge_type,
      badge_text, short_specs, full_description, specs_json, image
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      category = excluded.category,
      price_cents = excluded.price_cents,
      old_price_cents = excluded.old_price_cents,
      badge_type = excluded.badge_type,
      badge_text = excluded.badge_text,
      short_specs = excluded.short_specs,
      full_description = excluded.full_description,
      specs_json = excluded.specs_json,
      image = excluded.image
  `);

  for (const product of catalog) {
    upsertProduct.run(
      product.id,
      product.name,
      product.category,
      Math.round(product.price * 100),
      product.oldPrice === null ? null : Math.round(product.oldPrice * 100),
      product.badgeType,
      product.badgeText,
      product.shortSpecs,
      product.fullDescription,
      JSON.stringify(product.specsList),
      product.image,
    );
  }

  return database;
}

function getProducts(database) {
  const rows = database.prepare('SELECT * FROM products ORDER BY id').all();
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    category: row.category,
    price: row.price_cents / 100,
    oldPrice: row.old_price_cents === null ? null : row.old_price_cents / 100,
    badgeType: row.badge_type,
    badgeText: row.badge_text,
    shortSpecs: row.short_specs,
    fullDescription: row.full_description,
    specsList: JSON.parse(row.specs_json),
    image: row.image,
  }));
}

function getProductById(database, productId) {
  const row = database.prepare('SELECT * FROM products WHERE id = ?').get(productId);
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    priceCents: row.price_cents,
  };
}

module.exports = { createDatabase, getProductById, getProducts };
