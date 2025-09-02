import { Typography } from "@/components/ui";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Typography variant="semi-bold" size={24}>
        Избранное
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
