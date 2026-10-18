import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface AddBudgetCardProps {
  onPress: () => void;
}

export default function AddBudgetCard({ onPress }: AddBudgetCardProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      className="flex-1 rounded-3xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-600 items-center justify-center p-6"
      style={({ pressed }) =>
        pressed
          ? { backgroundColor: colors.soft, borderColor: colors.softBorder }
          : null
      }
    >
      <View className="w-12 h-12 bg-primary-soft border border-primary-line rounded-2xl items-center justify-center mb-3">
        <Ionicons name="add" size={24} color={colors.accent} />
      </View>
      <Text className="text-sm font-extrabold text-slate-700 dark:text-slate-200 mb-1">
        Bagong Budget
      </Text>
      <Text className="text-[11px] text-slate-400 dark:text-slate-500 font-medium text-center leading-relaxed">
        Gumawa ng panibagong budget na susubaybayan mo.
      </Text>
      <View className="mt-3 bg-primary px-4 py-2 rounded-full flex-row items-center">
        <Ionicons
          name="add-circle-outline"
          size={14}
          color={colors.onFill}
        />
        <Text className="text-on-primary text-[11px] font-extrabold ml-1.5">
          Gumawa Ngayon
        </Text>
      </View>
    </Pressable>
  );
}
