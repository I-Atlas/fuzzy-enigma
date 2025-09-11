import { COLOR } from "@/constants/color";
import { Ionicons } from "@expo/vector-icons";
import React, { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSeekBackward: () => void;
  onSeekForward: () => void;
}

export const PlayerControls: FC<PlayerControlsProps> = ({
  isPlaying,
  onPlayPause,
  onSeekBackward,
  onSeekForward,
}) => {
  return (
    <View style={styles.playerRow}>
      <Pressable style={styles.playerButton} onPress={onSeekBackward}>
        <Ionicons name="play-back" size={20} color={COLOR.Blue} />
      </Pressable>
      <Pressable
        style={[styles.playerButton, styles.playerButtonMain]}
        onPress={onPlayPause}
      >
        <Ionicons
          name={isPlaying ? "pause" : "play"}
          size={24}
          color={COLOR.White}
        />
      </Pressable>
      <Pressable style={styles.playerButton} onPress={onSeekForward}>
        <Ionicons name="play-forward" size={20} color={COLOR.Blue} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  playerButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLOR.White,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  playerButtonMain: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLOR.Blue,
  },
});
