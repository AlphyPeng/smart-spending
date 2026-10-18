import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";
import { BudgetProvider } from "../context/BudgetContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { UserProvider, useUser } from "../context/UserContext";
import { DATABASE_NAME, migrateDbIfNeeded } from "../db/database";

function RootNavigator() {
  const { isLoading, isOnboarded } = useUser();
  const { colors } = useTheme();

  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Protected guard={!isOnboarded}>
        <Stack.Screen name="onboarding" />
      </Stack.Protected>

      <Stack.Protected guard={isOnboarded}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrateDbIfNeeded}>
        <UserProvider>
          <ThemeProvider>
            <BudgetProvider>
              <RootNavigator />
            </BudgetProvider>
          </ThemeProvider>
        </UserProvider>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}
