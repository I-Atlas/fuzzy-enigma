import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { TeamMember } from "./data";

type Props = {
  member: TeamMember;
  onPress?: (member: TeamMember) => void;
  compact?: boolean;
};

export default function MemberCard({ member, onPress, compact }: Props) {
  const handlePress = () => onPress?.(member);

  if (compact) {
    return (
      <Pressable
        onPress={handlePress}
        style={styles.compactCard}
        android_ripple={{ color: "#E5F0FF" }}
      >
        <Image
          source={{ uri: member.avatarUrl }}
          style={styles.compactAvatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{member.fullName}</Text>
          <Text style={styles.role}>{member.role}</Text>
          <Text style={styles.bio} numberOfLines={2}>
            {member.bio}
          </Text>
          <View style={styles.tagRow}>
            {member.tags.slice(0, 3).map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      style={styles.card}
      android_ripple={{ color: "rgba(255,255,255,0.2)" }}
    >
      <Image
        source={{ uri: member.coverUrl || member.avatarUrl }}
        style={styles.cover}
      />
      <View style={styles.overlay} />
      <View style={styles.bottomPanel}>
        <Text style={styles.nameLarge}>{member.fullName}</Text>
        <Text style={styles.roleLarge}>{member.role}</Text>
        <View style={styles.chipsRow}>
          {member.tags.slice(0, 3).map((tag) => (
            <View key={tag} style={styles.chip}>
              <Text style={styles.chipText}>#{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#E5E7EB",
  },
  cover: { width: "100%", height: "100%" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  bottomPanel: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    borderRadius: 16,
    backgroundColor: "#0A6CFF",
    padding: 16,
  },
  nameLarge: { color: "#fff", fontSize: 22, fontWeight: "700" },
  roleLarge: { color: "#E6ECFF", marginTop: 4 },
  chipsRow: { flexDirection: "row", gap: 8, marginTop: 12, flexWrap: "wrap" },
  chip: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  chipText: { color: "#0A6CFF", fontWeight: "600" },

  compactCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  compactAvatar: { width: 56, height: 56, borderRadius: 28 },
  name: { fontSize: 16, fontWeight: "600", color: "#111827" },
  role: { color: "#6B7280", marginTop: 2 },
  bio: { color: "#334155", marginTop: 8 },
  tagRow: { flexDirection: "row", gap: 8, marginTop: 8, flexWrap: "wrap" },
  tag: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: { color: "#1D4ED8", fontWeight: "600" },
});
