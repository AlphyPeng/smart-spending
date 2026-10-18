import { useSQLiteContext } from "expo-sqlite";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { runExclusive } from "../db/client";

export interface Budget {
  id: number;
  name: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

interface BudgetContextValue {
  budgets: Budget[];
  isLoading: boolean;
  addBudget: (name: string, amount: number) => Promise<Budget>;
  updateBudget: (id: number, name: string, amount: number) => Promise<void>;
}

interface BudgetRow {
  id: number;
  name: string;
  amount: number;
  created_at: string;
  updated_at: string;
}

const BudgetContext = createContext<BudgetContextValue | null>(null);

function mapRow(row: BudgetRow): Budget {
  return {
    id: row.id,
    name: row.name,
    amount: row.amount,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function BudgetProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadBudgets() {
      try {
        const rows = await runExclusive(db, () =>
          db.getAllAsync<BudgetRow>(
            "SELECT id, name, amount, created_at, updated_at FROM budgets ORDER BY created_at DESC, id DESC"
          )
        );
        if (isMounted) {
          setBudgets(rows.map(mapRow));
        }
      } catch (error) {
        console.error("Failed to load budgets:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadBudgets();

    return () => {
      isMounted = false;
    };
  }, [db]);

  const addBudget = useCallback(
    async (name: string, amount: number) => {
      const result = await runExclusive(db, () =>
        db.runAsync(
          "INSERT INTO budgets (name, amount) VALUES (?, ?)",
          name.trim(),
          amount
        )
      );
      const budget: Budget = {
        id: result.lastInsertRowId,
        name: name.trim(),
        amount,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setBudgets((previous) => [budget, ...previous]);
      return budget;
    },
    [db]
  );

  const updateBudget = useCallback(
    async (id: number, name: string, amount: number) => {
      await runExclusive(db, () =>
        db.runAsync(
          "UPDATE budgets SET name = ?, amount = ?, updated_at = datetime('now') WHERE id = ?",
          name.trim(),
          amount,
          id
        )
      );
      setBudgets((previous) =>
        previous.map((budget) =>
          budget.id === id
            ? {
                ...budget,
                name: name.trim(),
                amount,
                updatedAt: new Date().toISOString(),
              }
            : budget
        )
      );
    },
    [db]
  );

  return (
    <BudgetContext.Provider
      value={{ budgets, isLoading, addBudget, updateBudget }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudgets() {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudgets must be used within a BudgetProvider");
  }
  return context;
}
