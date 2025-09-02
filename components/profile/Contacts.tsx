import Vk from "@/assets/svg/vk.svg";
import { Typography } from "@/components/ui";
import { SocialLink } from "@/stores/profile";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

interface ContactsProps {
  socials: SocialLink[];
}

export const Contacts: FC<ContactsProps> = ({ socials }) => {
  return (
    <View style={styles.contactsRow}>
      <Vk width={32} height={32} />
      {socials.map((s) => (
        <View key={s.label} style={styles.contactPill}>
          <Typography variant="semi-bold" color="#2F68FF">
            {s.label}
          </Typography>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  contactsRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  contactPill: {
    backgroundColor: "#EDF4FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
});
