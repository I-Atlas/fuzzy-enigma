import { Typography } from "@/components/ui/Typography";
import { COLOR } from "@/constants/color";
import { PODCASTS } from "@/data/podcasts";
import { Ionicons } from "@expo/vector-icons";
import { Link, Redirect, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PodcastEpisodeScreen() {
  const { id, episodeId } = useLocalSearchParams<{
    id: string;
    episodeId: string;
  }>();

  const podcast = PODCASTS.find((p) => p.id === Number(id));
  const episode = podcast?.episodes.find((e) => e.id === Number(episodeId));

  if (!podcast || !episode) {
    return <Redirect href="/+not-found" />;
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
        <Typography color="grey" size={13} style={{ opacity: 0.7 }}>
          Сейчас играет
        </Typography>
        <Typography
          variant="semi-bold"
          size={20}
          color="grey"
          style={{ marginTop: 2 }}
        >
          {podcast.title}
        </Typography>
      </View>

      <View style={{ padding: 16, alignItems: "center" }}>
        <Image
          source={{ uri: episode.coverUrl || podcast.coverUrl }}
          style={{
            width: 300,
            height: 300,
            borderRadius: 16,
            backgroundColor: "#EEE",
          }}
        />
      </View>

      <View style={styles.playerRow}>
        <Pressable style={styles.playerButton}>
          <Ionicons name="play-back" size={20} color={COLOR.Blue} />
        </Pressable>
        <Pressable style={[styles.playerButton, styles.playerButtonMain]}>
          <Ionicons name="pause" size={24} color={COLOR.White} />
        </Pressable>
        <Pressable style={styles.playerButton}>
          <Ionicons name="play-forward" size={20} color={COLOR.Blue} />
        </Pressable>
      </View>

      <View style={styles.panel}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.bookmarkBadge}>
            <Ionicons name="bookmark-outline" size={18} color={COLOR.Blue} />
          </View>
          <View style={{ marginLeft: 8, flex: 1 }}>
            <Typography variant="semi-bold" color="grey" size={16}>
              {episode.title}
            </Typography>
            {!!episode.subtitle && (
              <Typography color="grey" size={14} style={{ opacity: 0.8 }}>
                {episode.subtitle}
              </Typography>
            )}
          </View>
          <Link
            href={{
              pathname: "/(app)/modals/episode-description",
              params: { id, episodeId },
            }}
            asChild
          >
            <Pressable style={styles.iconButton}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color={COLOR.Grey}
              />
            </Pressable>
          </Link>
        </View>

        <View style={styles.waveform} />
        <View style={styles.timelineRow}>
          <Typography color="grey" size={13} style={{ opacity: 0.7 }}>
            3:05
          </Typography>
          <Typography color="grey" size={13} style={{ opacity: 0.7 }}>
            {Math.round((episode.durationSec || 0) / 60)}:00
          </Typography>
        </View>

        <View style={{ flexDirection: "row", marginTop: 12 }}>
          {episode.hosts?.slice(0, 2).map((h) => (
            <Image
              key={h.id}
              source={{ uri: h.avatarUrl }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                marginRight: -8,
              }}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR.Background_Light },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  playerButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLOR.White,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  playerButtonMain: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLOR.Blue,
  },
  panel: {
    margin: 16,
    backgroundColor: COLOR.White,
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  bookmarkBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLOR.Background_LightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  waveform: {
    height: 54,
    backgroundColor: "#EAEAEA",
    borderRadius: 12,
    marginTop: 12,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
});
