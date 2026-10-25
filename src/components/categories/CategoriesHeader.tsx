import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";
import { getInitials } from "../../lib/name";
import { router } from "expo-router";

export default function CategoriesHeader() {
  const { user } = useUser();
  const { colors } = useTheme();

  const initials = getInitials(user?.name?.trim() ?? "");

  return (
    <View>
      <View className="flex-row items-center mb-3 px-4 pt-5">
        <View className="items-center justify-center mr-4 w-10 h-10 rounded-full" style={{ backgroundColor: colors.fill }}>
          <Ionicons name="bag-outline" size={20} color={colors.onFill} />
        </View>

        <View className="flex-1">
          <Text className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Categories Lists
          </Text>
          <Text className="text-base font-normal text-slate-500 dark:text-slate-400">
            ₱4,850.00 Limit
          </Text>
        </View>
        
        <View className="flex-row items-center">
          <Ionicons name="filter" size={20} color={colors.onFill} />
          <TouchableOpacity onPress={() => router.push("/(tabs)/settings")}>
            <View className="items-center justify-center ml-4 w-10 h-10 rounded-full" style={{ backgroundColor: colors.fill }}>
              { initials
                ? (<Text className="text-xs font-bold text-[#ffffff]">{ initials }</Text>)
                : (<Ionicons name="person-outline" size={20} color={colors.onFill} />)
              }
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
