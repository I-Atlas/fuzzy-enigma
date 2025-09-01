import Logo from "@/assets/svg/logo.svg";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConfirmScreen() {
  const router = useRouter();
  const { generateCode, email, login } = useAuthStore();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState<number>(59);

  useEffect(() => {
    generateCode();
    setResendIn(59);
  }, []);

  useEffect(() => {
    if (resendIn <= 0) return;
    const id = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [resendIn]);

  const resendDisabled = resendIn > 0;

  const onChange = (value: string) => {
    const next = value.replace(/\D/g, "").slice(0, 4);
    setCode(next);
    if (next.length < 4) {
      // Clear error while user is still typing
      if (error) setError(null);
      return;
    }
    const expected = String(7777 - new Date().getDate() * 10 - 1)
      .padStart(4, "0")
      .slice(0, 4);
    if (next !== expected) {
      setError("Некорректное значение");
      return;
    } else if (error) {
      setError(null);
      return;
    }
    login();
    router.replace("/(app)/(tabs)/home");
  };

  const resendText = resendDisabled
    ? `Отправить код повторно 00:${resendIn}`
    : "Отправить код повторно";

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            <View style={styles.header}>
              <Logo />
              <Text style={styles.title}>Подтверждение</Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.subtitle}>
                Код отправлен на адрес {email}
              </Text>
              <Input
                value={code}
                onChangeText={onChange}
                placeholder="Введите код"
                keyboardType="number-pad"
                textAlign={code.length > 0 ? "center" : "left"}
                error={error}
                maxLength={4}
              />
            </View>

            <View style={styles.footer}>
              <Button
                title={resendText}
                onPress={() => setResendIn(59)}
                disabled={resendDisabled}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
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
    textAlign: "center",
    fontSize: 14,
    color: "#808080",
  },
  form: {
    flexDirection: "column",
    gap: 16,
    marginTop: 24,
    width: "100%",
  },
  footer: {
    flexDirection: "column",
    position: "absolute",
    gap: 12,
    left: 0,
    right: 0,
    bottom: 24,
  },
});
