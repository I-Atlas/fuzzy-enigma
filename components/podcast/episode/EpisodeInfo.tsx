import { Typography } from "@/components/ui/Typography";
import { TeamMember } from "@/types";
import React, { FC } from "react";
import { Image, View } from "react-native";

interface EpisodeInfoProps {
  title: string;
  subtitle?: string;
  hosts?: TeamMember[];
}

export const EpisodeInfo: FC<EpisodeInfoProps> = ({
  title,
  subtitle,
  hosts,
}) => {
  return (
    <View
      style={{
        margin: 16,
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 2,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ marginLeft: 8, flex: 1 }}>
          <Typography variant="semi-bold" color="grey" size={16}>
            {title}
          </Typography>
          {!!subtitle && (
            <Typography color="grey" size={14} style={{ opacity: 0.8 }}>
              {subtitle}
            </Typography>
          )}
        </View>
      </View>

      <View style={{ flexDirection: "row", marginTop: 12 }}>
        {hosts?.slice(0, 2).map((h) => (
          <Image
            key={h.id}
            source={{ uri: h.avatarUrl }}
            style={{ width: 32, height: 32, borderRadius: 16, marginRight: -8 }}
          />
        ))}
      </View>
    </View>
  );
};
