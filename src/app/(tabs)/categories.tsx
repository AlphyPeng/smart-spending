import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoriesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50 p-4">
      <Text className="text-2xl font-bold text-slate-800">
        Categories Screen
      </Text>
    </SafeAreaView>
  );
}
