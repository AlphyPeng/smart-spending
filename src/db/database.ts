import type { SQLiteDatabase } from "expo-sqlite";

import { runExclusive } from "./client";

export const DATABASE_NAME = "allocwenta.db";

const DATABASE_VERSION = 2;

export function migrateDbIfNeeded(db: SQLiteDatabase) {
  return runExclusive(db, async () => {
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE IF NOT EXISTS user_profile (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS budgets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  amount REAL NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`);

    const result = await db.getFirstAsync<{ user_version: number }>(
      "PRAGMA user_version",
    );
    const currentDbVersion = result?.user_version ?? 0;

    if (currentDbVersion < DATABASE_VERSION) {
      await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    }
  });
}
