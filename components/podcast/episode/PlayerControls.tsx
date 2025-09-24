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
        <View style={styles.playerButtonContent}>
          <Ionicons name="play-back" size={20} color={COLOR.Blue} />
        </View>
      </Pressable>
      <Pressable style={styles.playerButtonMain} onPress={onPlayPause}>
        <View style={styles.playerButtonMainContent}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={24}
            color={COLOR.White}
          />
        </View>
      </Pressable>
      <Pressable style={styles.playerButton} onPress={onSeekForward}>
        <View style={styles.playerButtonContent}>
          <Ionicons name="play-forward" size={20} color={COLOR.Blue} />
        </View>
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
    marginTop: -24,
    marginBottom: -24,
  },
  playerButton: {
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.Background_Light,
    borderColor: COLOR.Background_Light,
    borderWidth: 8,
  },
  playerButtonContent: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 24,
    backgroundColor: COLOR.White,
  },
  playerButtonMain: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    backgroundColor: COLOR.Background_Light,
    borderColor: COLOR.Background_Light,
    borderWidth: 12,
  },
  playerButtonMainContent: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 24,
    backgroundColor: COLOR.Blue,
  },
});
