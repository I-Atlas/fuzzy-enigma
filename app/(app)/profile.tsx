import Coin from "@/assets/svg/coin.svg";
import Vk from "@/assets/svg/vk.svg";
import { useProfileStore } from "@/stores/profile";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserProfileScreen() {
  const profile = useProfileStore();
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
        {/* Back button handled by stack header in (app)/_layout */}
        <View style={styles.avatarWrap}>
          <Text style={styles.emoji}>🐥</Text>
        </View>
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.role}>{profile.role}</Text>
        <View style={styles.coins}>
          <Text style={styles.coinText}>{profile.coins}</Text>
          <Coin width={18} height={18} />
        </View>

        {!isEditing ? (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Обо мне</Text>
              <Text style={styles.cardText}>
                {profile.about || "Разработчик"}
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Интересы</Text>
              {profile.interests ? (
                <Text style={styles.cardText}>{profile.interests}</Text>
              ) : null}
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Контакты:</Text>
              <View style={styles.contactsRow}>
                <Vk width={32} height={32} />
                {profile.socials.map((s) => (
                  <View key={s.label} style={styles.contactPill}>
                    <Text style={styles.contactText}>{s.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Редактирование</Text>
            <TextInput
              style={styles.input}
              placeholder="Имя Фамилия"
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              style={styles.input}
              placeholder="Должность"
              value={role}
              onChangeText={setRole}
            />
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              placeholder="Обо мне"
              value={about}
              onChangeText={setAbout}
              multiline
            />
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              placeholder="Интересы"
              value={interests}
              onChangeText={setInterests}
              multiline
            />
          </View>
        )}

        <Pressable
          style={[styles.primaryBtn, isEditing && styles.saveBtn]}
          onPress={() => (isEditing ? save() : setIsEditing(true))}
        >
          <Text style={styles.primaryBtnText}>
            {isEditing ? "Сохранить" : "Редактировать профиль"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F7F7" },
  content: { alignItems: "center", paddingBottom: 40 },
  headerRow: { alignSelf: "stretch", paddingHorizontal: 12, paddingTop: 6 },
  avatarWrap: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#FFE6B8",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  emoji: { fontSize: 64 },
  name: { marginTop: 16, fontSize: 24, fontWeight: "800", color: "#333333" },
  role: { marginTop: 4, fontSize: 13, color: "#8E8E93" },
  coins: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 10,
    shadowColor: "#2E38561A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  coinText: { fontSize: 16, fontWeight: "700", color: "#333333" },

  card: {
    alignSelf: "stretch",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#2E38561A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#333333",
    marginBottom: 8,
  },
  cardText: { fontSize: 14, color: "#333333" },
  contactsRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  contactPill: {
    backgroundColor: "#EDF4FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  contactText: { color: "#2F68FF", fontWeight: "600" },

  input: {
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: "#FAFAFA",
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  primaryBtn: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 18,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtn: { backgroundColor: "#34C759" },
  primaryBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 16 },
});
