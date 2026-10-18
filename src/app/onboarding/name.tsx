import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../context/UserContext";

export default function NameSetupScreen() {
  const { completeOnboarding } = useUser();
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmedName = name.trim();
  const canSubmit = trimmedName.length > 0 && !isSaving;

  async function handleSubmit() {
    if (!canSubmit) {
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await completeOnboarding(trimmedName);
    } catch {
      setError("May problema sa pag-save. Subukan ulit.");
      setIsSaving(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="px-4 pt-2">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-white border border-slate-200 rounded-full items-center justify-center shadow-sm"
          >
            <Ionicons name="arrow-back" size={20} color="#334155" />
          </TouchableOpacity>
        </View>

        <View className="flex-1 px-6 justify-center">
          <View className="items-center mb-8">
            <View className="w-16 h-16 bg-blue-600 rounded-3xl items-center justify-center shadow-md mb-4">
              <Ionicons name="person" size={28} color="#FFFFFF" />
            </View>
            <Text className="text-2xl font-extrabold text-slate-900 text-center mb-2">
              {"Ano ang gusto naming itawag sa'yo?"}
            </Text>
            <Text className="text-sm text-slate-500 text-center font-medium leading-relaxed">
              Gagamitin namin ang pangalan mo para batiin ka tuwing bubuksan
              mo ang app.
            </Text>
          </View>

          <View className="bg-white rounded-3xl p-5 shadow-lg border border-slate-100">
            <Text className="text-xs font-bold text-slate-500 tracking-wider mb-2">
              PANGALAN MO
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (error) {
                  setError(null);
                }
              }}
              placeholder="Hal. Juan Dela Cruz"
              placeholderTextColor="#94A3B8"
              autoFocus
              autoCapitalize="words"
              autoCorrect={false}
              maxLength={30}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
              className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-base font-semibold text-slate-800"
            />

            {error ? (
              <View className="flex-row items-center mt-3">
                <Ionicons name="alert-circle" size={14} color="#DC2626" />
                <Text className="text-xs text-red-600 font-semibold ml-1.5">
                  {error}
                </Text>
              </View>
            ) : null}

            {trimmedName.length > 0 ? (
              <View className="flex-row items-center bg-blue-50/80 border border-blue-100 rounded-2xl px-4 py-3 mt-4">
                <Text className="text-2xl mr-2">👋</Text>
                <Text className="text-sm font-bold text-blue-700 flex-1">
                  Kamusta, {trimmedName}!
                </Text>
              </View>
            ) : null}
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!canSubmit}
            activeOpacity={0.85}
            className={`rounded-2xl py-4 flex-row items-center justify-center shadow-md mt-6 ${
              canSubmit ? "bg-blue-600" : "bg-slate-300"
            }`}
          >
            {isSaving ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Text className="text-white text-base font-extrabold mr-2">
                  Simulan na!
                </Text>
                <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
              </>
            )}
          </TouchableOpacity>

          <Text className="text-[11px] text-slate-400 text-center font-medium mt-3">
            Pwede mo itong baguhin anumang oras sa Settings.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
