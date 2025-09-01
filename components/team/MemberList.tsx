import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MemberCard from "./MemberCard";
import type { TeamMember } from "./data";

type Props = {
  data: TeamMember[];
  onPressMember?: (member: TeamMember) => void;
};

export default function MemberList({ data, onPressMember }: Props) {
  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={data}
      keyExtractor={(m) => m.id}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      renderItem={({ item }) => (
        <MemberCard compact member={item} onPress={onPressMember} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 24 },
});
