import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function Button({
  title,
  onPress,
  disabled,
  loading,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        pressed && !isDisabled ? styles.pressed : null,
        isDisabled ? styles.disabled : null,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 28,
    backgroundColor: "#0A6CFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 2,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    backgroundColor: "#9DBBFF",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
