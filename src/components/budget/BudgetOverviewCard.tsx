import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";

export default function BudgetOverviewCard() {
  return (
    <View className="w-full rounded-3xl overflow-hidden shadow-lg border border-blue-100 bg-white">
      <LinearGradient
        colors={["#FFFFFF", "#F0F6FF"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ padding: 16, width: "100%" }}
      >
        {/* Title abnd Edit */}
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <View className="w-6 h-6 bg-blue-600 rounded-md items-center justify-center mr-2">
              <Ionicons name="wallet-outline" size={14} color="#FFFFFF" />
            </View>
            <Text
              style={{ color: "#334155" }}
              className="text-sm font-black tracking-wider"
            >
              MONTHLY GROCERY BUDGET
            </Text>
          </View>

          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="pencil-outline" size={14} color="#334155" />
            <Text
              style={{ color: "#334155" }}
              className="text-sm font-semibold  ml-1"
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>

        {/* Total Cost */}
        <View className="flex-row items-baseline mb-2">
          <Text
            style={{ color: "#2563EB" }}
            className="text-3xl font-extrabold mr-1"
          >
            ₱
          </Text>
          <Text className="text-4xl font-extrabold text-slate-900 tracking-tight">
            6,450.00
          </Text>
        </View>

        {/* Remaining */}
        <View className="flex-row items-baseline mb-2">
          <Text className="text-sm text-slate-500 font-medium mr-1">
            Remaining of
          </Text>
          <Text className="text-sm font-bold text-slate-800">₱ 15,000</Text>
        </View>

        {/* Percentage Available */}
        <View
          style={{ backgroundColor: "#DBEAFE" }}
          className="self-start border border-blue-200/50 px-3 py-1 rounded-full flex-row items-center mb-5 flex-nowrap shrink-0"
        >
          <View
            style={{ backgroundColor: "#2563EB" }}
            className="w-2 h-2 rounded-full mr-1.5 shrink-0"
          />
          <Text
            style={{ color: "#2563EB" }}
            className="text-xs font-bold whitespace-nowrap"
            numberOfLines={1}
          >
            43% Available • On Track
          </Text>
        </View>

        {/* Progress Bar */}
        <View className="h-2.5 w-full bg-slate-200/80 rounded-full flex-row overflow-hidden mb-2">
          <View
            style={{ backgroundColor: "#2563EB" }}
            className="h-full  w-[40%]"
          />
          <View
            style={{ backgroundColor: "#38BDF8" }}
            className="h-full  w-[20%]"
          />
        </View>

        {/* Planned, Spent, Unreserved */}
        <View className="flex-row justify-between items-center mb-6 px-1">
          <View className="flex-row items-center">
            <View className="w-2.5 h-2.5 rounded-full bg-blue-600 mr-1" />
            <Text className="text-[11px] font-semibold text-slate-600">
              Spent (₱5,350)
            </Text>
          </View>

          <View className="flex-row items-center">
            <View className="w-2.5 h-2.5 rounded-full bg-sky-400 mr-1" />
            <Text className="text-[11px] font-semibold text-slate-600">
              In Cart (₱2,180)
            </Text>
          </View>

          <View className="flex-row items-center">
            <View className="w-2.5 h-2.5 rounded-full bg-slate-300 mr-1" />
            <Text className="text-[11px] font-semibold text-slate-600">
              Free (₱6,450)
            </Text>
          </View>
        </View>

        {/* Planned, Spent, Unreserved */}
        <View>
          <View className="flex-row justify-between items-center px-1">
            <View className="flex-1 bg-white/80 p-3 rounded-2xl items-center border border-slate-100 shadow-sm mr-2">
              <Text className="text-[11px] font-semibold text-slate-500 mb-0.5">
                Planned
              </Text>
              <Text className="text-sm font-extrabold text-slate-900">
                ₱8,550
              </Text>
              <Text className="text-[10px] text-slate-400 font-medium mt-0.5">
                Allocated
              </Text>
            </View>

            <View className="flex-1 bg-blue-50/90 p-3 rounded-2xl items-center border border-blue-200/80 shadow-sm mx-1">
              <Text className="text-[11px] font-bold text-blue-700 mb-0.5">
                Spent
              </Text>
              <Text className="text-sm font-extrabold text-blue-700">
                ₱5,350
              </Text>
              <Text className="text-[10px] text-blue-500 font-semibold mt-0.5">
                Recorded
              </Text>
            </View>

            <View className="flex-1 bg-white/80 p-3 rounded-2xl items-center border border-slate-100 shadow-sm ml-2">
              <Text className="text-[11px] font-semibold text-slate-500 mb-0.5">
                Unreserved
              </Text>
              <Text className="text-sm font-extrabold text-slate-900">
                ₱6,450
              </Text>
              <Text className="text-[10px] text-blue-600 font-semibold mt-0.5">
                Safe
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
