import { Stack } from "expo-router";
import React from "react";

export default function AppAreaLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitle: "",
        headerBackTitle: "",
        headerTintColor: "#1C1C1E",
        headerStyle: { backgroundColor: "#F7F7F7" },
        contentStyle: { backgroundColor: "#F7F7F7" },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="profile" />
      <Stack.Screen name="team/[memberId]" />
      <Stack.Screen name="article/[id]" />
      <Stack.Screen name="podcast/[id]/episode/[episodeId]" />
    </Stack>
  );
}
