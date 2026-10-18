import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function CategoriesAllocation() {
  return (
    <View>
      <View className="m-2 p-3 rounded bg-[#ffffff]">
        <View className="flex-row justify-between mb-2 w-full">
          <View className="flex-row items-center">
            <Ionicons name="pie-chart" size={20} color="#2563eb" />
            <Text className="ml-1 text-sm font-normal text-[#64748b]">CATEGORIES ALLOCATION</Text>
          </View>
          <View className="p-1.5 w-auto h-auto rounded-2xl bg-[#dbe1ff]">
            <Text className="text-sm font-semibold text-[#2563eb]">57% Allocated</Text>
          </View>
        </View>

        <View className="flex-row mb-6 items-center">
          <View className="flex-1">
            <Text className="text-3xl font-bold text-[#000000]">₱8,550.00</Text>
            <Text className="text-xs font-bold text-[#64748b]">of ₱15,000.00 Monthly Budget</Text>
          </View>
          <View>
            <Text className="text-xl font-bold text-[#3338ca]">₱6,450.00</Text>
            <View className="flex-row">
              <Ionicons name="shield-outline" size={15} color="#3338ca" />
              <Text className="ml-1 text-xs font-bold text-[#3338ca]">Unallocated</Text>
            </View>
          </View>
        </View>

        <View className="flex-row h-3 w-full rounded-full overflow-hidden bg-[#e2e7ff]">
          <View style={{ backgroundColor: "#2563EB" }} className="mr-1 h-full w-[30%] rounded-full" />
          <View style={{ backgroundColor: "#f59e0b" }} className="mr-1 h-full w-[20%] rounded-full" />
          <View style={{ backgroundColor: "#ba1a1a" }} className="mr-1 h-full w-[10%] rounded-full" />
          <View style={{ backgroundColor: "#818cf8" }} className="mr-1 h-full w-[10%] rounded-full" />
          <View style={{ backgroundColor: "#c3c0ff" }} className="mr-1 h-full w-[30%] rounded-full" />
        </View>
      </View>
    </View>
  );
}