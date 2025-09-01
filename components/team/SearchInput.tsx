import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onCancel?: () => void;
  isFocused?: boolean;
  placeholder?: string;
};

export default function SearchInput({
  value,
  onChangeText,
  onFocus,
  onCancel,
  isFocused,
  placeholder = "Имя сотрудника или роль",
}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        placeholder={placeholder}
        placeholderTextColor="#9BA3AF"
        style={styles.input}
      />
      {isFocused ? (
        <Pressable accessibilityRole="button" onPress={onCancel}>
          <Text style={styles.cancel}>Отмена</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    fontSize: 16,
    fontWeight: "400",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  cancel: {
    color: "#0A6CFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
