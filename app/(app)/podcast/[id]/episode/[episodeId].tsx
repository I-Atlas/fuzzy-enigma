import { AudioWaveform, CoverArt, PlayerControls } from "@/components/podcast";
import { Typography } from "@/components/ui/Typography";
import { COLOR } from "@/constants/color";
import { PODCASTS } from "@/data/podcasts";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PodcastEpisodeScreen() {
  const { id, episodeId } = useLocalSearchParams<{
    id: string;
    episodeId: string;
  }>();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 12,
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography color="#7C7C7C" size={10} variant="semi-bold">
            Сейчас играет
          </Typography>
          <Typography color="grey" size={16} variant="semi-bold">
            {episode?.title}
          </Typography>
        </View>
      ),
    });
  }, [navigation]);

  const podcast = PODCASTS.find((p) => p.id === Number(id));
  const episode = podcast?.episodes.find((e) => e.id === Number(episodeId));

  const source = useMemo(() => {
    if (episode?.audioAsset) return episode.audioAsset as number;
    if (episode?.audioUrl) return episode.audioUrl as string;
    return null;
  }, [episode?.audioAsset, episode?.audioUrl]);

  const player = useAudioPlayer(source, 250);
  const status = useAudioPlayerStatus(player);

  const isPlaying = !!status?.playing;
  const currentSec = Math.floor(status?.currentTime || 0);
  const durationSec = Math.floor(status?.duration || episode?.durationSec || 0);

  const togglePlay = () => {
    if (!player) {
      return;
    }
    if (isPlaying) player.pause();
    else player.play();
  };

  const seekBy = async (delta: number) => {
    if (!player) {
      return;
    }
    const next = Math.max(
      0,
      Math.min((status?.currentTime || 0) + delta, durationSec),
    );
    await player.seekTo(next);
  };

  if (!podcast || !episode) {
    return <Redirect href="/+not-found" />;
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <CoverArt uri={episode.coverUrl || podcast.coverUrl} />

      <PlayerControls
        isPlaying={isPlaying}
        onPlayPause={togglePlay}
        onSeekBackward={() => seekBy(-15)}
        onSeekForward={() => seekBy(15)}
      />

      <View style={styles.panel}>
        <Typography variant="semi-bold" color="grey" size={16}>
          {episode.title}
        </Typography>
        <AudioWaveform
          durationSec={durationSec}
          currentSec={currentSec}
          onSeek={(sec: number) => player?.seekTo(sec)}
        />
        <View style={styles.timelineRow}>
          <Typography color={COLOR.Stroke_LightBlue} size={12}>
            {Math.floor(currentSec / 60)}:
            {String(currentSec % 60).padStart(2, "0")}
          </Typography>
          <Typography color={COLOR.Stroke_LightBlue} size={12}>
            {Math.floor(durationSec / 60)}:
            {String(durationSec % 60).padStart(2, "0")}
          </Typography>
        </View>
      </View>
      {!!episode.hosts?.length && (
        <View style={styles.hostsRow}>
          {episode.hosts.slice(0, 3).map((h) => (
            <Image
              key={h.id}
              source={{ uri: h.avatarUrl }}
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                marginRight: -8,
              }}
            />
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR.Background_Light },
  panel: {
    zIndex: -1,
    backgroundColor: COLOR.White,
    marginHorizontal: 16,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 32,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  hostsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
});
