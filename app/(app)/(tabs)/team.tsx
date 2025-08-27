import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TeamScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Команда</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "600" },
});
