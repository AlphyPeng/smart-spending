import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../../context/UserContext";
import { getInitials } from "../../lib/name";

export default function BudgetHeader() {
  const { user } = useUser();
  const initials = getInitials(user?.name ?? "");

  return (
    <View>
      <View className="flex-row justify-between items-center mb-3 px-4 pt-5">
        <View className="flex-row items-center">
          <View
            style={{ backgroundColor: "#2563EB" }}
            className="w-12 h-12 rounded-2xl items-center justify-center shadow-md mr-2"
          >
            <Ionicons name="wallet" size={24} color="#FFFFFF" />
          </View>
          <View>
            <View className="flex-row items-center">
              <Text className="text-xl font-extrabold text-slate-900 mr-2">
                Allocwenta
              </Text>
              <View className="bg-slate-200 px-1.5 py-0.5 rounded-md">
                <Text className="text-[10px] font-bold text-slate-600">PH</Text>
              </View>
            </View>
            <View className="flex-row items-center mt-0.5">
              <View
                style={{ backgroundColor: "#2563EB" }}
                className="w-2 h-2 rounded-full  mr-1.5"
              />
              <Text className="text-xs text-slate-500 font-medium">
                Puregold San Juan • Local Storage
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity className="w-10 h-10 bg-white border border-slate-200 rounded-full items-center justify-center shadow-sm mr-2">
            <Ionicons name="storefront-outline" size={18} color="#334155" />
          </TouchableOpacity>

          <View className="w-10 h-10 bg-blue-600 rounded-full items-center justify-center shadow-md">
            <Text className="text-white font-bold text-xs">{initials}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: "#E2E8F0",
          opacity: 0.5,
          width: "100%",
        }}
      />
    </View>
  );
}
