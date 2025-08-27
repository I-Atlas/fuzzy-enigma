import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function EpisodeDescriptionModal() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Описание выпуска подкаста</Text>
      <Text style={styles.text}>
        Тут будет подробное описание и кнопки действий.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  text: { fontSize: 16, lineHeight: 22 },
});
