import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface BudgetEmptyStateProps {
  onCreate: () => void;
}

export default function BudgetEmptyState({ onCreate }: BudgetEmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-lg items-center mt-2">
      <View className="w-20 h-20 bg-primary-soft border border-primary-line rounded-full items-center justify-center mb-5">
        <Ionicons name="wallet-outline" size={36} color={colors.accent} />
      </View>

      <Text className="text-lg font-extrabold text-slate-900 dark:text-slate-50 mb-2">
        Wala ka pang budget
      </Text>
      <Text className="text-sm text-slate-500 dark:text-slate-400 font-medium text-center leading-relaxed">
        Gumawa ng iyong unang budget para masimulan ang pagsubaybay ng iyong
        gastusin.
      </Text>

      <TouchableOpacity
        onPress={onCreate}
        activeOpacity={0.85}
        className="mt-6 bg-primary rounded-2xl py-3.5 px-6 flex-row items-center shadow-md"
      >
        <Ionicons
          name="add-circle-outline"
          size={18}
          color={colors.onFill}
        />
        <Text className="text-on-primary text-sm font-extrabold ml-2">
          Gumawa ng Budget
        </Text>
      </TouchableOpacity>
    </View>
  );
}
