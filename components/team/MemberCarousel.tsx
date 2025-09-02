import type { TeamMember } from "@/types";
import React, { FC } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { MemberCard } from "./MemberCard";

interface MemberCarouselProps {
  members: TeamMember[];
  onPressMember?: (member: TeamMember) => void;
}

export const MemberCarousel: FC<MemberCarouselProps> = ({
  members,
  onPressMember,
}) => {
  const SIDE_PEEK = 32; // visible part of previous/next slide on each side
  const ITEM_SPACING = 12; // space between slides
  const { width: screenWidth } = Dimensions.get("window");
  const itemWidth = screenWidth - SIDE_PEEK * 2;

  return (
    <View style={styles.container} pointerEvents="auto">
      <FlatList
        horizontal
        data={members}
        keyExtractor={(m) => `${m.id}`}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={itemWidth + ITEM_SPACING}
        contentContainerStyle={{ paddingHorizontal: SIDE_PEEK }}
        ItemSeparatorComponent={() => <View style={{ width: ITEM_SPACING }} />}
        renderItem={({ item }) => (
          <View style={[styles.cardContainer, { width: itemWidth }]}>
            <MemberCard member={item} onPress={onPressMember} />
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
