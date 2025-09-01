import FavoritesIcon from "@/assets/svg/favorites.svg";
import NotificationIcon from "@/assets/svg/notification.svg";
import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface WelcomeHeaderProps {
  name: string;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ name }) => {
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
          <Text style={styles.emoji}>🐥</Text>
        </View>
        <Text style={styles.greeting}>Привет, {name} 👋</Text>
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
    borderRadius: "50%",
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
