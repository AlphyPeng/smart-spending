import type { SQLiteDatabase } from "expo-sqlite";

const queues = new WeakMap<SQLiteDatabase, Promise<unknown>>();

export function runExclusive<T>(
  db: SQLiteDatabase,
  task: () => Promise<T>
): Promise<T> {
  const previous = queues.get(db) ?? Promise.resolve();
  const next = previous.then(task, task);
  queues.set(
    db,
    next.then(
      () => undefined,
      () => undefined
    )
  );
  return next;
}
