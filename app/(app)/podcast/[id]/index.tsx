import { Typography } from "@/components/ui";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function PodcastScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={styles.container}>
      <Typography variant="semi-bold" size={24} style={styles.title}>
        Подкаст
      </Typography>
      <Typography>ID: {id}</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { marginBottom: 8 },
});
