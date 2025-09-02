import Coin from "@/assets/svg/coin.svg";
import { Typography } from "@/components/ui";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

interface CoinsPillProps {
  coins: number;
}

export const CoinsPill: FC<CoinsPillProps> = ({ coins }) => {
  return (
    <View style={styles.coins}>
      <Typography variant="bold" size={16} color="#333333">
        {coins}
      </Typography>
      <Coin width={18} height={18} />
    </View>
  );
};

const styles = StyleSheet.create({
  coins: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 10,
    shadowColor: "#2E38561A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
});
