import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface WelcomeHeaderProps {
  name: string;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ name }) => {
  return (
    <View style={styles.container}>
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>🐥</Text>
      </View>
      <Text style={styles.greeting}>Привет, {name} 👋</Text>
      <Image
        source={{ uri: "https://dummyimage.com/1x1" }}
        style={styles.spacer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  emojiContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    marginRight: 8,
  },
  emoji: {
    fontSize: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  spacer: {
    width: 1,
    height: 1,
    marginLeft: "auto",
  },
});
