import { Typography } from "@/components/ui";
import type { TeamMember } from "@/types";
import React, { FC } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

interface MemberCardProps {
  member: TeamMember;
  onPress?: (member: TeamMember) => void;
  isCompact?: boolean;
}

export const MemberCard: FC<MemberCardProps> = ({
  member,
  onPress,
  isCompact,
}) => {
  const handlePress = () => onPress?.(member);

  if (isCompact) {
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
          <Typography variant="semi-bold" color="grey" size={16}>
            {member.fullName}
          </Typography>
          <Typography
            color="grey"
            size={14}
            style={{ opacity: 0.7, marginTop: 2 }}
          >
            {member.role}
          </Typography>
          <Typography color="grey" numberOfLines={2} style={{ marginTop: 8 }}>
            {member.bio}
          </Typography>
          <View style={styles.tagRow}>
            {member.tags.slice(0, 3).map((tag) => (
              <View key={tag} style={styles.tag}>
                <Typography variant="semi-bold" color="blue" size={12}>
                  #{tag}
                </Typography>
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
        <Typography variant="bold" color="white" size={22}>
          {member.fullName}
        </Typography>
        <Typography color="white" style={{ opacity: 0.9, marginTop: 4 }}>
          {member.role}
        </Typography>
        <View style={styles.chipsRow}>
          {member.tags.slice(0, 3).map((tag) => (
            <View key={tag} style={styles.chip}>
              <Typography variant="semi-bold" color="blue" size={12}>
                #{tag}
              </Typography>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
};

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
  chipsRow: { flexDirection: "row", gap: 8, marginTop: 12, flexWrap: "wrap" },
  chip: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

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
  tagRow: { flexDirection: "row", gap: 8, marginTop: 8, flexWrap: "wrap" },
  tag: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
});
