import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Typography } from "./Typography";

import Chat from "@/assets/svg/tabs/chat.svg";
import ChatSelected from "@/assets/svg/tabs/chat_selected.svg";
import Home from "@/assets/svg/tabs/home.svg";
import HomeSelected from "@/assets/svg/tabs/home_selected.svg";
import Team from "@/assets/svg/tabs/team.svg";
import TeamSelected from "@/assets/svg/tabs/team_selected.svg";

type RouteKey = "home" | "team" | "chat";

function getTabMeta(routeName: RouteKey, focused: boolean) {
  switch (routeName) {
    case "home":
      return {
        label: "Главная",
        Icon: focused ? HomeSelected : Home,
      };
    case "team":
      return {
        label: "Команда",
        Icon: focused ? TeamSelected : Team,
      };
    case "chat":
      return {
        label: "Чат",
        Icon: focused ? ChatSelected : Chat,
      };
    default:
      return { label: routeName, Icon: Home } as const;
  }
}

export const PillTabBar: FC<BottomTabBarProps> = (props) => {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 8);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const translateX = useSharedValue(0);

  const routesCount = props.state.routes.length;
  const horizontalPadding = 8;
  const itemWidth =
    containerWidth > 0 ? (containerWidth - horizontalPadding) / routesCount : 0;

  React.useEffect(() => {
    const nextX = itemWidth * props.state.index;
    translateX.value = withTiming(nextX, {
      duration: 320,
      easing: Easing.out(Easing.cubic),
    });
  }, [props.state.index, itemWidth, translateX]);

  const highlightStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={{ paddingBottom: bottomPadding, backgroundColor: "#F7F7F7" }}>
      <LinearGradient
        pointerEvents="none"
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.06)", "rgba(0,0,0,0.14)"]}
        locations={[0, 0.6, 1]}
        style={[styles.bottomFade, { height: bottomPadding + 24 }]}
      />
      <View
        style={styles.container}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      >
        {itemWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[styles.highlight, { width: itemWidth }, highlightStyle]}
          />
        )}
        {props.state.routes.map((route, index) => {
          const isFocused = props.state.index === index;
          const routeName = route.name as RouteKey;
          const { label, Icon } = getTabMeta(routeName, isFocused);

          const onPress = () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            const event = props.navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              props.navigation.navigate(route.name, { merge: true } as never);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={
                props.descriptors[route.key]?.options.tabBarAccessibilityLabel
              }
              onPress={onPress}
              style={[styles.item, isFocused && styles.itemFocused]}
              activeOpacity={0.5}
            >
              <Icon width={24} height={24} />
              <Typography
                variant="medium"
                color={isFocused ? "white" : "blue"}
                size={12}
              >
                {label}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 48,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    borderColor: "#99C7FF",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingVertical: 4,
    position: "relative",
    // iOS shadow
    shadowColor: "#2E38561A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    // Android elevation
    elevation: 8,
  },
  highlight: {
    position: "absolute",
    left: 4,
    top: 4,
    bottom: 4,
    borderRadius: 36,
    backgroundColor: "#007AFF",
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 8,
    paddingVertical: 10,
    borderRadius: 40,
  },
  itemFocused: {
    backgroundColor: "transparent",
  },
  bottomFade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
