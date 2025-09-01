import { useAuthStore } from "@/stores/auth";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) {
    return <Redirect href="/(app)/(tabs)/home" />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="login"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="confirm"
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack>
  );
}
