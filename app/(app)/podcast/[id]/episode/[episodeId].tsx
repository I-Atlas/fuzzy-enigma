import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PodcastEpisodeScreen() {
  const { id, episodeId } = useLocalSearchParams<{
    id: string;
    episodeId: string;
  }>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выпуск подкаста</Text>
      <Text>Podcast ID: {id}</Text>
      <Text>Episode ID: {episodeId}</Text>
      <Text>Здесь будет плеер</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 8 },
});
