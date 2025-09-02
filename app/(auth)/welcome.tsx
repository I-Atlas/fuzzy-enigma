import Logo from "@/assets/svg/logo.svg";
import { FloatingPill } from "@/components/auth";
import { Button, Typography } from "@/components/ui";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();
  const { width } = Dimensions.get("window");

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Logo />
          <Typography
            variant="bold"
            size={32}
            color="grey"
            style={styles.title}
          >
            Рады видеть тебя в команде!
          </Typography>
        </View>

        <View style={styles.floatingContainer}>
          <FloatingPill
            text="Советы от коллег"
            left={width * 0.04}
            top={0}
            rotate={-0.3}
          />
          <FloatingPill
            text="Общение"
            left={width * 0.64}
            top={32}
            delay={300}
            rotate={0.5}
          />
          <FloatingPill
            text="Знакомство с командой"
            left={width * 0.1}
            top={32 * 4}
            rotate={-0.1}
            delay={150}
          />
          <FloatingPill
            text="Лайфхаки"
            left={width * 0.54}
            top={32 * 6}
            delay={600}
            rotate={0.3}
          />
          <FloatingPill
            text="Корпоративные традиции"
            left={width * 0.04}
            top={32 * 8}
            delay={900}
            rotate={0.1}
          />
        </View>

        <View style={styles.footer}>
          <Button
            title="Начать"
            onPress={() => router.replace("/(auth)/login")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F7F7", paddingHorizontal: 16 },
  header: { marginTop: 24, alignItems: "center", gap: 16 },
  title: { textAlign: "center" },
  floatingContainer: {
    position: "absolute",
    top: 220,
    left: 0,
    right: 0,
    alignItems: "center",
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
