import React, { FC } from "react";
import type { TextInputProps } from "react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface InputProps extends TextInputProps {
  error?: string | null;
}

export const Input: FC<InputProps> = ({ error, style, ...rest }) => {
  const hasError = Boolean(error);
  return (
    <View>
      <TextInput
        placeholderTextColor="#9BA3AF"
        style={[styles.input, hasError ? styles.inputError : undefined, style]}
        {...rest}
      />
      {hasError ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
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
  inputError: {
    backgroundColor: "#FFF5F5",
    borderColor: "#F43F5E",
  },
  errorText: {
    marginTop: 8,
    marginLeft: 12,
    color: "#DC2626",
    fontSize: 14,
  },
});
