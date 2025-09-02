import {
  DailyQuestSection,
  HomeSegmentedTabs,
  QuickStartSection,
  WelcomeHeader,
} from "@/components/home";
import { HOME_TABS_DATA } from "@/data";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = React.useState<"hacks" | "office" | "team" | "remote">(
    "office",
  );
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.stickyTop}>
        <WelcomeHeader />
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
            <QuickStartSection items={HOME_TABS_DATA.office.quickStart} />
            <DailyQuestSection card={HOME_TABS_DATA.office.dailyQuest} />
          </>
        )}
        {tab === "team" && (
          <>
            <QuickStartSection items={HOME_TABS_DATA.team.quickStart} />
            <DailyQuestSection card={HOME_TABS_DATA.team.dailyQuest} />
          </>
        )}
        {tab === "hacks" && (
          <>
            <QuickStartSection items={HOME_TABS_DATA.hacks.quickStart} />
            <DailyQuestSection card={HOME_TABS_DATA.hacks.dailyQuest} />
          </>
        )}
        {tab === "remote" && (
          <>
            <QuickStartSection items={HOME_TABS_DATA.remote.quickStart} />
            <DailyQuestSection card={HOME_TABS_DATA.remote.dailyQuest} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
  stickyTop: { backgroundColor: "transparent" },
  content: { paddingTop: 12, gap: 16 },
  sectionTitleWrap: { paddingHorizontal: 16, paddingTop: 12 },
  sectionBlock: { paddingHorizontal: 16, gap: 24 },
});
