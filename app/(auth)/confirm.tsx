import Logo from "@/assets/svg/Logo";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConfirmScreen() {
  const router = useRouter();
  const { generateCode, phone, login } = useAuthStore();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState<number>(60);

  useEffect(() => {
    // Generate code on mount and start timer
    generateCode();
    setResendIn(60);
  }, [generateCode]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const id = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [resendIn]);

  const canSubmit = useMemo(() => code.length === 4, [code]);

  const onSubmit = () => {
    const expected = String(7777 - new Date().getDate() * 10 - 1)
      .padStart(4, "0")
      .slice(0, 4);
    if (code !== expected) {
      setError("Некорректное значение");
      return;
    }
    setError(null);
    login();
    router.replace("/(app)/(tabs)/home");
  };

  const resendText =
    resendIn > 0
      ? `Отправить код повторное через ${resendIn} секунд`
      : "Вы можете запросить код снова";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={styles.container}
      >
        <View style={styles.header}>
          <Logo />
          <Text style={styles.title}>Подтверждение</Text>
          <Text style={styles.subtitle}>
            Код отправлен на номер {formatPhoneForSubtitle(phone)}
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            value={code}
            onChangeText={(v) => {
              setCode(v.replace(/\D/g, "").slice(0, 4));
              if (error) setError(null);
            }}
            placeholder="____"
            keyboardType="number-pad"
            textAlign="center"
            error={error}
          />
          <Text style={styles.helper}>{resendText}</Text>
        </View>

        <View style={styles.footer}>
          <Button title="Продолжить" onPress={onSubmit} disabled={!canSubmit} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 64,
    alignItems: "center",
    gap: 8,
  },
  title: {
    marginTop: 8,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    color: "#1F2937",
  },
  subtitle: {
    marginTop: 8,
    color: "#6B7280",
  },
  form: {
    marginTop: 24,
    width: "100%",
  },
  helper: {
    marginTop: 12,
    textAlign: "left",
    color: "#6B7280",
  },
  footer: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 24,
  },
});

function formatPhoneForSubtitle(phone: string): string {
  const digits = (phone || "").replace(/\D/g, "").slice(-10);
  if (!digits) return "";
  const p1 = digits.slice(0, 3);
  const p2 = digits.slice(3, 6);
  const p3 = digits.slice(6, 8);
  const p4 = digits.slice(8, 10);
  return `8 ${p1} ${p2}-${p3}-${p4}`;
}
