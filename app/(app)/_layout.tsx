import { COLOR } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";

export default function AppAreaLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitle: "",
        headerBackButtonDisplayMode: "minimal",
        headerTintColor: "#333333",
        headerStyle: { backgroundColor: COLOR.Background_Light },
        contentStyle: { backgroundColor: COLOR.Background_Light },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="profile" />
      <Stack.Screen name="team/[memberId]" />
      <Stack.Screen
        name="article/[id]"
        options={{
          headerRight: () => (
            <Ionicons name="bookmark-outline" size={24} color={COLOR.Grey} />
          ),
          headerStyle: { backgroundColor: COLOR.Background_Orange },
        }}
      />
      <Stack.Screen
        name="podcast/[id]/index"
        options={{
          headerStyle: { backgroundColor: COLOR.Background_Yellow },
        }}
      />
      <Stack.Screen name="podcast/[id]/episode/[episodeId]" />
      <Stack.Screen
        name="modals/episode-description"
        options={{
          presentation: "modal",
          headerShown: false,
          contentStyle: { backgroundColor: COLOR.Background_Yellow },
        }}
      />
    </Stack>
  );
}
