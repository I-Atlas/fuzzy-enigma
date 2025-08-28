import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ChecklistItem = {
  id: string;
  text: string;
  done?: boolean;
};

interface DailyQuestCardProps {
  title?: string;
  reward?: number;
  items?: ChecklistItem[];
}

const DEFAULT_ITEMS: ChecklistItem[] = [
  {
    id: "1",
    text: "Сфотографируйте секретный арт на стене в комнате для переговоров.",
  },
  {
    id: "2",
    text: "Найдите сотрудника с очками VR.",
  },
];

export const DailyQuestCard: React.FC<DailyQuestCardProps> = ({
  title = "Стань офисным ниндзя",
  reward = 3,
  items = DEFAULT_ITEMS,
}) => {
  const doneCount = items.filter((i) => i.done).length;
  const progress = items.length === 0 ? 0 : doneCount / items.length;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.cardTitle}>«{title}»</Text>
        <View style={styles.reward}>
          <Text style={styles.rewardText}>{reward}</Text>
        </View>
      </View>

      <View style={styles.list}>
        {items.map((item) => (
          <View key={item.id} style={styles.listItem}>
            <View style={[styles.checkbox, item.done && styles.checkboxDone]} />
            <Text style={styles.itemText}>{item.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.round(progress * 100)}%` },
          ]}
        />
      </View>

      <TouchableOpacity activeOpacity={0.9} style={styles.cta}>
        <Text style={styles.ctaText}>Начать →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E9F2FF",
    borderRadius: 20,
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1C1C1E",
    flex: 1,
  },
  reward: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  rewardText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  list: {
    gap: 10,
    marginBottom: 12,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    marginRight: 8,
  },
  checkboxDone: {
    backgroundColor: "#34C759",
  },
  itemText: {
    flex: 1,
    color: "#1C1C1E",
    fontSize: 14,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressFill: {
    height: 4,
    backgroundColor: "#007AFF",
  },
  cta: {
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
  },
  ctaText: {
    color: "#1C1C1E",
    fontWeight: "600",
    fontSize: 14,
  },
});
