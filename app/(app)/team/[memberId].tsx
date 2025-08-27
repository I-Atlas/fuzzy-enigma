import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TeamMemberProfileScreen() {
  const { memberId } = useLocalSearchParams<{ memberId: string }>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профиль члена команды</Text>
      <Text>ID: {memberId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 8 },
});
