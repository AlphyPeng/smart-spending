import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useBudgets, type Budget } from "../../context/BudgetContext";

interface InlineBudgetFormProps {
  mode: "create" | "edit";
  initialBudget?: Budget;
  onCancel: () => void;
  onSaved: () => void;
}

export default function InlineBudgetForm({
  mode,
  initialBudget,
  onCancel,
  onSaved,
}: InlineBudgetFormProps) {
  const { addBudget, updateBudget } = useBudgets();
  const isEditing = mode === "edit" && initialBudget !== undefined;

  const [name, setName] = useState(initialBudget?.name ?? "");
  const [amountText, setAmountText] = useState(
    initialBudget ? String(initialBudget.amount) : ""
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleAmountChange(text: string) {
    const cleaned = text.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    const normalized =
      parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : cleaned;
    setAmountText(normalized);
    if (error) {
      setError(null);
    }
  }

  async function handleSubmit() {
    const trimmedName = name.trim();
    const parsedAmount = Number(amountText);

    if (trimmedName.length === 0) {
      setError("Ilagay ang pangalan ng budget.");
      return;
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("Maglagay ng valid na amount na mas malaki sa 0.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      if (isEditing && initialBudget) {
        await updateBudget(initialBudget.id, trimmedName, parsedAmount);
      } else {
        await addBudget(trimmedName, parsedAmount);
      }
      onSaved();
    } catch {
      setError("May problema sa pag-save. Subukan ulit.");
      setIsSaving(false);
    }
  }

  return (
    <View className="grow rounded-3xl bg-white border border-slate-100 p-5 justify-center">
      <View className="flex-row items-center mb-4">
        <View className="w-9 h-9 bg-blue-600 rounded-2xl items-center justify-center mr-2.5">
          <Ionicons name={isEditing ? "pencil" : "add"} size={18} color="#FFFFFF" />
        </View>
        <View className="flex-1 mr-2">
          <Text className="text-sm font-extrabold text-slate-900">
            {isEditing ? "I-edit ang Budget" : "Bagong Budget"}
          </Text>
          <Text className="text-[11px] text-slate-400 font-medium">
            {isEditing
              ? "Baguhin ang pangalan o total na halaga."
              : "Pangalanan at lagyan ng total na halaga."}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onCancel}
          hitSlop={8}
          className="w-8 h-8 bg-slate-100 rounded-full items-center justify-center"
        >
          <Ionicons name="close" size={16} color="#64748B" />
        </TouchableOpacity>
      </View>

      <Text className="text-[11px] font-bold text-slate-500 tracking-wider mb-1.5">
        PANGALAN NG BUDGET
      </Text>
      <TextInput
        value={name}
        onChangeText={(text) => {
          setName(text);
          if (error) {
            setError(null);
          }
        }}
        placeholder="Hal. Monthly Grocery"
        placeholderTextColor="#94A3B8"
        autoFocus={!isEditing}
        autoCapitalize="words"
        autoCorrect={false}
        maxLength={40}
        returnKeyType="next"
        className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-base font-semibold text-slate-800"
      />

      <Text className="text-[11px] font-bold text-slate-500 tracking-wider mb-1.5 mt-3">
        TOTAL NA HALAGA
      </Text>
      <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4">
        <Text className="text-lg font-extrabold text-blue-600 mr-1">₱</Text>
        <TextInput
          value={amountText}
          onChangeText={handleAmountChange}
          placeholder="0.00"
          placeholderTextColor="#94A3B8"
          keyboardType="decimal-pad"
          maxLength={12}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
          className="flex-1 py-3 text-base font-semibold text-slate-800"
        />
      </View>

      {error ? (
        <View className="flex-row items-center mt-2.5">
          <Ionicons name="alert-circle" size={13} color="#DC2626" />
          <Text className="text-[11px] text-red-600 font-semibold ml-1.5">
            {error}
          </Text>
        </View>
      ) : null}

      <View className="flex-row mt-4">
        <TouchableOpacity
          onPress={onCancel}
          disabled={isSaving}
          activeOpacity={0.85}
          className="flex-1 bg-slate-100 rounded-2xl py-3 items-center justify-center mr-2"
        >
          <Text className="text-slate-600 text-sm font-extrabold">
            Kanselahin
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSaving}
          activeOpacity={0.85}
          className={`flex-1 rounded-2xl py-3 flex-row items-center justify-center ${
            isSaving ? "bg-blue-400" : "bg-blue-600"
          }`}
        >
          {isSaving ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
              <Text className="text-white text-sm font-extrabold ml-1.5">
                {isEditing ? "I-save" : "I-save ang Budget"}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
