import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuthStore } from "@/stores/auth";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const baseTheme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  const theme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      background: "transparent",
      card: "transparent",
      border: "transparent",
    },
  } as const;

  return (
    <ThemeProvider value={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Protected area: only for authenticated users */}
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>

        {/* Public auth area: only for unauthenticated users */}
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>

        {/* Shared routes */}
        <Stack.Screen name="index" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
