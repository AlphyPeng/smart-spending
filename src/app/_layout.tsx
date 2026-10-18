import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";
import { BudgetProvider } from "../context/BudgetContext";
import { UserProvider, useUser } from "../context/UserContext";
import { DATABASE_NAME, migrateDbIfNeeded } from "../db/database";

function RootNavigator() {
  const { isLoading, isOnboarded } = useUser();

  if (isLoading) {
    return (
      <View className="flex-1 bg-slate-50 items-center justify-center">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
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
          <BudgetProvider>
            <RootNavigator />
          </BudgetProvider>
        </UserProvider>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}
