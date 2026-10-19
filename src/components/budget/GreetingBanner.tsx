import { Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";
import { getFirstName } from "../../lib/name";

export default function GreetingBanner() {
  const { user } = useUser();
  const { colors } = useTheme();
  const firstName = getFirstName(user?.name ?? "Kaibigan");

  return (
    <View className="flex-row justify-between items-start mb-2">
      <View className="flex-1 mr-2">
        <View className="flex-row items-center">
          <Text className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mr-1.5">
            Kamusta, {firstName}!
          </Text>
          <Text className="text-xl">👋</Text>
        </View>
        <Text className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 leading-relaxed">
          Saturday, Oct 26 • Monthly Grocery Runss
        </Text>
      </View>

      <View className="flex-row items-center bg-primary-soft border border-primary-line px-3 py-1.5 rounded-full">
        <View
          style={{ backgroundColor: colors.accent }}
          className="w-2 h-2 rounded-full mr-1.5"
        />
        <Text className="text-[10px] font-extrabold text-primary-accent tracking-wider">
          OFFLINE READY
        </Text>
      </View>
    </View>
  );
}
