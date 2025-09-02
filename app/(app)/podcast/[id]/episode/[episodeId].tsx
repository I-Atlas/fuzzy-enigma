import { Typography } from "@/components/ui";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function PodcastEpisodeScreen() {
  const { id, episodeId } = useLocalSearchParams<{
    id: string;
    episodeId: string;
  }>();
  return (
    <View style={styles.container}>
      <Typography variant="semi-bold" size={24} style={styles.title}>
        Выпуск подкаста
      </Typography>
      <Typography>Podcast ID: {id}</Typography>
      <Typography>Episode ID: {episodeId}</Typography>
      <Typography>Здесь будет плеер</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { marginBottom: 8 },
});
