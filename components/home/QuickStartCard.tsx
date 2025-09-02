import { Typography } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

export interface QuickStartAvatar {
  id: string | number;
  source: ImageSourcePropType;
}

export interface QuickStartCardProps {
  id: string;
  title: string;
  type: "podcast" | "article";
  description?: string;
  cta?: string;
  gradientColors: [string, string];
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  avatars?: QuickStartAvatar[];
}

export const QuickStartCard: FC<QuickStartCardProps> = ({
  id,
  title,
  type,
  description,
  cta,
  gradientColors,
  iconName = "headset-outline",
  avatars = [],
}) => {
  const router = useRouter();
  const handlePress = () => {
    if (type === "article") {
      router.push({
        pathname: "/(app)/article/[id]",
        params: { id: id },
      });
    } else if (type === "podcast") {
      router.push({
        pathname: "/(app)/podcast/[id]",
        params: { id: id },
      });
    }
  };
  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.headerRow}>
        <Typography
          variant="bold"
          color="grey"
          size={18}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Typography>
        <View style={styles.iconBadge}>
          <Ionicons name={iconName} size={18} color="rgba(255,255,255,0.6)" />
        </View>
      </View>
      {!!description && (
        <Typography
          color="grey"
          size={13}
          numberOfLines={3}
          ellipsizeMode="tail"
          style={{ opacity: 0.85 }}
        >
          {description}
        </Typography>
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
            onTouchEnd={handlePress}
          >
            <Typography
              variant="medium"
              color="grey"
              size={12}
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ maxWidth: 160, flexShrink: 1 }}
            >
              {cta}
            </Typography>
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
});
