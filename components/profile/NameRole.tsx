import { Typography } from "@/components/ui";
import React, { FC } from "react";
import { StyleSheet } from "react-native";

interface NameRoleProps {
  fullName: string;
  role: string;
}

export const NameRole: FC<NameRoleProps> = ({ fullName, role }) => {
  return (
    <>
      <Typography variant="bold" size={24} color="#333333" style={styles.name}>
        {fullName}
      </Typography>
      <Typography size={13} color="#8E8E93" style={styles.role}>
        {role}
      </Typography>
    </>
  );
};

const styles = StyleSheet.create({
  name: { marginTop: 16 },
  role: { marginTop: 4 },
});
