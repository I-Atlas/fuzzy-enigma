import { Button, Typography } from "@/components/ui";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.content}>
        <Typography variant="bold" color="grey" size={24} style={styles.title}>
          Ничего не найдено
        </Typography>
        <Typography color="#666666" size={14} style={styles.subtitle}>
          Похоже, такой страницы не существует
        </Typography>
      </View>

      <View style={styles.footer}>
        <Button title="Вернуться назад" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 8,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
