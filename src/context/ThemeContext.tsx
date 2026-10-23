import { NavigationBar } from "expo-navigation-bar";
import { useSQLiteContext } from "expo-sqlite";
import * as SystemUI from "expo-system-ui";
import { colorScheme, vars } from "nativewind";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AppState,
  Appearance,
  Platform,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { systemColorScheme } from "react-native-css-interop/dist/runtime/native/appearance-observables";

import { runExclusive } from "../db/client";
import {
  buildThemeVariables,
  isPrimaryColorKey,
  isThemeMode,
  resolveThemeColors,
  type PrimaryColorKey,
  type ThemeColors,
  type ThemeMode,
} from "../lib/theme";

interface ThemeContextValue {
  mode: ThemeMode;
  primaryKey: PrimaryColorKey;
  isDark: boolean;
  colors: ThemeColors;
  setMode: (mode: ThemeMode) => void;
  setPrimaryColor: (key: PrimaryColorKey) => void;
}

interface ThemeRow {
  theme_mode: string;
  primary_color: string;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  const rnColorScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [primaryKey, setPrimaryKeyState] = useState<PrimaryColorKey>("blue");

  useEffect(() => {
    let isMounted = true;

    async function loadTheme() {
      try {
        const row = await runExclusive(db, () =>
          db.getFirstAsync<ThemeRow>(
            "SELECT theme_mode, primary_color FROM user_profile WHERE id = 1",
          ),
        );
        if (!isMounted || !row) {
          return;
        }
        if (isThemeMode(row.theme_mode)) {
          setModeState(row.theme_mode);
        }
        if (isPrimaryColorKey(row.primary_color)) {
          setPrimaryKeyState(row.primary_color);
        }
      } catch (error) {
        console.error("Failed to load theme settings:", error);
      }
    }

    loadTheme();

    return () => {
      isMounted = false;
    };
  }, [db]);

  useEffect(() => {
    colorScheme.set(mode);
  }, [mode]);

  const isDark = mode === "system" ? rnColorScheme === "dark" : mode === "dark";
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
    systemColorScheme.set(isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const reassertScheme = () => {
      systemColorScheme.set(isDarkRef.current ? "dark" : "light");
    };
    const appearanceSub = Appearance.addChangeListener(reassertScheme);
    const appStateSub = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        reassertScheme();
      }
    });
    return () => {
      appearanceSub.remove();
      appStateSub.remove();
    };
  }, []);

  const colors = useMemo(
    () => resolveThemeColors(primaryKey, isDark),
    [primaryKey, isDark],
  );

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background).catch((error) => {
      console.warn("Failed to set the root background color:", error);
    });
  }, [colors.background]);

  const setMode = useCallback(
    (next: ThemeMode) => {
      setModeState(next);
      runExclusive(db, () =>
        db.runAsync(
          "UPDATE user_profile SET theme_mode = ?, updated_at = datetime('now') WHERE id = 1",
          next,
        ),
      ).catch((error) => {
        console.error("Failed to save theme mode:", error);
      });
    },
    [db],
  );

  const setPrimaryColor = useCallback(
    (key: PrimaryColorKey) => {
      setPrimaryKeyState(key);
      runExclusive(db, () =>
        db.runAsync(
          "UPDATE user_profile SET primary_color = ?, updated_at = datetime('now') WHERE id = 1",
          key,
        ),
      ).catch((error) => {
        console.error("Failed to save primary color:", error);
      });
    },
    [db],
  );

  const rootStyle = useMemo(
    () => [
      styles.root,
      { backgroundColor: colors.background },
      vars(buildThemeVariables(colors)),
    ],
    [colors],
  );

  const value = useMemo(
    () => ({ mode, primaryKey, isDark, colors, setMode, setPrimaryColor }),
    [mode, primaryKey, isDark, colors, setMode, setPrimaryColor],
  );

  return (
    <ThemeContext.Provider value={value}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
        translucent={false}
      />
      {Platform.OS === "android" ? <NavigationBar style="auto" /> : null}
      <View style={rootStyle}>{children}</View>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
