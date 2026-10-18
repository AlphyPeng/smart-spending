import { useSQLiteContext } from "expo-sqlite";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface UserProfile {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface UserContextValue {
  user: UserProfile | null;
  isLoading: boolean;
  isOnboarded: boolean;
  completeOnboarding: (name: string) => Promise<void>;
  updateName: (name: string) => Promise<void>;
}

interface UserProfileRow {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      try {
        const row = await db.getFirstAsync<UserProfileRow>(
          "SELECT id, name, created_at, updated_at FROM user_profile WHERE id = 1"
        );
        if (!isMounted) {
          return;
        }
        setUser(
          row
            ? {
                id: row.id,
                name: row.name,
                createdAt: row.created_at,
                updatedAt: row.updated_at,
              }
            : null
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      isMounted = false;
    };
  }, [db]);

  const completeOnboarding = useCallback(
    async (name: string) => {
      const trimmedName = name.trim();
      await db.runAsync(
        "INSERT OR REPLACE INTO user_profile (id, name, created_at, updated_at) VALUES (1, ?, datetime('now'), datetime('now'))",
        trimmedName
      );
      const row = await db.getFirstAsync<UserProfileRow>(
        "SELECT id, name, created_at, updated_at FROM user_profile WHERE id = 1"
      );
      if (row) {
        setUser({
          id: row.id,
          name: row.name,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        });
      }
    },
    [db]
  );

  const updateName = useCallback(
    async (name: string) => {
      const trimmedName = name.trim();
      await db.runAsync(
        "UPDATE user_profile SET name = ?, updated_at = datetime('now') WHERE id = 1",
        trimmedName
      );
      setUser((previous) =>
        previous
          ? { ...previous, name: trimmedName, updatedAt: new Date().toISOString() }
          : previous
      );
    },
    [db]
  );

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isOnboarded: user !== null,
        completeOnboarding,
        updateName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
