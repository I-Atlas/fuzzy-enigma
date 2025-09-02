import { Typography } from "@/components/ui";
import { TEAM_MEMBERS } from "@/data/team";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TeamMemberProfileScreen() {
  const { memberId } = useLocalSearchParams<{ memberId: string }>();
  const member = TEAM_MEMBERS.find((m) => m.id === String(memberId));

  if (!member) {
    return (
      <SafeAreaView style={styles.containerCenter}>
        <Typography variant="semi-bold" size={24}>
          Сотрудник не найден
        </Typography>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Back button handled by stack header in (app)/_layout */}

        <View style={styles.avatarWrap}>
          <Image source={{ uri: member.avatarUrl }} style={styles.avatar} />
        </View>
        <Typography
          variant="bold"
          size={24}
          color="#333333"
          style={styles.name}
        >
          {member.fullName}
        </Typography>
        <Typography size={13} color="#8E8E93" style={styles.role}>
          {member.role}
        </Typography>

        <Animated.View entering={FadeIn.duration(200)} style={styles.card}>
          <Typography
            variant="bold"
            size={18}
            color="#333333"
            style={styles.cardTitle}
          >
            Обо мне
          </Typography>
          <Typography size={14} color="#333333">
            {member.bio}
          </Typography>
        </Animated.View>

        <Animated.View entering={FadeIn.duration(240)} style={styles.card}>
          <Typography
            variant="bold"
            size={18}
            color="#333333"
            style={styles.cardTitle}
          >
            Совет для вас
          </Typography>
          <View style={styles.audioRow}>
            <View style={styles.playCircle}>
              <Ionicons name="play" size={20} color="#1C6CFF" />
            </View>
            <View style={styles.wave} />
            <View style={styles.durationPill}>
              <Typography variant="semi-bold" color="#1C6CFF">
                0:20
              </Typography>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeIn.duration(280)} style={styles.card}>
          <Typography
            variant="bold"
            size={18}
            color="#333333"
            style={styles.cardTitle}
          >
            Интересы
          </Typography>
          <View style={styles.tagsRow}>
            {member.tags.map((t) => (
              <View key={t} style={styles.tag}>
                <Typography variant="semi-bold" color="#5E75FF">
                  #{t}
                </Typography>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeIn.duration(280)} style={styles.card}>
          <Typography
            variant="bold"
            size={18}
            color="#333333"
            style={styles.cardTitle}
          >
            Контакты:
          </Typography>
          <View style={styles.contactsRow}>
            <Ionicons name="paper-plane-outline" size={26} color="#229ED9" />
            <Ionicons name="logo-vk" size={26} color="#0077FF" />
            <View style={styles.contactPill}>
              <Typography variant="semi-bold" color="#2F68FF">
                {member.fullName.split(" ")[0].toLowerCase()}@example.com
              </Typography>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F7" },
  containerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F7",
  },
  content: { alignItems: "center", paddingBottom: 40 },
  headerRow: { alignSelf: "stretch", paddingHorizontal: 12, paddingTop: 6 },
  avatarWrap: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#E6EEFF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    overflow: "hidden",
  },
  avatar: { width: 150, height: 150, resizeMode: "cover" },
  name: { marginTop: 16 },
  role: { marginTop: 4 },
  card: {
    alignSelf: "stretch",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#2E38561A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  cardTitle: { marginBottom: 8 },
  audioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#EEF4FF",
    padding: 12,
    borderRadius: 16,
  },
  playCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  wave: { flex: 1, height: 16, borderRadius: 8, backgroundColor: "#D6E6FF" },
  durationPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: {
    backgroundColor: "#F3F3FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  contactsRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  contactPill: {
    backgroundColor: "#EDF4FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
});
