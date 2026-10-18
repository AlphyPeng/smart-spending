import { SafeAreaView } from "react-native-safe-area-context";

import CategoriesHeader from "../../components/categories/CategoriesHeader";
import CategoriesAllocation from "../../components/categories/CategoriesAllocation";

export default function CategoriesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#faf8ff] p-4">
      <CategoriesHeader />
      <CategoriesAllocation />
    </SafeAreaView>
  );
}
