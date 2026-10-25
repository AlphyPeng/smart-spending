import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";
import { getInitials } from "../../lib/name";
import { router } from "expo-router";

export default function CategoriesCreateHeader() {
  const { user } = useUser();
  const { colors } = useTheme();
  
  const initials = getInitials(user?.name?.trim() ?? "");

  return (
    <View>
      <View className="flex-row items-center justify-between mb-3 px-4 pt-5">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.push("/(tabs)/categories")}>
            <Ionicons name="arrow-back-outline" size={20} color={colors.onFill} />
          </TouchableOpacity>
          <Text className="ml-4 text-xl font-bold text-slate-900 dark:text-slate-100">Create Category</Text>
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.push("/(tabs)/categories")}>
            <Ionicons name="close" size={20} color={colors.onFill} />
          </TouchableOpacity>
          <View className="items-center justify-center ml-4 w-10 h-10 rounded-full" style={{ backgroundColor: colors.fill }}>
            { initials
              ? (<Text className="text-xs font-bold text-[#ffffff]">{ initials }</Text>)
              : (<Ionicons name="person-outline" size={20} color={colors.onFill} />)
            }
          </View>
        </View>
      </View>
    </View>
  );
}