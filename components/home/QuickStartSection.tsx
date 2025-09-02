import { Ionicons } from "@expo/vector-icons";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Typography } from "../ui";
import { QuickStartCardProps } from "./QuickStartCard";
import { QuickStartCarousel } from "./QuickStartCarousel";

interface QuickStartSectionProps {
  title?: string;
  items: QuickStartCardProps[];
}

export const QuickStartSection: FC<QuickStartSectionProps> = ({
  title = "С чего начать",
  items,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Typography variant="bold" color="grey" size={24}>
          {title}
        </Typography>
        <Ionicons name="chevron-forward-outline" size={20} color="#333333" />
      </View>
      <View style={styles.carouselRow}>
        <QuickStartCarousel items={items} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
  },
  chevron: {
    marginLeft: 8,
    fontSize: 24,
    color: "#8E8E93",
  },
  carouselRow: {
    flexDirection: "row",
  },
});
