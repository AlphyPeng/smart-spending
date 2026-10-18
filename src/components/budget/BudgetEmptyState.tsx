import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface BudgetEmptyStateProps {
  onCreate: () => void;
}

export default function BudgetEmptyState({ onCreate }: BudgetEmptyStateProps) {
  return (
    <View className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg items-center mt-2">
      <View className="w-20 h-20 bg-blue-50 border border-blue-100 rounded-full items-center justify-center mb-5">
        <Ionicons name="wallet-outline" size={36} color="#2563EB" />
      </View>

      <Text className="text-lg font-extrabold text-slate-900 mb-2">
        Wala ka pang budget
      </Text>
      <Text className="text-sm text-slate-500 font-medium text-center leading-relaxed">
        Gumawa ng iyong unang budget para masimulan ang pagsubaybay ng iyong
        gastusin.
      </Text>

      <TouchableOpacity
        onPress={onCreate}
        activeOpacity={0.85}
        className="mt-6 bg-blue-600 rounded-2xl py-3.5 px-6 flex-row items-center shadow-md"
      >
        <Ionicons name="add-circle-outline" size={18} color="#FFFFFF" />
        <Text className="text-white text-sm font-extrabold ml-2">
          Gumawa ng Budget
        </Text>
      </TouchableOpacity>
    </View>
  );
}
