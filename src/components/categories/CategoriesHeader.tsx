import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useUser } from "../../context/UserContext";
import { getInitials } from "../../lib/name";

export default function CategoriesHeader() {
  const { user } = useUser();
  const initials = getInitials(user?.name?.trim() ?? "");

  return (
    <View>
      <View className="flex-row items-center">
        <View className="items-center justify-center mr-3 w-10 h-10 rounded-full bg-[#dbeafe]">
          <Ionicons name="bag-outline" size={20} color="#2563eb" />
        </View>

        <View className="flex-1">
          <Text className="text-xl font-bold text-[#000000]">Categories Lists</Text>
          <Text className="text-base font-normal text-[#64748b]">₱4,850.00 Limit</Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="filter" size={20} color="#2563eb" />
          <View className="items-center justify-center ml-4 w-10 h-10 rounded-full bg-[#2563eb]">
            { initials
              ? (<Text className="text-xs font-bold text-[#ffffff]">{ initials }</Text>)
              : (<Ionicons name="person-outline" size={20} color="#ffffff" />)
            }
          </View>
        </View>
      </View>
    </View>
  );
}
