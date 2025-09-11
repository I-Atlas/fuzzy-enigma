import React, { FC } from "react";
import { Image, View } from "react-native";

interface CoverArtProps {
  uri?: string;
}

export const CoverArt: FC<CoverArtProps> = ({ uri }) => {
  return (
    <View style={{ padding: 16, alignItems: "center" }}>
      <Image
        source={{ uri }}
        style={{
          width: 300,
          height: 300,
          borderRadius: 16,
          backgroundColor: "#EEE",
        }}
      />
    </View>
  );
};
