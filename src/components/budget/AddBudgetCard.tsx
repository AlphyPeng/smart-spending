import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface AddBudgetCardProps {
  onPress: () => void;
}

export default function AddBudgetCard({ onPress }: AddBudgetCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 rounded-3xl bg-white border border-dashed border-slate-300 items-center justify-center p-6"
      style={({ pressed }) =>
        pressed ? { backgroundColor: "#EFF6FF", borderColor: "#93C5FD" } : null
      }
    >
      <View className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl items-center justify-center mb-3">
        <Ionicons name="add" size={24} color="#2563EB" />
      </View>
      <Text className="text-sm font-extrabold text-slate-700 mb-1">
        Bagong Budget
      </Text>
      <Text className="text-[11px] text-slate-400 font-medium text-center leading-relaxed">
        Gumawa ng panibagong budget na susubaybayan mo.
      </Text>
      <View className="mt-3 bg-blue-600 px-4 py-2 rounded-full flex-row items-center">
        <Ionicons name="add-circle-outline" size={14} color="#FFFFFF" />
        <Text className="text-white text-[11px] font-extrabold ml-1.5">
          Gumawa Ngayon
        </Text>
      </View>
    </Pressable>
  );
}
