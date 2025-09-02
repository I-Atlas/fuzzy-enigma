import Coin from "@/assets/svg/coin.svg";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ChecklistItem {
  id: string;
  text: string;
  isDone?: boolean;
}

interface DailyQuestCardProps {
  title?: string;
  reward?: number;
  items?: ChecklistItem[];
  gradientColors?: [string, string];
  backgroundImage?: ImageSourcePropType;
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

export const DailyQuestCard: FC<DailyQuestCardProps> = ({
  title = "Стань офисным ниндзя",
  reward = 3,
  items = DEFAULT_ITEMS,
  gradientColors = ["#B7E1FF", "#E7F5FF"],
  backgroundImage,
}) => {
  const doneCount = items.filter((i) => i.isDone).length;
  const progress = items.length === 0 ? 0 : doneCount / items.length;

  return (
    <View style={styles.cardWrapper}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.cardBg}
      />
      {!!backgroundImage && (
        <Image
          source={backgroundImage}
          style={styles.bgImage}
          resizeMode="cover"
        />
      )}

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.cardTitle}>«{title}»</Text>
          <View style={styles.reward}>
            <Text style={styles.rewardText}>{reward}</Text>
            <Coin width={16} height={16} />
          </View>
        </View>

        <View style={styles.list}>
          {items.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <View
                style={[styles.checkbox, item.isDone && styles.checkboxDone]}
              />
              <Text style={styles.itemText}>{item.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>

        <View style={{ flexGrow: 1 }} />

        <TouchableOpacity activeOpacity={0.5} style={styles.cta}>
          <Text style={styles.ctaText}>Начать</Text>
          <Ionicons name="arrow-forward-outline" size={18} color="#333333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 20,
    overflow: "hidden",
  },
  cardBg: {
    ...(StyleSheet.absoluteFillObject as any),
  },
  bgImage: {
    ...(StyleSheet.absoluteFillObject as any),
    opacity: 0.15,
  },
  content: {
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
    color: "#333333",
    flex: 1,
  },
  reward: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rewardText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#333333",
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
    color: "#333333",
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
    width: "50%",
  },
  cta: {
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ctaText: {
    color: "#333333",
    fontWeight: "600",
    fontSize: 14,
  },
});
