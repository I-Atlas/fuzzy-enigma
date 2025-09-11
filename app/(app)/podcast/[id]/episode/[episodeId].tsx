import {
  AudioWaveform,
  CoverArt,
  EpisodeInfo,
  NowPlayingHeader,
  PlayerControls,
} from "@/components/podcast";
import { Typography } from "@/components/ui/Typography";
import { COLOR } from "@/constants/color";
import { PODCASTS } from "@/data/podcasts";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { Redirect, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PodcastEpisodeScreen() {
  const { id, episodeId } = useLocalSearchParams<{
    id: string;
    episodeId: string;
  }>();

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
      <NowPlayingHeader title={podcast.title} />

      <CoverArt uri={episode.coverUrl || podcast.coverUrl} />

      <PlayerControls
        isPlaying={isPlaying}
        onPlayPause={togglePlay}
        onSeekBackward={() => seekBy(-15)}
        onSeekForward={() => seekBy(15)}
      />

      <View style={styles.panel}>
        <AudioWaveform
          durationSec={durationSec}
          currentSec={currentSec}
          onSeek={(sec: number) => player?.seekTo(sec)}
        />
        <View style={styles.timelineRow}>
          <Typography color="grey" size={13} style={{ opacity: 0.7 }}>
            {Math.floor(currentSec / 60)}:
            {String(currentSec % 60).padStart(2, "0")}
          </Typography>
          <Typography color="grey" size={13} style={{ opacity: 0.7 }}>
            {Math.floor(durationSec / 60)}:
            {String(durationSec % 60).padStart(2, "0")}
          </Typography>
        </View>
      </View>

      <EpisodeInfo
        title={episode.title}
        subtitle={episode.subtitle}
        hosts={episode.hosts}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR.Background_Light },
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
  timelineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
});
