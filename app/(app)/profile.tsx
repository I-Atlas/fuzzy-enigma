import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function UserProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профиль пользователя</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "600" },
});
