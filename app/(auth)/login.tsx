import Logo from "@/assets/svg/logo.svg";
import { Button, Input } from "@/components/ui";
import { useAuthStore, validateEmail } from "@/stores/auth";
import { useRouter } from "expo-router";
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
  const { setEmail } = useAuthStore();
  const [localEmail, setLocalEmail] = useState("");
  const [errors, setErrors] = useState<{
    email?: string | null;
  }>({});
  const canSubmit = validateEmail(localEmail) === "";

  const onSubmit = () => {
    const e = validateEmail(localEmail);
    setErrors({ email: e });
    if (!e) {
      setEmail(localEmail.trim());
      router.replace("/(auth)/confirm");
    }
  };

  const handleChange = (inputValue: string) => {
    setLocalEmail(inputValue);
    const validationError = validateEmail(inputValue);
    setErrors((e) => ({ ...e, email: validationError }));
  };

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
              <Text style={styles.title}>Вход</Text>
            </View>

            <View style={styles.form}>
              <Input
                value={localEmail}
                onChangeText={handleChange}
                placeholder="Email*"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.email ?? null}
              />
            </View>

            <View style={styles.footer}>
              <Button
                title="Продолжить"
                onPress={onSubmit}
                disabled={!canSubmit}
              />
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
});
