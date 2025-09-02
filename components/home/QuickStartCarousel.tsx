import React, { FC } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { QuickStartCard, QuickStartCardProps } from "./QuickStartCard";

interface QuickStartCarouselProps {
  items: QuickStartCardProps[];
}

export const QuickStartCarousel: FC<QuickStartCarouselProps> = ({ items }) => {
  const SIDE_PEEK = 32;
  const ITEM_SPACING = 12;
  const { width } = Dimensions.get("window");
  const itemWidth = width - SIDE_PEEK * 2;

  return (
    <View style={styles.container} pointerEvents="auto">
      <FlatList
        horizontal
        data={items}
        keyExtractor={(_, idx) => `qs-${idx}`}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={itemWidth + ITEM_SPACING}
        contentContainerStyle={{ paddingHorizontal: SIDE_PEEK }}
        ItemSeparatorComponent={() => <View style={{ width: ITEM_SPACING }} />}
        renderItem={({ item }) => (
          <View style={[styles.cardContainer, { width: itemWidth }]}>
            <QuickStartCard {...item} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  cardContainer: { flex: 1 },
});
