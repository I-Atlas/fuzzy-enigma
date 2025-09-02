import FavoritesIcon from "@/assets/svg/favorites.svg";
import NotificationIcon from "@/assets/svg/notification.svg";
import { useProfileStore } from "@/stores/profile";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../ui";

export const WelcomeHeader: FC = () => {
  const { fullName } = useProfileStore();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View></View>
        <View style={styles.topRowContent}>
          <TouchableOpacity activeOpacity={0.5}>
            <NotificationIcon width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <FavoritesIcon width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>
      <Pressable
        onPress={() => router.push("/profile")}
        style={styles.bottomRow}
      >
        <View style={styles.emojiContainer}>
          <Typography size={32}>🐥</Typography>
        </View>
        <Typography
          variant="bold"
          color="grey"
          size={24}
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ flex: 1 }}
        >
          Привет, {fullName || "незнакомец"} 👋
        </Typography>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  topRowContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  emojiContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    marginRight: 8,
  },
  emoji: {
    fontSize: 32,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333333",
  },
});
