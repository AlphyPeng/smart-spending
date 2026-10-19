import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function CategoryCard() {
  const { colors } = useTheme();

  return (
    <View>
      <View className="flex-row justify-between items-center my-4">
        {/* Kaliwa: Title + Counter Badge */}
        <View className="flex-row items-center">
          <Text className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mr-2">
            Grocery Categories
          </Text>

          {/* Count Badge (4) */}
          <View className="bg-slate-200/80 px-2 py-0.5 rounded-full items-center justify-center">
            <Text className="text-xs font-bold text-slate-700">4</Text>
          </View>
        </View>

        {/* Kanan: Urgency Sort/Filter Button */}
        <TouchableOpacity className="flex-row items-center bg-white border border-slate-200/80 px-3 py-1.5 rounded-full shadow-sm">
          <Ionicons name="swap-vertical" size={14} color="#334155" />
          <Text className="text-xs font-semibold text-slate-700 ml-1">
            Urgency
          </Text>
        </TouchableOpacity>
      </View>

      <View className="w-full rounded-3xl overflow-hidden border border-primary-line bg-white dark:bg-slate-900">
        <View
          style={{ backgroundColor: colors.fill }}
          className="absolute left-0 top-0 bottom-0 w-2 "
        />

        <View className="p-5 pl-7">
          {/* Header Section */}
          <View className="flex-row justify-between items-start mb-3">
            <View className="flex-row items-center flex-1">
              {/* Icon Container */}
              <View
                style={{ backgroundColor: colors.fill }}
                className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-slate-800 items-center justify-center mr-3"
              >
                <Ionicons name="nutrition" size={24} color={colors.onFill} />
              </View>

              {/* Title & Items Tracked */}
              <View className="flex-1">
                <Text className="text-xl font-extrabold text-slate-900 dark:text-slate-50">
                  Fresh Produce & Meats
                </Text>
                <Text className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  6 items tracked
                </Text>
              </View>
            </View>

            {/* Badge (Healthy) */}
            <View className="flex-row items-center bg-primary-soft border border-primary-line px-3 py-1.5 rounded-full">
              <Ionicons
                name="checkmark-circle-outline"
                size={14}
                style={{ marginRight: 4 }}
                color={colors.fill}
              />
              <Text className="text-[10px] font-extrabold text-primary-accent tracking-wider">
                Healthy
              </Text>
            </View>
          </View>

          {/* Tags / Items Chips Section */}
          <View className="flex-row flex-wrap gap-2 my-3">
            <View className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
              <Text className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Pork Belly (1.2kg)
              </Text>
            </View>
            <View className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
              <Text className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Kangkong
              </Text>
            </View>
            <View className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
              <Text className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Red Onions
              </Text>
            </View>
            <View className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
              <Text className="text-xs font-medium text-slate-700 dark:text-slate-300">
                +3 more
              </Text>
            </View>
          </View>

          {/* Financial / Spent & Left Section */}
          <View className="flex-row justify-between items-center mt-2 mb-3">
            <View>
              <Text className="text-xs text-slate-500 dark:text-slate-400">
                Spent
              </Text>
              <Text className="text-base font-bold text-slate-900 dark:text-slate-50">
                ₱1,850.00
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-xs text-slate-500 dark:text-slate-400">
                Left
              </Text>
              <Text
                style={{ color: colors.fill }}
                className="text-base font-bold"
              >
                ₱2,150.00
              </Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
            <View
              className="h-full rounded-full"
              style={{ width: "46%", backgroundColor: colors.fill }}
            />
          </View>

          {/* Footer Info (Allocated & % used) */}
          <View className="flex-row justify-between items-center">
            <Text className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Allocated: ₱4,000.00
            </Text>
            <Text style={{ color: colors.fill }} className="text-xs font-bold">
              46% used
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
