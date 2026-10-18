import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
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
  const { colors } = useTheme();
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
    <View className="w-full rounded-3xl overflow-hidden border border-primary-line bg-white dark:bg-slate-900">
      <LinearGradient
        colors={[colors.surface, colors.soft]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ padding: 16, width: "100%" }}
      >
        {/* Title and Edit */}
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center flex-1 mr-2">
            <View className="w-6 h-6 bg-primary rounded-md items-center justify-center mr-2">
              <Ionicons name="wallet-outline" size={14} color={colors.onFill} />
            </View>
            <Text
              className="text-sm font-black tracking-wider flex-1 text-slate-700 dark:text-slate-200"
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
            <Ionicons
              name="pencil-outline"
              size={14}
              color={colors.textMuted}
            />
            <Text className="text-sm font-semibold ml-1 text-slate-700 dark:text-slate-200">
              Edit
            </Text>
          </TouchableOpacity>
        </View>

        {/* Total Cost */}
        <View className="flex-row items-baseline mb-2">
          <Text className="text-3xl font-extrabold mr-1 text-primary-accent">
            ₱
          </Text>
          <Text className="text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
            {formatNumber(unreserved)}
          </Text>
        </View>

        {/* Remaining */}
        <View className="flex-row items-baseline mb-2">
          <Text className="text-sm text-slate-500 dark:text-slate-400 font-medium mr-1">
            Remaining of
          </Text>
          <Text className="text-sm font-bold text-slate-800 dark:text-slate-100">
            {formatPeso(total)}
          </Text>
        </View>

        {/* Percentage Available */}
        <View className="self-start bg-primary-soft border border-primary-line px-3 py-1 rounded-full flex-row items-center mb-5 flex-nowrap shrink-0">
          <View
            style={{ backgroundColor: colors.accent }}
            className="w-2 h-2 rounded-full mr-1.5 shrink-0"
          />
          <Text
            className="text-xs font-bold whitespace-nowrap text-primary-accent"
            numberOfLines={1}
          >
            {availablePct}% Available • {availablePct >= 50 ? "On Track" : "Bantayan"}
          </Text>
        </View>

        {/* Progress Bar */}
        <View className="h-2.5 w-full bg-slate-200/80 dark:bg-slate-700/80 rounded-full flex-row overflow-hidden mb-2">
          <View
            style={{ backgroundColor: colors.accent, width: `${spentPct}%` }}
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
            <View className="w-2.5 h-2.5 rounded-full bg-primary-accent mr-1" />
            <Text className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              Spent ({formatPeso(spent)})
            </Text>
          </View>

          <View className="flex-row items-center">
            <View className="w-2.5 h-2.5 rounded-full bg-sky-400 mr-1" />
            <Text className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              In Cart ({formatPeso(inCart)})
            </Text>
          </View>

          <View className="flex-row items-center">
            <View className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 mr-1" />
            <Text className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              Free ({formatPeso(free)})
            </Text>
          </View>
        </View>

        {/* Planned, Spent, Unreserved */}
        <View>
          <View className="flex-row justify-between items-center px-1">
            <View className="flex-1 bg-white/80 dark:bg-slate-800/70 p-3 rounded-2xl items-center border border-slate-100 dark:border-slate-700 shadow-sm mr-2">
              <Text className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-0.5">
                Planned
              </Text>
              <Text className="text-sm font-extrabold text-slate-900 dark:text-slate-50">
                {formatPeso(planned)}
              </Text>
              <Text className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                Allocated
              </Text>
            </View>

            <View className="flex-1 bg-primary-soft p-3 rounded-2xl items-center border border-primary-line shadow-sm mx-1">
              <Text className="text-[11px] font-bold text-primary-accent mb-0.5">
                Spent
              </Text>
              <Text className="text-sm font-extrabold text-primary-accent">
                {formatPeso(spent)}
              </Text>
              <Text className="text-[10px] text-primary-accent font-semibold mt-0.5">
                Recorded
              </Text>
            </View>

            <View className="flex-1 bg-white/80 dark:bg-slate-800/70 p-3 rounded-2xl items-center border border-slate-100 dark:border-slate-700 shadow-sm ml-2">
              <Text className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-0.5">
                Unreserved
              </Text>
              <Text className="text-sm font-extrabold text-slate-900 dark:text-slate-50">
                {formatPeso(unreserved)}
              </Text>
              <Text className="text-[10px] text-primary-accent font-semibold mt-0.5">
                Safe
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
