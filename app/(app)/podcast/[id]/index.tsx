import { AnimatedHeaderTitle } from "@/components/ui";
import { Typography } from "@/components/ui/Typography";
import { COLOR } from "@/constants/color";
import { PODCASTS } from "@/data/podcasts";
import { Ionicons } from "@expo/vector-icons";
import {
  Redirect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import React, { useEffect } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function PodcastScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const podcast = PODCASTS.find((p) => p.id === Number(id));
  const { title, description, episodes } = podcast || {};

  const navigation = useNavigation();
  const router = useRouter();
  const progress = useSharedValue(0);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <AnimatedHeaderTitle title={title || ""} progress={progress} />
      ),
    });
  }, [navigation]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const y = event.contentOffset.y;
      progress.value = Math.min(Math.max(y / 100, 0), 1);
    },
  });

  if (!podcast) {
    return <Redirect href="/+not-found" />;
  }

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <Animated.ScrollView
        bounces={false}
        onScroll={scrollHandler}
        style={{ flex: 1, backgroundColor: COLOR.Background_Yellow }}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ backgroundColor: COLOR.Background_Yellow }}>
          <View style={{ paddingHorizontal: 16, paddingVertical: 16, gap: 16 }}>
            <Typography variant="semi-bold" size={24} color="grey">
              {title}
            </Typography>
            <Typography variant="medium" size={16} color="grey">
              {description}
            </Typography>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 24,
            backgroundColor: COLOR.Background_Light,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 24,
            height: "100%",
          }}
        >
          <View style={{ gap: 16 }}>
            {episodes?.map((ep) => (
              <Pressable
                key={ep.id}
                onPress={() =>
                  router.push({
                    pathname: "/(app)/podcast/[id]/episode/[episodeId]",
                    params: { id, episodeId: String(ep.id) },
                  })
                }
                style={{ flexDirection: "row", gap: 12, alignItems: "center" }}
              >
                <Image
                  source={{ uri: ep.coverUrl || podcast.coverUrl }}
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: 12,
                    backgroundColor: "#EEE",
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Typography
                    variant="semi-bold"
                    color="grey"
                    size={16}
                    numberOfLines={2}
                  >
                    Выпуск {ep.id}: {ep.title}
                  </Typography>
                  {!!ep.subtitle && (
                    <Typography
                      color="grey"
                      size={14}
                      style={{ opacity: 0.8 }}
                      numberOfLines={2}
                    >
                      {ep.subtitle}
                    </Typography>
                  )}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 6,
                    }}
                  >
                    <Typography color="grey" size={13} style={{ opacity: 0.7 }}>
                      {Math.round((ep.durationSec || 0) / 60)} минут
                    </Typography>
                  </View>
                </View>
                <Ionicons
                  name="ellipsis-vertical"
                  size={18}
                  color={COLOR.Grey}
                />
              </Pressable>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR.Background_Light },
});
