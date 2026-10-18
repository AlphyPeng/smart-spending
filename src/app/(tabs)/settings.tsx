import { Ionicons } from "@expo/vector-icons";
import { useState, type ComponentProps } from "react";
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
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";
import { getInitials } from "../../lib/name";
import {
  PRIMARY_COLOR_KEYS,
  PRIMARY_PALETTES,
  type ThemeMode,
} from "../../lib/theme";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

const MODE_OPTIONS: { mode: ThemeMode; label: string; icon: IoniconName }[] = [
  { mode: "system", label: "System", icon: "phone-portrait-outline" },
  { mode: "light", label: "Light", icon: "sunny-outline" },
  { mode: "dark", label: "Dark", icon: "moon-outline" },
];

export default function SettingsScreen() {
  const { user, updateName } = useUser();
  const { mode, primaryKey, isDark, colors, setMode, setPrimaryColor } =
    useTheme();
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
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mb-4">
            Settings
          </Text>

          <View className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 mb-4">
            <View className="flex-row items-center">
              <View className="w-14 h-14 bg-primary rounded-full items-center justify-center shadow-md mr-4">
                <Text className="text-on-primary font-extrabold text-base">
                  {getInitials(user?.name ?? "")}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-extrabold text-slate-900 dark:text-slate-50">
                  {user?.name ?? "—"}
                </Text>
                <Text className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Naka-save sa local storage ng device mo
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
            <View className="flex-row items-center mb-4">
              <View className="w-6 h-6 bg-primary rounded-md items-center justify-center mr-2">
                <Ionicons name="person-outline" size={14} color={colors.onFill} />
              </View>
              <Text className="text-sm font-black tracking-wider text-slate-700 dark:text-slate-200">
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
              placeholderTextColor={colors.textMuted}
              autoCapitalize="words"
              autoCorrect={false}
              maxLength={30}
              returnKeyType="done"
              onSubmitEditing={handleSave}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-base font-semibold text-slate-800 dark:text-slate-100"
            />

            {error ? (
              <View className="flex-row items-center mt-3">
                <Ionicons name="alert-circle" size={14} color="#DC2626" />
                <Text className="text-xs text-red-600 dark:text-red-400 font-semibold ml-1.5">
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
                  ? "bg-primary"
                  : saved
                    ? "bg-emerald-500"
                    : "bg-slate-300 dark:bg-slate-700"
              }`}
            >
              {isSaving ? (
                <ActivityIndicator color={colors.onFill} />
              ) : (
                <>
                  <Ionicons
                    name={saved ? "checkmark-circle" : "save-outline"}
                    size={16}
                    color={
                      canSave ? colors.onFill : saved ? "#FFFFFF" : colors.textMuted
                    }
                  />
                  <Text
                    className={`text-sm font-extrabold ml-2 ${
                      canSave
                        ? "text-on-primary"
                        : saved
                          ? "text-white"
                          : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {saved ? "Na-save!" : "I-save ang Pangalan"}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <Text className="text-[11px] text-slate-400 dark:text-slate-500 text-center font-medium mt-4">
            Ang pangalan mo ay makikita sa greeting at profile sa Budget tab.
          </Text>

          <View className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 mt-4">
            <View className="flex-row items-center mb-4">
              <View className="w-6 h-6 bg-primary rounded-md items-center justify-center mr-2">
                <Ionicons
                  name="color-palette-outline"
                  size={14}
                  color={colors.onFill}
                />
              </View>
              <Text className="text-sm font-black tracking-wider text-slate-700 dark:text-slate-200">
                TEMA
              </Text>
            </View>

            <Text className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-2">
              MODE
            </Text>
            <View className="flex-row bg-slate-100 dark:bg-slate-800 rounded-2xl p-1">
              {MODE_OPTIONS.map((option) => {
                const selected = mode === option.mode;
                return (
                  <TouchableOpacity
                    key={option.mode}
                    onPress={() => setMode(option.mode)}
                    activeOpacity={0.85}
                    className={`flex-1 py-2.5 rounded-xl flex-row items-center justify-center ${
                      selected ? "bg-primary" : ""
                    }`}
                  >
                    <Ionicons
                      name={option.icon}
                      size={14}
                      color={selected ? colors.onFill : colors.textMuted}
                    />
                    <Text
                      className={`text-xs font-extrabold ml-1.5 ${
                        selected
                          ? "text-on-primary"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-2">
              {mode === "system"
                ? "Sinusundan ang setting ng phone mo."
                : mode === "dark"
                  ? "Palaging dark mode."
                  : "Palaging light mode."}
            </Text>

            <Text className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-2 mt-5">
              PANGUNAHING KULAY
            </Text>
            <View className="flex-row flex-wrap -mx-1">
              {PRIMARY_COLOR_KEYS.map((key) => {
                const palette = PRIMARY_PALETTES[key];
                const variant = isDark ? palette.dark : palette.light;
                const selected = primaryKey === key;
                return (
                  <View key={key} className="w-1/3 px-1 mb-3 items-center">
                    <TouchableOpacity
                      onPress={() => setPrimaryColor(key)}
                      activeOpacity={0.85}
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 23,
                        backgroundColor: variant.fill,
                        borderWidth: selected ? 2 : 1,
                        borderColor: selected ? colors.text : colors.border,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {selected ? (
                        <Ionicons
                          name="checkmark"
                          size={22}
                          color={variant.onFill}
                        />
                      ) : null}
                    </TouchableOpacity>
                    <Text
                      className={`text-[10px] font-semibold mt-1.5 ${
                        selected
                          ? "text-slate-900 dark:text-slate-50"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {palette.label}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
