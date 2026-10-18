import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BudgetHeader from "../../components/budget/BudgetHeader";
import BudgetOverviewCard from "../../components/budget/BudgetOverviewCard";

export default function BudgetScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Section */}
        <BudgetHeader />
        <BudgetOverviewCard />
      </ScrollView>
    </SafeAreaView>
  );
}
