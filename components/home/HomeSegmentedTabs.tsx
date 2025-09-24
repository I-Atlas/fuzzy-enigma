import { Typography } from "@/components/ui";
import * as Haptics from "expo-haptics";
import { FC, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

type TabKey = "hacks" | "office" | "team" | "remote";

interface HomeSegmentedTabsProps {
  value: TabKey;
  onChange: (next: TabKey) => void;
}

const TABS: { key: TabKey; title: string }[] = [
  { key: "hacks", title: "Лайфхаки" },
  { key: "office", title: "Офис" },
  { key: "team", title: "Команда" },
  { key: "remote", title: "Для удаленщиков" },
];

export const HomeSegmentedTabs: FC<HomeSegmentedTabsProps> = ({
  value,
  onChange,
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [layouts, setLayouts] = useState<
    Record<string, { x: number; width: number }>
  >({});

  useEffect(() => {
    const l = layouts[value];
    if (l && containerWidth) {
      const targetX = Math.max(0, l.x + l.width / 2 - containerWidth / 2);
      scrollRef.current?.scrollTo({ x: targetX, animated: true });
    }
  }, [value, containerWidth, layouts]);

  return (
    <View
      style={styles.container}
      onLayout={(e) => {
        const w = e?.nativeEvent?.layout?.width;
        if (typeof w === "number") setContainerWidth(w);
      }}
    >
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {TABS.map((t) => {
          const isActive = t.key === value;
          return (
            <TouchableOpacity
              key={t.key}
              style={[styles.item, isActive && styles.itemActive]}
              activeOpacity={0.5}
              onLayout={(ev) => {
                const l = ev?.nativeEvent?.layout;
                if (!l) return;
                setLayouts((prev) => ({
                  ...prev,
                  [t.key]: { x: l.x, width: l.width },
                }));
              }}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onChange(t.key);
              }}
            >
              <Typography
                numberOfLines={1}
                variant="semi-bold"
                color={isActive ? "white" : "grey"}
                size={16}
              >
                {t.title}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    marginTop: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  scrollContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  item: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 40,
    shadowColor: "#2E38561A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  itemActive: {
    backgroundColor: "#007AFF",
  },
});
