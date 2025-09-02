import { TEAM_MEMBERS } from "@/data/team";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TeamMemberProfileScreen() {
  const { memberId } = useLocalSearchParams<{ memberId: string }>();
  const member = TEAM_MEMBERS.find((m) => m.id === String(memberId));

  if (!member) {
    return (
      <SafeAreaView style={styles.containerCenter}>
        <Text style={styles.missingTitle}>Сотрудник не найден</Text>
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
        <Text style={styles.name}>{member.fullName}</Text>
        <Text style={styles.role}>{member.role}</Text>

        <Animated.View entering={FadeIn.duration(200)} style={styles.card}>
          <Text style={styles.cardTitle}>Обо мне</Text>
          <Text style={styles.cardText}>{member.bio}</Text>
        </Animated.View>

        <Animated.View entering={FadeIn.duration(240)} style={styles.card}>
          <Text style={styles.cardTitle}>Совет для вас</Text>
          <View style={styles.audioRow}>
            <View style={styles.playCircle}>
              <Ionicons name="play" size={20} color="#1C6CFF" />
            </View>
            <View style={styles.wave} />
            <View style={styles.durationPill}>
              <Text style={styles.durationText}>0:20</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeIn.duration(260)} style={styles.card}>
          <Text style={styles.cardTitle}>Интересы</Text>
          <View style={styles.tagsRow}>
            {member.tags.map((t) => (
              <View key={t} style={styles.tag}>
                <Text style={styles.tagText}>#{t}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeIn.duration(280)} style={styles.card}>
          <Text style={styles.cardTitle}>Контакты:</Text>
          <View style={styles.contactsRow}>
            <Ionicons name="paper-plane-outline" size={26} color="#229ED9" />
            <Ionicons name="logo-vk" size={26} color="#0077FF" />
            <View style={styles.contactPill}>
              <Text style={styles.contactText}>
                {member.fullName.split(" ")[0].toLowerCase()}@example.com
              </Text>
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
  missingTitle: { fontSize: 24, fontWeight: "600" },
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
  name: { marginTop: 16, fontSize: 24, fontWeight: "800", color: "#333333" },
  role: { marginTop: 4, fontSize: 13, color: "#8E8E93" },
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
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#333333",
    marginBottom: 8,
  },
  cardText: { fontSize: 14, color: "#333333" },
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
  durationText: { color: "#1C6CFF", fontWeight: "600" },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: {
    backgroundColor: "#F3F3FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  tagText: { color: "#5E75FF", fontWeight: "600" },
  contactsRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  contactPill: {
    backgroundColor: "#EDF4FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  contactText: { color: "#2F68FF", fontWeight: "600" },
});
