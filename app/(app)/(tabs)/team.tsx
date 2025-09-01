import { TEAM_MEMBERS, type TeamMember } from "@/components/team/data";
import MemberCarousel from "@/components/team/MemberCarousel";
import MemberList from "@/components/team/MemberList";
import SearchInput from "@/components/team/SearchInput";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function TeamScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  useSafeAreaInsets();

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return TEAM_MEMBERS;
    return TEAM_MEMBERS.filter((m) => {
      const haystack = [
        m.fullName.toLowerCase(),
        m.role.toLowerCase(),
        m.tags.join(" ").toLowerCase(),
      ].join(" ");
      return haystack.includes(normalized);
    });
  }, [query]);

  const handleOpenProfile = (member: TeamMember) => {
    router.push({
      pathname: "/(app)/team/[memberId]",
      params: { memberId: member.id },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <SearchInput
              value={query}
              onChangeText={setQuery}
              onFocus={() => setFocused(true)}
              onCancel={() => {
                setFocused(false);
                setQuery("");
                Keyboard.dismiss();
              }}
              isFocused={focused}
            />
          </View>

          {focused ? (
            <Animated.View
              entering={FadeIn.duration(150)}
              exiting={FadeOut.duration(120)}
            >
              <MemberList
                data={filtered}
                onPressMember={(m) => {
                  setFocused(false);
                  Keyboard.dismiss();
                  handleOpenProfile(m);
                }}
              />
            </Animated.View>
          ) : (
            <Animated.View
              entering={FadeIn.duration(150)}
              exiting={FadeOut.duration(120)}
            >
              <View style={{ height: 16 }} />
              <MemberCarousel
                members={TEAM_MEMBERS}
                onPressMember={handleOpenProfile}
              />
              <View style={{ height: 16 }} />
              <View style={styles.ctaContainer}>
                <Button
                  title="Познакомиться 👋"
                  onPress={() => handleOpenProfile(TEAM_MEMBERS[0])}
                />
              </View>
            </Animated.View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16 },
  ctaContainer: { paddingHorizontal: 16 },
});
