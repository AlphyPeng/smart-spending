import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FEATURES = [
  {
    icon: "cloud-offline-outline" as const,
    title: "Offline Ready",
    description: "Gumagana kahit walang internet connection.",
  },
  {
    icon: "phone-portrait-outline" as const,
    title: "Naka-save sa Device",
    description: "Ligtas ang data mo sa local storage ng phone mo.",
  },
  {
    icon: "wallet-outline" as const,
    title: "Subaybayan ang Budget",
    description: "I-track ang gastos sa grocery at iba pang gastusin.",
  },
];

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={["#2563EB", "#1D4ED8", "#1E40AF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingTop: 56,
            paddingBottom: 64,
            paddingHorizontal: 24,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            alignItems: "center",
          }}
        >
          <View className="w-20 h-20 bg-white/15 rounded-3xl items-center justify-center border border-white/20 mb-6">
            <View className="w-14 h-14 bg-white rounded-2xl items-center justify-center shadow-lg">
              <Ionicons name="wallet" size={30} color="#2563EB" />
            </View>
          </View>

          <Text className="text-3xl font-extrabold text-white text-center mb-1">
            Allocwenta
          </Text>
          <Text className="text-sm font-semibold text-blue-100 text-center mb-5">
            Smart Spending • Budget Tracker
          </Text>

          <View className="bg-white/15 border border-white/20 px-4 py-2 rounded-full">
            <Text className="text-xs font-bold text-white tracking-wide">
              MALIGAYANG PAGDATING! 👋
            </Text>
          </View>
        </LinearGradient>

        <View className="flex-1 px-6 -mt-8">
          <View className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
            <Text className="text-xl font-extrabold text-slate-900 text-center mb-1.5">
              Kumusta! Ako si Allocwenta.
            </Text>
            <Text className="text-sm text-slate-500 text-center leading-relaxed">
              Ang smart na katuwang mo sa pagsubaybay ng budget para sa grocery
              at pang-araw-araw na gastusin.
            </Text>

            <View className="mt-6">
              {FEATURES.map((feature, index) => (
                <View
                  key={feature.title}
                  className={`flex-row items-center py-3 ${
                    index > 0 ? "border-t border-slate-100" : ""
                  }`}
                >
                  <View className="w-11 h-11 bg-blue-50 border border-blue-100 rounded-2xl items-center justify-center mr-3">
                    <Ionicons name={feature.icon} size={20} color="#2563EB" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-bold text-slate-800">
                      {feature.title}
                    </Text>
                    <Text className="text-xs text-slate-500 font-medium mt-0.5">
                      {feature.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View className="mt-8 mb-6">
            <TouchableOpacity
              onPress={() => router.push("/onboarding/name")}
              activeOpacity={0.85}
              className="bg-blue-600 rounded-2xl py-4 flex-row items-center justify-center shadow-md"
            >
              <Text className="text-white text-base font-extrabold mr-2">
                Simulan
              </Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </TouchableOpacity>

            <Text className="text-[11px] text-slate-400 text-center font-medium mt-3">
              Ise-set up lang natin ang pangalan mo. Mabilis lang ito!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
