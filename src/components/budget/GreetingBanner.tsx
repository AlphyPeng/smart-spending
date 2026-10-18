import { Text, View } from "react-native";

export default function GreetingBanner() {
  return (
    <View className="flex-row justify-between items-start mb-2">
      <View className="flex-1 mr-2">
        <View className="flex-row items-center">
          <Text className="text-2xl font-extrabold text-slate-900 mr-1.5">
            Kamusta, Juan!
          </Text>
          <Text className="text-xl">👋</Text>
        </View>
        <Text className="text-xs text-slate-500 font-medium mt-0.5 leading-relaxed">
          Saturday, Oct 26 • Monthly Grocery Runss
        </Text>
      </View>

      <View className="flex-row items-center bg-blue-50/80 border border-blue-100 px-3 py-1.5 rounded-full">
        <View
          style={{ backgroundColor: "#2563EB" }}
          className="w-2 h-2 rounded-full mr-1.5"
        />
        <Text className="text-[10px] font-extrabold text-blue-700 tracking-wider">
          OFFLINE READY
        </Text>
      </View>
    </View>
  );
}
