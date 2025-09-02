import Coin from "@/assets/svg/coin.svg";
import { Typography } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export interface ChecklistItem {
  id: string;
  text: string;
  isDone?: boolean;
}

export interface DailyQuestCardProps {
  title?: string;
  reward?: number;
  items?: ChecklistItem[];
  gradientColors?: [string, string];
  backgroundImage?: ImageSourcePropType;
}

export const DailyQuestCard: FC<DailyQuestCardProps> = ({
  title = "Стань офисным ниндзя",
  reward = 3,
  items = [],
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
          <Typography
            variant="bold"
            color="grey"
            size={18}
            style={styles.cardTitleText}
          >
            «{title}»
          </Typography>
          <View style={styles.reward}>
            <Typography variant="bold" color="white" size={16}>
              {reward}
            </Typography>
            <Coin width={16} height={16} />
          </View>
        </View>

        <View style={styles.list}>
          {items.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <View
                style={[styles.checkbox, item.isDone && styles.checkboxDone]}
              />
              <Typography color="grey" size={14} style={{ flex: 1 }}>
                {item.text}
              </Typography>
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

        <View style={{ flexGrow: 1 }} />

        <TouchableOpacity activeOpacity={0.5} style={styles.cta}>
          <Typography variant="semi-bold" color="grey" size={14}>
            Начать
          </Typography>
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
  cardTitleText: {
    flex: 1,
  },
  reward: {
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 12,
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
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
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
