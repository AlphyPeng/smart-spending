import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { router } from "expo-router";

export default function CategoriesAllocation() {
  const { colors } = useTheme();

  return (
    <View className="flex-1">
      <View className="shadow-md m-2 mb-3 p-3 rounded bg-slate-100 dark:bg-slate-900">
        <View className="flex-row justify-between mb-2 w-full">
          <View className="flex-row items-center">
            <Ionicons name="pie-chart" size={20} color={colors.fill} />
            <Text className="ml-1 text-sm font-normal text-slate-900 dark:text-slate-100">CATEGORIES ALLOCATION</Text>
          </View>
          <View className="flex-row items-center justify-center px-2 py-1.5 w-auto h-auto rounded-2xl border border-primary-line bg-primary-soft">
            <View style={{ backgroundColor: colors.accent }} />
            <Text className="text-sm font-semibold text-primary-accent">57% Allocated</Text>
          </View>
        </View>

        <View className="flex-row mb-6 items-center">
          <View className="flex-1">
            <Text className="text-3xl font-bold text-slate-900 dark:text-slate-100">₱8,550.00</Text>
            <Text className="text-xs font-bold text-slate-500 dark:text-slate-400">of ₱15,000.00 Monthly Budget</Text>
          </View>
          <View>
            <Text className="text-xl font-bold text-primary-accent">₱6,450.00</Text>
            <View className="flex-row">
              <Ionicons name="shield-outline" size={15} color={colors.onFill} />
              <Text className="ml-1 text-xs font-bold text-[#3338ca]">Unallocated</Text>
            </View>
          </View>
        </View>

        <View className="flex-row mb-6 h-3 w-full rounded-full overflow-hidden bg-[#e2e7ff] dark:bg-slate-800">
          <View style={{ backgroundColor: "#2563eb" }} className="mr-1 h-full w-[30%] rounded-full" />
          <View style={{ backgroundColor: "#f59e0b" }} className="mr-1 h-full w-[20%] rounded-full" />
          <View style={{ backgroundColor: "#ba1a1a" }} className="mr-1 h-full w-[10%] rounded-full" />
          <View style={{ backgroundColor: "#818cf8" }} className="mr-1 h-full w-[10%] rounded-full" />
          <View style={{ backgroundColor: "#c3c0ff" }} className="mr-1 h-full w-[30%] rounded-full" />
        </View>

        <View className="flex-row justify-between p-2 bg-[#f2f3ff] dark:bg-slate-800">
          <View className="flex-row">
            <Ionicons name="ellipse" size={15} color="#2563eb" />
            <Text className="ml-1 text-xs font-bold text-slate-500 dark:text-slate-400">Assigned:</Text>
            <Text className="ml-1 text-xs font-bold text-slate-900 dark:text-slate-100">4 of 8 Categories</Text>
          </View>
          <View className="flex-row">
            <Ionicons name="ellipse" size={15} color="#06b6d4" />
            <Text className="ml-1 text-xs font-bold text-slate-500 dark:text-slate-400">Buffer:</Text>
            <Text className="ml-1 text-xs font-bold text-slate-900 dark:text-slate-100">43% Safe</Text>
          </View>
        </View>
      </View>

      <View className="flex-row m-2 mb-3">
        <View className="flex-row items-center justify-center mr-2 px-2 py-1.5 w-auto h-auto rounded-2xl" style={{ backgroundColor: colors.fill }}>
          <Ionicons name="checkmark" size={15} color="#ffffff" />
          <Text className="ml-1 text-xs font-bold text-[#ffffff]">All (4)</Text>
        </View>

        <View className="flex-row items-center justify-center mr-2 shadow-md px-2 py-1.5 w-auto h-auto rounded-2xl bg-slate-100 dark:bg-slate-900">
          <Ionicons name="ellipse" size={15} color="#f59e0b" />
          <Text className="ml-1 text-xs font-bold text-slate-500 dark:text-slate-400">Critical (&lt;20%)</Text>
        </View>

        <View className="flex-row items-center justify-center mr-2 shadow-md px-2 py-1.5 w-auto h-auto rounded-2xl bg-slate-100 dark:bg-slate-900">
          <Ionicons name="ellipse" size={15} color="#ba1a1a" />
          <Text className="ml-1 text-xs font-bold text-slate-500 dark:text-slate-400">Over Budget (1)</Text>
        </View>
      </View>

      <View className="shadow-md m-2 mb-3 p-3 rounded bg-slate-100 dark:bg-slate-900">
        <View className="absolute top-2 right-2 flex-row items-center justify-center p-1.5 w-auto h-auto rounded-2xl border border-primary-line bg-primary-soft">
          <View style={{ backgroundColor: colors.accent }} />
          <Ionicons name="checkmark-circle-outline" size={15} color={colors.fill} />
          <Text className="ml-1 text-xs font-bold text-primary-accent">Healthy</Text>
        </View>

        <View className="flex-row items-center mb-4">
          <View className="items-center justify-center mr-3 w-11 h-11 rounded-full" style={{ backgroundColor: colors.fill }}>
            <Ionicons name="fish-outline" size={25} color={colors.onFill} />
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold text-slate-900 dark:text-slate-100">Fresh Produce & Meats</Text>
            <View className="flex-row">
              <Text className="text-xs font-normal text-slate-500 dark:text-slate-400">6 items in cart • </Text>
              <Text className="text-xs font-normal text-[#2563eb]">54% available</Text>
            </View>
          </View>
        </View>

        <View className="flex-row mb-4 py-3 rounded-full bg-[#f2f3ff] dark:bg-slate-800">
          <View className="flex-1 items-center">
            <Text className="text-xs font-normal text-slate-500 dark:text-slate-400">Spent</Text>
            <Text className="text-base font-bold text-slate-900 dark:text-slate-100">₱1,850.00</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-xs font-normal text-slate-500 dark:text-slate-400">Left</Text>
            <Text className="text-base font-bold text-[#2563eb]">₱2,150.00</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-xs font-normal text-slate-500 dark:text-slate-400">Limit</Text>
            <Text className="text-base font-bold text-slate-900 dark:text-slate-100">₱4,000.00</Text>
          </View>
        </View>

        <View className="flex-row mb-6 h-3 w-full rounded-full overflow-hidden bg-[#e2e7ff] dark:bg-slate-800">
          <View style={{ backgroundColor: colors.fill }} className="h-full w-[45%] rounded-full" />
        </View>

        <View className="flex-row justify-between">
          <View className="flex-row items-center justify-center py-4 h-auto w-[60%]" style={{ backgroundColor: colors.fill }}>
            <Ionicons name="add-circle-outline" size={20} color="#ffffff" />
            <Text className="ml-1 text-base font-bold text-[#ffffff]">Add Item</Text>
          </View>
          <View className="flex-row items-center justify-center py-4 h-auto w-[37%] bg-[#e2e7ff] dark:bg-slate-800">
            <Text className="text-base font-bold text-slate-900 dark:text-slate-100">View (6)</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.onFill} />
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={() => router.push("/categories/create")} className="absolute bottom-2 right-2">
        <View className="flex-row items-center justify-center p-4 w-auto h-auto rounded-full" style={{ backgroundColor: colors.fill }}>
          <Ionicons name="folder-outline" size={15} color="#ffffff" />
          <Text className="ml-2 text-base font-bold text-[#ffffff]">Add Category</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
