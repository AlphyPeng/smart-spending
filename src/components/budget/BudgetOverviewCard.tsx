import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import type { Budget } from "../../context/BudgetContext";
import { formatNumber, formatPeso } from "../../lib/currency";

interface BudgetOverviewCardProps {
  budget: Budget;
  onEdit: () => void;
}

export default function BudgetOverviewCard({
  budget,
  onEdit,
}: BudgetOverviewCardProps) {
  const total = budget.amount;
  const spent = 0;
  const inCart = 0;
  const planned = 0;
  const free = Math.max(total - spent - inCart, 0);
  const unreserved = Math.max(total - planned, 0);
  const availablePct =
    total > 0 ? Math.round(((total - spent - inCart) / total) * 100) : 0;
  const spentPct = total > 0 ? (spent / total) * 100 : 0;
  const inCartPct = total > 0 ? (inCart / total) * 100 : 0;

  return (
    <View className="w-full rounded-3xl overflow-hidden border border-blue-100 bg-white">
      <LinearGradient
        colors={["#FFFFFF", "#F0F6FF"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ padding: 16, width: "100%" }}
      >
        {/* Title and Edit */}
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center flex-1 mr-2">
            <View className="w-6 h-6 bg-blue-600 rounded-md items-center justify-center mr-2">
              <Ionicons name="wallet-outline" size={14} color="#FFFFFF" />
            </View>
            <Text
              style={{ color: "#334155" }}
              className="text-sm font-black tracking-wider flex-1"
              numberOfLines={1}
            >
              {budget.name.toUpperCase()}
            </Text>
          </View>

          <TouchableOpacity
            className="flex-row items-center"
            hitSlop={8}
            onPress={onEdit}
          >
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
            {formatNumber(unreserved)}
          </Text>
        </View>

        {/* Remaining */}
        <View className="flex-row items-baseline mb-2">
          <Text className="text-sm text-slate-500 font-medium mr-1">
            Remaining of
          </Text>
          <Text className="text-sm font-bold text-slate-800">
            {formatPeso(total)}
          </Text>
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
            {availablePct}% Available • {availablePct >= 50 ? "On Track" : "Bantayan"}
          </Text>
        </View>

        {/* Progress Bar */}
        <View className="h-2.5 w-full bg-slate-200/80 rounded-full flex-row overflow-hidden mb-2">
          <View
            style={{ backgroundColor: "#2563EB", width: `${spentPct}%` }}
            className="h-full"
          />
          <View
            style={{ backgroundColor: "#38BDF8", width: `${inCartPct}%` }}
            className="h-full"
          />
        </View>

        {/* Spent, In Cart, Free */}
        <View className="flex-row justify-between items-center mb-6 px-1">
          <View className="flex-row items-center">
            <View className="w-2.5 h-2.5 rounded-full bg-blue-600 mr-1" />
            <Text className="text-[11px] font-semibold text-slate-600">
              Spent ({formatPeso(spent)})
            </Text>
          </View>

          <View className="flex-row items-center">
            <View className="w-2.5 h-2.5 rounded-full bg-sky-400 mr-1" />
            <Text className="text-[11px] font-semibold text-slate-600">
              In Cart ({formatPeso(inCart)})
            </Text>
          </View>

          <View className="flex-row items-center">
            <View className="w-2.5 h-2.5 rounded-full bg-slate-300 mr-1" />
            <Text className="text-[11px] font-semibold text-slate-600">
              Free ({formatPeso(free)})
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
                {formatPeso(planned)}
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
                {formatPeso(spent)}
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
                {formatPeso(unreserved)}
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
