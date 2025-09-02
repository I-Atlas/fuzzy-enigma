import { Typography } from "@/components/ui";
import React, { FC } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface EditFormProps {
  fullName: string;
  role: string;
  about: string;
  interests: string;
  onChangeFullName: (v: string) => void;
  onChangeRole: (v: string) => void;
  onChangeAbout: (v: string) => void;
  onChangeInterests: (v: string) => void;
}

export const EditForm: FC<EditFormProps> = ({
  fullName,
  role,
  about,
  interests,
  onChangeFullName,
  onChangeRole,
  onChangeAbout,
  onChangeInterests,
}) => {
  return (
    <View style={styles.card}>
      <Typography
        variant="bold"
        size={18}
        color="#333333"
        style={styles.cardTitle}
      >
        Редактирование
      </Typography>
      <TextInput
        style={styles.input}
        placeholder="Имя Фамилия"
        value={fullName}
        onChangeText={onChangeFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Должность"
        value={role}
        onChangeText={onChangeRole}
      />
      <TextInput
        style={[styles.input, styles.inputMultiline]}
        placeholder="Обо мне"
        value={about}
        onChangeText={onChangeAbout}
        multiline
      />
      <TextInput
        style={[styles.input, styles.inputMultiline]}
        placeholder="Интересы"
        value={interests}
        onChangeText={onChangeInterests}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  cardTitle: { marginBottom: 8 },
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
});
