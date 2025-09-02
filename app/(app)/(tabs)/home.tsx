import {
  DailyQuestCard,
  HomeSegmentedTabs,
  QuickStartSection,
  WelcomeHeader,
} from "@/components/home";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "expo-router";
import React from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function HomeScreen() {
  const auth = useAuthStore();
  const router = useRouter();
  const firstName = "Дмитрий";
  const insets = useSafeAreaInsets();
  const [tab, setTab] = React.useState<"hacks" | "office" | "team" | "remote">(
    "office",
  );
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.stickyTop}>
        <WelcomeHeader name={firstName} />
        <HomeSegmentedTabs value={tab} onChange={setTab} />
      </View>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
      >
        {tab === "office" && (
          <>
            <QuickStartSection />
            <View style={styles.sectionBlock}>
              <DailyQuestCard />
            </View>
          </>
        )}
        {tab === "team" && (
          <View style={styles.sectionBlock}>
            <DailyQuestCard title="Командный челлендж" />
          </View>
        )}
        {tab === "hacks" && (
          <View style={styles.sectionBlock}>
            <DailyQuestCard title="Лайфхаки дня" />
          </View>
        )}
        {tab === "remote" && (
          <View style={styles.sectionBlock}>
            <DailyQuestCard title="Для удаленщиков" />
          </View>
        )}
        <View style={styles.sectionTitleWrap}>
          <Button
            title="Выйти"
            onPress={() => {
              auth.logout();
              router.replace("/(auth)/login");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
  stickyTop: { backgroundColor: "transparent" },
  content: { paddingTop: 12, gap: 16 },
  sectionTitleWrap: { paddingHorizontal: 16, paddingTop: 12 },
  sectionBlock: { paddingHorizontal: 16 },
});
