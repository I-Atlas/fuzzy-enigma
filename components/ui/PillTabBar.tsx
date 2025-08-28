import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

export const PillTabBar: React.FC<BottomTabBarProps> = (props) => {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 8);

  return (
    <View style={{ paddingBottom: bottomPadding }}>
      <View style={styles.container}>
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
              activeOpacity={0.8}
            >
              <Icon width={24} height={24} />
              <Text style={[styles.label, isFocused && styles.labelFocused]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 64,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    borderColor: "#99C7FF",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingVertical: 4,
    // iOS shadow
    shadowColor: "#2E38561A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    // Android elevation
    elevation: 8,
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
    backgroundColor: "#007AFF",
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "#007AFF",
  },
  labelFocused: {
    color: "#fff",
  },
});
