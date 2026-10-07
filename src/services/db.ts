// Lab 05 — embedded SQLite service (offline-first).
// One file on the phone: pos_inventory.db. No internet needed.
import * as SQLite from 'expo-sqlite';

export interface DbProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export const db = SQLite.openDatabaseSync('pos_inventory.db');

const SEED: Array<[string, string, number, number]> = [
  ['Spanish Latte', 'Espresso', 140, 42],
  ['Americano', 'Espresso', 95, 35],
  ['Cappuccino', 'Espresso', 120, 28],
  ['Oat milk', 'Dairy', 0, 4],
  ['Croissant', 'Pastries', 85, 6],
  ['Sugar syrup', 'Supplies', 0, 9],
];

export function initDatabase() {
  db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER NOT NULL
    );
  `);
  const count = db.getFirstSync<{ count: number }>('SELECT COUNT(*) as count FROM products;');
  if (count !== null && count.count === 0) {
    const placeholders = SEED.map(() => '(?, ?, ?, ?)').join(', ');
    db.runSync(
      `INSERT INTO products (name, category, price, stock) VALUES ${placeholders};`,
      SEED.flat(),
    );
  }
}

export function getAllProducts(): DbProduct[] {
  return db.getAllSync<DbProduct>('SELECT * FROM products ORDER BY id DESC;');
}

export function searchProducts(q: string): DbProduct[] {
  if (q.trim() === '') return getAllProducts();
  return db.getAllSync<DbProduct>('SELECT * FROM products WHERE name LIKE ? ORDER BY name ASC;', [
    `%${q}%`,
  ]);
}

export function addProduct(name: string, category: string, price: number, stock: number) {
  db.runSync('INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?);', [
    name,
    category,
    price,
    stock,
  ]);
}

export function deleteProduct(id: number) {
  db.runSync('DELETE FROM products WHERE id = ?;', [id]);
}

export function changeStock(id: number, delta: number) {
  db.runSync('UPDATE products SET stock = stock + ? WHERE id = ?;', [delta, id]);
}
