import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

export interface QuickStartAvatar {
  id: string | number;
  source: ImageSourcePropType;
}

export interface QuickStartCardProps {
  title: string;
  description?: string;
  cta?: string;
  onPress?: () => void;
  gradientColors: [string, string];
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  avatars?: QuickStartAvatar[];
}

export const QuickStartCard: FC<QuickStartCardProps> = ({
  title,
  description,
  cta,
  onPress,
  gradientColors,
  iconName = "headset-outline",
  avatars = [],
}) => {
  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <View style={styles.iconBadge}>
          <Ionicons name={iconName} size={18} color="rgba(255,255,255,0.6)" />
        </View>
      </View>
      {!!description && (
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {description}
        </Text>
      )}
      <View style={styles.flexSpacer} />

      <View style={styles.bottomRow}>
        <View style={styles.avatarsRow}>
          {avatars.slice(0, 4).map((avatar, index) => (
            <View
              key={avatar.id}
              style={[
                styles.avatarWrapper,
                index !== 0 && styles.avatarOverlap,
              ]}
            >
              <Image source={avatar.source} style={styles.avatar} />
            </View>
          ))}
        </View>
        {!!cta && (
          <View
            style={styles.cta}
            accessibilityRole="button"
            onTouchEnd={onPress}
          >
            <Text style={styles.ctaText} numberOfLines={1} ellipsizeMode="tail">
              {cta}
            </Text>
            <Ionicons name="play" size={16} color="#333333" />
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const AVATAR_SIZE = 32;

const styles = StyleSheet.create({
  card: {
    height: 168,
    borderRadius: 18,
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flexSpacer: {
    flexGrow: 1,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#333333",
  },
  description: {
    marginTop: 8,
    fontSize: 13,
    color: "#333333",
    opacity: 0.85,
  },
  bottomRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatarsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrapper: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.9)",
    backgroundColor: "#fff",
  },
  avatarOverlap: {
    marginLeft: -10,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
    gap: 8,
  },
  ctaText: {
    fontSize: 12,
    fontWeight: "medium",
    color: "#333333",
    maxWidth: 160,
    flexShrink: 1,
  },
});
