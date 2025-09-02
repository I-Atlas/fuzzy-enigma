import type { TeamMember } from "@/types";
import React, { FC } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { MemberCard } from "./MemberCard";

interface MemberListProps {
  data: TeamMember[];
  onPressMember?: (member: TeamMember) => void;
}

export const MemberList: FC<MemberListProps> = ({ data, onPressMember }) => {
  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={data}
      keyExtractor={(m) => m.id}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      renderItem={({ item }) => (
        <MemberCard isCompact member={item} onPress={onPressMember} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 24 },
});
