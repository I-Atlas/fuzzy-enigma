import { Typography } from "@/components/ui";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function EpisodeDescriptionModal() {
  return (
    <View style={styles.container}>
      <Typography variant="bold" size={20} style={styles.title}>
        Описание выпуска подкаста
      </Typography>
      <Typography size={16} style={styles.text}>
        Тут будет подробное описание и кнопки действий.
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { marginBottom: 12 },
  text: { lineHeight: 22 },
});
