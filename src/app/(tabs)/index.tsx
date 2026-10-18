import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BudgetDeck from "../../components/budget/BudgetDeck";
import BudgetHeader from "../../components/budget/BudgetHeader";
import GreetingBanner from "../../components/budget/GreetingBanner";

export default function BudgetScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top"]}>
      {/* Top Header Section */}
      <BudgetHeader />

      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
      >
        {/* Greeting Banner Section */}
        <GreetingBanner />

        {/* Budget Deck Section */}
        <BudgetDeck />
      </ScrollView>
    </SafeAreaView>
  );
}
