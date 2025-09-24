import React, { FC } from "react";
import { Image, View } from "react-native";

interface CoverArtProps {
  uri?: string;
}

export const CoverArt: FC<CoverArtProps> = ({ uri }) => {
  return (
    <View style={{ marginHorizontal: 16, marginTop: 16, alignItems: "center" }}>
      <Image
        source={{ uri }}
        style={{
          width: "100%",
          borderRadius: 32,
          aspectRatio: 0.85,
          backgroundColor: "#EEE",
        }}
      />
    </View>
  );
};
