import Logo from "@/assets/svg/Logo";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { applyPhoneMask, useAuthStore, validatePhone } from "@/stores/auth";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
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

export default function LoginScreen() {
  const router = useRouter();
  const { setPhone, login } = useAuthStore();
  const [localPhone, setLocalPhone] = useState("");
  const [errors, setErrors] = useState<{
    phone?: string | null;
  }>({});
  const canSubmit = validatePhone(localPhone) === "";

  const onSubmit = () => {
    const e = validatePhone(localPhone);
    setErrors({ phone: e });
    if (!e) {
      setPhone(localPhone.replace(/\D/g, "").slice(-10));
      login();
      router.replace("/(app)/(tabs)/home");
    }
  };

  const handleChange = (inputValue: string) => {
    if (inputValue.length < localPhone.length) {
      const maskedValue = applyPhoneMask(inputValue);
      setLocalPhone(maskedValue);
      setErrors((e) => ({ ...e, phone: null }));
      return;
    }

    const maskedValue = applyPhoneMask(inputValue);
    setLocalPhone(maskedValue);

    const validationError = validatePhone(maskedValue);
    setErrors((e) => ({ ...e, phone: validationError }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            <View style={styles.header}>
              <Logo />
              <Text style={styles.title}>Вход</Text>
            </View>

            <View style={styles.form}>
              <Input
                value={localPhone}
                onChangeText={handleChange}
                placeholder="Номер телефона*"
                keyboardType="phone-pad"
                error={errors.phone ?? null}
              />
            </View>

            <View style={styles.footer}>
              <Button title="Войти" onPress={onSubmit} disabled={!canSubmit} />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.text}>Нет аккаунта? </Text>
                <Link href="/(auth)/register" style={styles.link} asChild>
                  <Text style={styles.link}>Зарегистрироваться</Text>
                </Link>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F7F7", paddingHorizontal: 16 },
  header: { marginTop: 24, alignItems: "center", gap: 16 },
  title: { fontSize: 28, lineHeight: 34, fontWeight: "700", color: "#1F2937" },
  form: { marginTop: 24, width: "100%" },
  footer: {
    flexDirection: "column",
    position: "absolute",
    gap: 12,
    left: 0,
    right: 0,
    bottom: 24,
  },
  text: { fontSize: 14, lineHeight: 20, fontWeight: "400", color: "#1F2937" },
  link: { fontSize: 14, lineHeight: 20, fontWeight: "400", color: "#0A6CFF" },
});
