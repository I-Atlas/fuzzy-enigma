import { Typography } from "@/components/ui";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

interface AvatarProps {
  emoji?: string;
}

export const Avatar: FC<AvatarProps> = ({ emoji = "🐥" }) => {
  return (
    <View style={styles.avatarWrap}>
      <Typography size={64} style={styles.emoji}>
        {emoji}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarWrap: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#FFE6B8",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  emoji: { fontSize: 64 },
});
