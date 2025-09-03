import { Typography } from "@/components/ui/Typography";
import { COLOR } from "@/constants/color";
import { ARTICLES } from "@/data/articles";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import React, { Fragment, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useMarkdown } from "react-native-marked";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { AnimatedHeaderTitle } from "@/components/ui";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const article = ARTICLES.find((article) => article.id === Number(id));
  const { title, description, content } = article || {};

  const elements = useMarkdown(content || "", {});

  const navigation = useNavigation();
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

  if (!article) {
    return <Redirect href="/+not-found" />;
  }

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <Animated.ScrollView
        bounces={false}
        onScroll={scrollHandler}
        style={{ flex: 1, backgroundColor: COLOR.Background_Orange }}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ backgroundColor: COLOR.Background_Orange }}>
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
            flex: 1,
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 24,
            backgroundColor: COLOR.Background_Light,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 24,
          }}
        >
          {elements.map((element, index) => (
            <Fragment key={`md_${index}`}>{element}</Fragment>
          ))}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR.Background_Light },
});
