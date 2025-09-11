import { Typography } from "@/components/ui/Typography";
import React, { FC } from "react";
import { View } from "react-native";

interface NowPlayingHeaderProps {
  title: string;
}

export const NowPlayingHeader: FC<NowPlayingHeaderProps> = ({ title }) => {
  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
      <Typography color="grey" size={13} style={{ opacity: 0.7 }}>
        Сейчас играет
      </Typography>
      <Typography
        variant="semi-bold"
        size={20}
        color="grey"
        style={{ marginTop: 2 }}
      >
        {title}
      </Typography>
    </View>
  );
};
