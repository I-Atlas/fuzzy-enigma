import Logo from "@/assets/svg/logo.svg";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  applyPhoneMask,
  useAuthStore,
  validateFullName,
  validatePhone,
} from "@/stores/auth";
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

export default function RegisterScreen() {
  const router = useRouter();
  const { fullName, setFullName, phone, setPhone } = useAuthStore();
  const [localPhone, setLocalPhone] = useState(phone);
  const [errors, setErrors] = useState<{
    fullName?: string | null;
    phone?: string | null;
  }>({});

  const canSubmit =
    validateFullName(fullName) === "" && validatePhone(localPhone) === "";

  const onSubmit = () => {
    const e1 = validateFullName(fullName);
    const e2 = validatePhone(localPhone);
    setErrors({ fullName: e1, phone: e2 });
    if (!e1 && !e2) {
      setPhone(localPhone.replace(/\D/g, "").slice(-10));
      router.replace("/confirm");
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            <View style={styles.header}>
              <Logo />
              <Text style={styles.title}>Вход в личный кабинет</Text>
            </View>

            <View style={styles.form}>
              <Input
                value={fullName}
                onChangeText={setFullName}
                placeholder="Фамилия Имя Отчество*"
                autoCapitalize="words"
                autoCorrect={false}
                error={errors.fullName ?? null}
              />
              <View style={{ height: 16 }} />
              <Input
                value={localPhone}
                onChangeText={handleChange}
                placeholder="Номер телефона*"
                keyboardType="phone-pad"
                error={errors.phone ?? null}
              />
            </View>

            <View style={styles.footer}>
              <Button
                title="Продолжить"
                onPress={onSubmit}
                disabled={!canSubmit}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.text}>Есть аккаунт? </Text>
                <Link href="/(auth)/login" style={styles.link} asChild>
                  <Text style={styles.link}>Войти</Text>
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
