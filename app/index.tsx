import { useAuthStore } from "@/stores/auth";
import { Redirect } from "expo-router";
import React from "react";

export default function Index() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) {
    return <Redirect href="/(app)/(tabs)/home" />;
  }
  // Casting is used to avoid stale type unions before router types regenerate
  return <Redirect href={"/(auth)/welcome" as unknown as any} />;
}
