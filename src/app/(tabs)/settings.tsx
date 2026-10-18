import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../context/UserContext";
import { getInitials } from "../../lib/name";

export default function SettingsScreen() {
  const { user, updateName } = useUser();
  const [name, setName] = useState(user?.name ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmedName = name.trim();
  const hasChanges = trimmedName.length > 0 && trimmedName !== user?.name;
  const canSave = hasChanges && !isSaving;

  async function handleSave() {
    if (!canSave) {
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await updateName(trimmedName);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("May problema sa pag-save. Subukan ulit.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text className="text-2xl font-extrabold text-slate-900 mb-4">
            Settings
          </Text>

          <View className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-4">
            <View className="flex-row items-center">
              <View className="w-14 h-14 bg-blue-600 rounded-full items-center justify-center shadow-md mr-4">
                <Text className="text-white font-extrabold text-base">
                  {getInitials(user?.name ?? "")}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-extrabold text-slate-900">
                  {user?.name ?? "—"}
                </Text>
                <Text className="text-xs text-slate-500 font-medium mt-0.5">
                  Naka-save sa local storage ng device mo
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
            <View className="flex-row items-center mb-4">
              <View className="w-6 h-6 bg-blue-600 rounded-md items-center justify-center mr-2">
                <Ionicons name="person-outline" size={14} color="#FFFFFF" />
              </View>
              <Text className="text-sm font-black tracking-wider text-slate-700">
                PANGALAN
              </Text>
            </View>

            <TextInput
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (error) {
                  setError(null);
                }
                if (saved) {
                  setSaved(false);
                }
              }}
              placeholder="Hal. Juan Dela Cruz"
              placeholderTextColor="#94A3B8"
              autoCapitalize="words"
              autoCorrect={false}
              maxLength={30}
              returnKeyType="done"
              onSubmitEditing={handleSave}
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

            <TouchableOpacity
              onPress={handleSave}
              disabled={!canSave}
              activeOpacity={0.85}
              className={`rounded-2xl py-3.5 flex-row items-center justify-center shadow-sm mt-4 ${
                canSave
                  ? "bg-blue-600"
                  : saved
                    ? "bg-emerald-500"
                    : "bg-slate-300"
              }`}
            >
              {isSaving ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons
                    name={saved ? "checkmark-circle" : "save-outline"}
                    size={16}
                    color="#FFFFFF"
                  />
                  <Text className="text-white text-sm font-extrabold ml-2">
                    {saved ? "Na-save!" : "I-save ang Pangalan"}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <Text className="text-[11px] text-slate-400 text-center font-medium mt-4">
            Ang pangalan mo ay makikita sa greeting at profile sa Budget tab.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
