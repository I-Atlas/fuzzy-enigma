import {
  Avatar,
  CoinsPill,
  Contacts,
  EditForm,
  InfoCard,
  NameRole,
} from "@/components/profile";
import { Button, Typography } from "@/components/ui";
import { useAuthStore } from "@/stores/auth";
import { useProfileStore } from "@/stores/profile";
import { useRouter } from "expo-router";
import React from "react";
import { Button as RNButton, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserProfileScreen() {
  const profile = useProfileStore();
  const auth = useAuthStore();
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);

  const [fullName, setFullName] = React.useState(profile.fullName);
  const [role, setRole] = React.useState(profile.role);
  const [about, setAbout] = React.useState(profile.about);
  const [interests, setInterests] = React.useState(profile.interests);

  const save = () => {
    profile.setField("fullName", fullName.trim());
    profile.setField("role", role.trim());
    profile.setField("about", about);
    profile.setField("interests", interests);
    setIsEditing(false);
  };

  React.useEffect(() => {
    if (!isEditing) {
      setFullName(profile.fullName);
      setRole(profile.role);
      setAbout(profile.about);
      setInterests(profile.interests);
    }
  }, [
    isEditing,
    profile.about,
    profile.fullName,
    profile.interests,
    profile.role,
  ]);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Avatar />
        <NameRole fullName={profile.fullName} role={profile.role} />
        <CoinsPill coins={profile.coins} />

        {!isEditing ? (
          <>
            <InfoCard title="Обо мне">
              <Typography size={14} color="#333333">
                {profile.about || "Разработчик"}
              </Typography>
            </InfoCard>
            <InfoCard title="Интересы">
              {profile.interests ? (
                <Typography size={14} color="#333333">
                  {profile.interests}
                </Typography>
              ) : null}
            </InfoCard>
            <InfoCard title="Контакты:">
              <Contacts socials={profile.socials} />
            </InfoCard>
          </>
        ) : (
          <EditForm
            fullName={fullName}
            role={role}
            about={about}
            interests={interests}
            onChangeFullName={setFullName}
            onChangeRole={setRole}
            onChangeAbout={setAbout}
            onChangeInterests={setInterests}
          />
        )}

        <View
          style={{
            width: "100%",
            paddingHorizontal: 16,
            gap: 16,
            marginTop: 16,
          }}
        >
          <Button
            title={isEditing ? "Сохранить" : "Редактировать профиль"}
            variant={isEditing ? "primary" : "elevated"}
            onPress={() => (isEditing ? save() : setIsEditing(true))}
          />
          <RNButton
            title="Выйти"
            onPress={() => {
              auth.logout();
              router.replace("/(auth)/login");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F7F7" },
  content: { alignItems: "center", paddingBottom: 40 },
  headerRow: { alignSelf: "stretch", paddingHorizontal: 12, paddingTop: 6 },
});
