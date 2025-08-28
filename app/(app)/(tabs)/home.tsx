import { DailyQuestCard } from "@/components/home/DailyQuestCard";
import { QuickStartSection } from "@/components/home/QuickStartSection";
import { WelcomeHeader } from "@/components/home/WelcomeHeader";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "expo-router";
import React from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const auth = useAuthStore();
  const router = useRouter();
  const firstName = auth.fullName ? auth.fullName.split(" ")[0] : "Дмитрий";
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <WelcomeHeader name={firstName} />
        <QuickStartSection />
        <View style={styles.sectionTitleWrap}>
          <Button
            title="Выйти"
            onPress={() => {
              auth.logout();
              router.replace("/(auth)/login");
            }}
          />
        </View>
        <View style={styles.sectionBlock}>
          <DailyQuestCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F7" },
  content: { paddingBottom: 24, gap: 16 },
  sectionTitleWrap: { paddingHorizontal: 16, paddingTop: 12 },
  sectionBlock: { paddingHorizontal: 16 },
});
