import React, { FC, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DailyQuestCard } from "./DailyQuestCard";

export const DailyQuestSection: FC = () => {
  const items = useMemo(
    () => [
      {
        id: "1",
        text: "Сфотографируйте секретный арт на стене в комнате для переговоров.",
      },
      { id: "2", text: "Найдите сотрудника с очками VR." },
    ],
    [],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ежедневный квест</Text>
      <DailyQuestCard items={items} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  title: {
    paddingHorizontal: 16,
    fontSize: 24,
    fontWeight: "800",
    color: "#333333",
  },
});

export default DailyQuestSection;
