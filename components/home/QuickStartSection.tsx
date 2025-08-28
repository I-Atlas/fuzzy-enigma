import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const QuickStartSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>С чего начать</Text>
        <Text style={styles.chevron}>›</Text>
      </View>
      <View style={styles.cardsRow}>
        <View style={[styles.card, styles.cardOrange]}>
          <Text style={styles.cardTitle}>Кофемашина vs джуниор:</Text>
          <Text style={styles.cardText}>
            Как не сжечь офис, пытаясь сварить латте.
          </Text>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Сварить кофе</Text>
          </View>
        </View>
        <View style={[styles.card, styles.cardPurple]}>
          <Text style={styles.cardTitle}>Встречи</Text>
          <Text style={styles.cardText}>Как мы проводим дейлики и ретро.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1C1C1E",
  },
  chevron: {
    marginLeft: 8,
    fontSize: 24,
    color: "#8E8E93",
  },
  cardsRow: {
    flexDirection: "row",
    gap: 12,
  },
  card: {
    flex: 1,
    borderRadius: 18,
    padding: 16,
    backgroundColor: "#fff",
  },
  cardOrange: {
    backgroundColor: "#FF9F0A",
  },
  cardPurple: {
    backgroundColor: "#AF52DE",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1C1C1E",
    marginBottom: 6,
  },
  cardText: {
    fontSize: 13,
    color: "#1C1C1E",
    opacity: 0.85,
  },
  chip: {
    alignSelf: "flex-start",
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.85)",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1C1C1E",
  },
});
