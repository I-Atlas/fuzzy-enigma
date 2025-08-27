import { useAuthStore } from "@/stores/auth";
import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const auth = useAuthStore();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Главная</Text>
      <Button
        title="Выйти"
        onPress={() => {
          auth.logout();
          router.replace("/(auth)/login");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "600" },
});
