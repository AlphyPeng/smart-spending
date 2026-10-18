import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BudgetHeader from "../../components/budget/BudgetHeader";
import BudgetOverviewCard from "../../components/budget/BudgetOverviewCard";
import GreetingBanner from "../../components/budget/GreetingBanner";

export default function BudgetScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top"]}>
      {/* Top Header Section */}
      <BudgetHeader />

      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting Banner Section */}
        <GreetingBanner />

        {/* Budget Overview Section */}
        <BudgetOverviewCard />
      </ScrollView>
    </SafeAreaView>
  );
}
