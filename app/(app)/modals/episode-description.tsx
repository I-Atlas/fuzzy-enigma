import { Typography } from "@/components/ui/Typography";
import { COLOR } from "@/constants/color";
import { PODCASTS } from "@/data/podcasts";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";

export default function EpisodeDescriptionModal() {
  const { id, episodeId } = useLocalSearchParams<{
    id: string;
    episodeId: string;
  }>();
  const router = useRouter();

  const podcast = PODCASTS.find((p) => p.id === Number(id));
  const episode = podcast?.episodes.find((e) => e.id === Number(episodeId));

  if (!podcast || !episode) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Typography>Not found</Typography>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.handle} />
      <View style={styles.headerRow}>
        <Image
          source={{ uri: episode.coverUrl || podcast.coverUrl }}
          style={styles.thumb}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Typography variant="semi-bold" color="grey" size={16}>
            {episode.title}
          </Typography>
          <Typography
            color="grey"
            size={14}
            style={{ opacity: 0.8 }}
            numberOfLines={2}
          >
            {episode.subtitle}
          </Typography>
        </View>
        <Pressable onPress={() => router.back()} style={styles.closeBtn}>
          <Typography color="grey" size={20}>
            ×
          </Typography>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      >
        <Typography
          variant="semi-bold"
          color="grey"
          size={16}
          style={{ marginBottom: 8 }}
        >
          В выпуске:
        </Typography>
        {episode.sections?.map((s) => (
          <View
            key={s.time}
            style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}
          >
            <Link
              href={{
                pathname: "/(app)/podcast/[id]/episode/[episodeId]",
                params: { id, episodeId },
              }}
              asChild
            >
              <Pressable>
                <Typography color={COLOR.Blue} size={16}>
                  {s.time}
                </Typography>
              </Pressable>
            </Link>
            <Typography color="grey" size={16}>
              {s.title}
            </Typography>
          </View>
        ))}

        {!!episode.hosts?.length && (
          <View style={{ marginTop: 16 }}>
            <Typography
              variant="semi-bold"
              color="grey"
              size={16}
              style={{ marginBottom: 12 }}
            >
              Ведущие:
            </Typography>
            {episode.hosts.map((h) => (
              <View key={h.id} style={styles.hostRow}>
                <Image
                  source={{ uri: h.avatarUrl }}
                  style={styles.hostAvatar}
                />
                <View style={{ flex: 1 }}>
                  <Typography variant="semi-bold" color="grey" size={16}>
                    {h.fullName}
                  </Typography>
                  <Typography color="grey" size={14} style={{ opacity: 0.8 }}>
                    {h.role}
                  </Typography>
                </View>
                {!!h.email && (
                  <Pressable style={styles.badge}>
                    <Typography size={12}>{h.email}</Typography>
                  </Pressable>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR.White },
  handle: {
    alignSelf: "center",
    width: 48,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#D9D9D9",
    marginVertical: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  thumb: { width: 48, height: 48, borderRadius: 8, backgroundColor: "#EEE" },
  closeBtn: { padding: 8 },
  hostRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  hostAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEE",
  },
  badge: {
    backgroundColor: COLOR.Background_LightBlue,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});
