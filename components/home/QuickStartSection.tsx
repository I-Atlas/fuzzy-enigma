import { Ionicons } from "@expo/vector-icons";
import React, { FC, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { QuickStartCarousel } from "./QuickStartCarousel";

export const QuickStartSection: FC = () => {
  const avatars = useMemo(
    () => [
      { id: "a1", source: { uri: "https://i.pravatar.cc/100?img=32" } },
      { id: "a2", source: { uri: "https://i.pravatar.cc/100?img=23" } },
      { id: "a3", source: { uri: "https://i.pravatar.cc/100?img=17" } },
      { id: "a4", source: { uri: "https://i.pravatar.cc/100?img=11" } },
    ],
    [],
  );

  const items = useMemo(
    () => [
      {
        title: "Кто эти люди?",
        description:
          "Сотрудники без галстуков: честные ответы на странные вопросы.",
        cta: "Познакомиться",
        gradientColors: ["#FFEDBC", "#EDC0A3"] as [string, string],
        iconName: "headset-outline" as const,
        avatars,
      },
      {
        title: "Про процессы",
        description: "Как мы проводим дейлики и ретро.",
        cta: "Смотреть",
        gradientColors: ["#C7D2FE", "#BDE0FE"] as [string, string],
        iconName: "time-outline" as const,
        avatars,
      },
    ],
    [avatars],
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>С чего начать</Text>
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
    gap: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
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
