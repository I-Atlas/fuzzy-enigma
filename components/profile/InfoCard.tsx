import { Typography } from "@/components/ui";
import React, { FC, PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

type InfoCardProps = PropsWithChildren<{
  title: string;
}>;

export const InfoCard: FC<InfoCardProps> = ({ title, children }) => {
  return (
    <View style={styles.card}>
      <Typography
        variant="bold"
        size={18}
        color="#333333"
        style={styles.cardTitle}
      >
        {title}
      </Typography>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf: "stretch",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#2E38561A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  cardTitle: { marginBottom: 8 },
});
