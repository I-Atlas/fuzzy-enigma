import { Typography } from "@/components/ui";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { DailyQuestCard, DailyQuestCardProps } from "./DailyQuestCard";

interface DailyQuestSectionProps {
  title?: string;
  card?: DailyQuestCardProps;
}

export const DailyQuestSection: FC<DailyQuestSectionProps> = ({
  title = "Ежедневный квест",
  card,
}) => {
  return (
    <View style={styles.container}>
      <Typography variant="bold" color="grey" size={24}>
        {title}
      </Typography>
      <DailyQuestCard {...(card ?? {})} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingHorizontal: 16,
  },
});
