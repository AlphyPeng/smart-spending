import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function CategoriesAllocation() {
  return (
    <View>
      <View className="shadow-md m-2 mb-3 p-3 rounded bg-[#ffffff]">
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

        <View className="flex-row mb-6 h-3 w-full rounded-full overflow-hidden bg-[#e2e7ff]">
          <View style={{ backgroundColor: "#2563eb" }} className="mr-1 h-full w-[30%] rounded-full" />
          <View style={{ backgroundColor: "#f59e0b" }} className="mr-1 h-full w-[20%] rounded-full" />
          <View style={{ backgroundColor: "#ba1a1a" }} className="mr-1 h-full w-[10%] rounded-full" />
          <View style={{ backgroundColor: "#818cf8" }} className="mr-1 h-full w-[10%] rounded-full" />
          <View style={{ backgroundColor: "#c3c0ff" }} className="mr-1 h-full w-[30%] rounded-full" />
        </View>

        <View className="flex-row justify-between p-2 bg-[#f2f3ff]">
          <View className="flex-row">
            <Ionicons name="ellipse" size={15} color="#2563eb" />
            <Text className="ml-1 text-xs font-bold text-[#64748b]">Assigned:</Text>
            <Text className="ml-1 text-xs font-bold text-[#000000]">4 of 8 Categories</Text>
          </View>
          <View className="flex-row">
            <Ionicons name="ellipse" size={15} color="#06b6d4" />
            <Text className="ml-1 text-xs font-bold text-[#64748b]">Buffer:</Text>
            <Text className="ml-1 text-xs font-bold text-[#000000]">43% Safe</Text>
          </View>
        </View>
      </View>

      <View className="flex-row m-2 mb-3">
        <View className="flex-row mr-2 p-1.5 w-auto h-auto rounded-2xl bg-[#2563eb]">
          <Ionicons name="checkmark" size={15} color="#ffffff" />
          <Text className="ml-1 text-xs font-bold text-[#ffffff]">All (4)</Text>
        </View>

        <View className="flex-row mr-2 shadow-md p-1.5 w-auto h-auto rounded-2xl bg-[#ffffff]">
          <Ionicons name="ellipse" size={15} color="#f59e0b" />
          <Text className="ml-1 text-xs font-bold text-[#64748b]">Critical (&lt;20%)</Text>
        </View>

        <View className="flex-row mr-2 shadow-md p-1.5 w-auto h-auto rounded-2xl bg-[#ffffff]">
          <Ionicons name="ellipse" size={15} color="#ba1a1a" />
          <Text className="ml-1 text-xs font-bold text-[#64748b]">Over Budget (1)</Text>
        </View>
      </View>

      <View className="shadow-md m-2 mb-4 p-3 rounded bg-[#ffffff]">
        <View className="absolute top-2 right-2 flex-row p-1.5 w-auto h-auto rounded-2xl bg-[#dbeafe]">
          <Ionicons name="checkmark-circle-outline" size={15} color="#2563eb" />
          <Text className="ml-1 text-xs font-bold text-[#2563eb]">Healthy</Text>
        </View>

        <View className="flex-row items-center">
          <View className="items-center justify-center mr-3 w-11 h-11 rounded-full bg-[#dbeafe]">
            <Ionicons name="fish-outline" size={25} color="#2563eb" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold text-[#020617]">Fresh Produce & Meats</Text>
            <View className="flex-row">
              <Text className="text-xs font-normal text-[#64748b]">6 items in cart • </Text>
              <Text className="text-xs font-normal text-[#2563eb]">54% available</Text>
            </View>
          </View>
        </View>

        <View></View>
      </View>
    </View>
  );
}
