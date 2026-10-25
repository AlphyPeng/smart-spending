import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";
import { router } from "expo-router";

export default function CategoriesAllocation() {
  const { colors } = useTheme();

  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <View className="flex-1">
      <View className="flex-row justify-end m-2">
        <Text className="text-base font-normal text-slate-500 dark:text-slate-400">Step 1 of 1</Text>
      </View>
      <View className="shadow-md m-2 mb-3 p-3 rounded bg-slate-100 dark:bg-slate-900">
        <View className="flex-row mb-3">
          <View className="items-center justify-center mr-4 w-10 h-10 rounded-full" style={{ backgroundColor: colors.fill }}>
            <Ionicons name="wallet-outline" size={20} color={colors.onFill} />
          </View>
          <View className="flex-1">
            <Text className="text-base font-normal text-slate-500 dark:text-slate-400">AVAILABLE TO ALLOCATE</Text>
            <Text className="mb-2 text-3xl font-bold text-primary-accent">₱6,450.00</Text>
            <Text className="text-sm font-normal text-slate-900 dark:text-slate-100">
              Your main grocery budget is <Text className="font-bold">₱15,000.00</Text>.
            </Text>
            <Text className="text-sm font-normal text-slate-900 dark:text-slate-100">
              <Text className="font-bold">₱8,550.00</Text> is currently assigned across 4 categories.
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between p-3 bg-[#e2e7ff] dark:bg-slate-800">
          <View className="flex-row items-center">
            <Ionicons name="ellipse" size={15} color="#2563eb" />
            <Text className="ml-2 text-sm font-normal text-slate-900 dark:text-slate-100">Committed: 57%</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="ellipse" size={15} color="#38dbf8" />
            <Text className="ml-2 text-sm font-normal text-slate-900 dark:text-slate-100">Free: 43% (₱6,450.00)</Text>
          </View>
        </View>
      </View>
      <View className="shadow-md m-2 mb-3 p-3 rounded bg-slate-100 dark:bg-slate-900">
        <View className="flex-row justify-between mb-2">
          <Text className="text-base font-bold text-slate-900 dark:text-slate-100">Category Name</Text>
          <Text className="text-sm font-normal text-slate-500 dark:text-slate-400">Required</Text>
        </View>
        <View className="flex-row items-center border mb-2 p-4 rounded-full bg-[#e2e7ff] dark:bg-slate-800">
          <Ionicons name="caret-forward-outline" size={20} color={colors.onFill} />
          <Text className="ml-2 text-lg font-bold text-slate-900 dark:text-slate-100">Beverages & Drinks</Text>
        </View>
        <Text className="mb-2 text-base font-normal text-slate-500 dark:text-slate-400">Quick suggestions</Text>
        <View className="flex-row">
          <View className="flex-row items-center justify-center mr-2 shadow-md px-2 py-1.5 w-auto h-auto rounded-2xl bg-[#e2e7ff] dark:bg-slate-800">
            <Ionicons name="add-outline" size={20} color={colors.onFill} />
            <Text className="ml-1 text-sm font-bold text-slate-900 dark:text-slate-100">Frozen Foods</Text>
          </View>
          <View className="flex-row items-center justify-center mr-2 shadow-md px-2 py-1.5 w-auto h-auto rounded-2xl bg-[#e2e7ff] dark:bg-slate-800">
            <Ionicons name="add-outline" size={20} color={colors.onFill} />
            <Text className="ml-1 text-sm font-bold text-slate-900 dark:text-slate-100">Personal Care</Text>
          </View>
        </View>
      </View>
      <View className="shadow-md m-2 mb-3 p-3 rounded bg-slate-100 dark:bg-slate-900">
        <View className="flex-row justify-between mb-2">
          <Text className="text-base font-bold text-slate-900 dark:text-slate-100">Target Allocation Amount</Text>
          <Text className="text-sm font-bold text-primary-accent">Max ₱6,450.00</Text>
        </View>
        <View className="flex-row items-center mb-3 p-3 rounded-2xl bg-[#e2e7ff] dark:bg-slate-800">
          <Text className="mr-3 text-3xl font-bold text-slate-900 dark:text-slate-100">₱</Text>
          <TextInput
            value={amount}
            onChangeText={(text) => {
              setAmount(text);
              if (error) setError(null);
            }}
            placeholder="0.00"
            keyboardType="decimal-pad"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={12}
            className="flex-1 border mr-3 text-3xl font-bold text-slate-900 dark:text-slate-100"
          />
          <View className="items-center justify-center mr-3 w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900">
            <Ionicons name="remove-outline" size={25} color={colors.onFill} />
          </View>
          <View className="items-center justify-center mr-3 w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900">
            <Ionicons name="add-outline" size={25} color={colors.onFill} />
          </View>
        </View>
        <View className="flex-row">
          <View className="flex-row items-center justify-center mr-4 px-2 py-1.5 w-auto h-auto rounded-full bg-[#e2e7ff] dark:bg-slate-800">
            <Text className="ml-1 text-base font-bold text-slate-900 dark:text-slate-100">₱500</Text>
          </View>
          <View className="flex-row items-center justify-center mr-4 shadow-md px-2 py-1.5 w-auto h-auto rounded-full bg-[#e2e7ff] dark:bg-slate-800">
            <Text className="ml-1 text-base font-bold text-slate-900 dark:text-slate-100">₱1,000</Text>
          </View>
          <View className="flex-row items-center justify-center mr-4 shadow-md px-2 py-1.5 w-auto h-auto rounded-full" style={{ backgroundColor: colors.fill }}>
            <Text className="ml-1 text-base font-bold text-[#ffffff]">₱1,500</Text>
          </View>
          <View className="flex-row items-center justify-center mr-4 shadow-md px-2 py-1.5 w-auto h-auto rounded-full bg-[#e2e7ff] dark:bg-slate-800">
            <Text className="ml-1 text-base font-bold text-slate-900 dark:text-slate-100">₱2,000</Text>
          </View>
        </View>
      </View>
      <View className="shadow-md m-2 mb-3 p-3 rounded bg-slate-100 dark:bg-slate-900">
        <View className="flex-row justify-between mb-1">
          <Text className="text-base font-bold text-slate-900 dark:text-slate-100">Badge Appearance</Text>
          <View className="flex-row items-center justify-center p-1.5 w-auto h-auto rounded-2xl border border-primary-line bg-primary-soft">
            <View style={{ backgroundColor: colors.accent }} />
            <Ionicons name="wine-outline" size={15} color={colors.fill} />
            <Text className="ml-1 text-xs font-bold text-primary-accent">Beverages</Text>
          </View>
        </View>
        <View>
          <Text className="text-sm font-bold text-slate-500 dark:text-slate-400">Theme Color</Text>
          <View className="flex-row">
            <Ionicons name="ellipse" size={60} color="#2563eb" />
            <Ionicons name="ellipse" size={60} color="#4f46e5" />
            <Ionicons name="ellipse" size={60} color="#0ea5e9" />
            <Ionicons name="ellipse" size={60} color="#7c3aed" />
            <Ionicons name="ellipse" size={60} color="#f43f5e" />
          </View>
          <Text className="mb-3 text-sm font-bold text-slate-500 dark:text-slate-400">Category Icon</Text>
          <View className="flex-row">
            <View className="items-center justify-center mr-4 w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-950">
              <Ionicons name="cart-outline" size={30} color={colors.onFill} />
            </View>
            <View className="items-center justify-center mr-4 w-14 h-14 rounded-full" style={{ backgroundColor: colors.fill }}>
              <Ionicons name="wine-outline" size={30} color={colors.onFill} />
            </View>
            <View className="items-center justify-center mr-4 w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-950">
              <Ionicons name="fish-outline" size={30} color={colors.onFill} />
            </View>
            <View className="items-center justify-center mr-4 w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-950">
              <Ionicons name="sparkles-outline" size={30} color={colors.onFill} />
            </View>
            <View className="items-center justify-center mr-4 w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-950">
              <Ionicons name="hammer-outline" size={30} color={colors.onFill} />
            </View>
          </View>
        </View>
      </View>
      <View className="shadow-md m-2 mb-3 p-3 rounded bg-[#f2f3ff] dark:bg-slate-900">
        <View className="flex-row justify-between mb-1">
          <Text className="text-base font-bold text-slate-900 dark:text-slate-100">Budget Health Impact</Text>
          <View className="flex-row items-center justify-center p-1.5 w-auto h-auto rounded-2xl border border-primary-line bg-primary-soft">
            <View style={{ backgroundColor: colors.accent }} />
            <Ionicons name="shield-checkmark-outline" size={15} color={colors.fill} />
            <Text className="ml-1 text-xs font-bold text-primary-accent">Safe Buffer</Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-base font-bold text-slate-500 dark:text-slate-400">Remaining Unassigned:</Text>
          <Text className="text-lg font-bold text-slate-900 dark:text-slate-100">₱4,950.00</Text>
        </View>
        <View className="flex-row mb-1 h-3 w-full rounded-full overflow-hidden bg-[#e2e7ff] dark:bg-slate-800">
          <View style={{ backgroundColor: "#2563eb" }} className="mr-1 h-full w-[55%] rounded-full" />
          <View style={{ backgroundColor: "#0ea5e9" }} className="mr-1 h-full w-[10%] rounded-full" />
        </View>
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-xs font-normal text-slate-500 dark:text-slate-400">Projected: 67% committed</Text>
          <Text className="text-xs font-normal text-slate-500 dark:text-slate-400">₱10,050 / ₱15,000 total</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="alert-circle-outline" size={15} color={colors.fill} />
          <Text className="ml-2 text-xs font-normal text-slate-500 dark:text-slate-400">
            Remaining balance gives you plenty of wiggle room for real-time discounts or impulsive finds.
          </Text>
        </View>
      </View>
      <View>
        <View className="flex-row items-center justify-center m-2 p-4 w-auto h-auto rounded-full" style={{ backgroundColor: colors.fill }}>
          <Ionicons name="checkmark-circle-outline" size={20} color="#ffffff" />
          <Text className="ml-2 text-base font-bold text-[#ffffff]">Save Category</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/(tabs)/categories")}>
          <View className="flex-row items-center justify-center m-2 p-4 w-auto h-auto rounded-full bg-[#e2e7ff] dark:bg-slate-800">
            <Ionicons name="close-circle-outline" size={20} color="#ffffff" />
            <Text className="ml-2 text-base font-bold text-slate-900 dark:text-slate-100">Cancel</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
