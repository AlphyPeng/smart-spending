import { Stack } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

export default function OnboardingLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="name" />
    </Stack>
  );
}
