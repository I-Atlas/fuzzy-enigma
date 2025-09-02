import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type SocialLink = {
  type: "vk" | "telegram" | "email" | "other";
  label: string;
  url?: string;
};

export type ProfileState = {
  fullName: string;
  role: string;
  coins: number;
  about: string;
  interests: string;
  socials: SocialLink[];
  setField: <
    K extends keyof Omit<
      ProfileState,
      "setField" | "setSocials" | "addSocial" | "removeSocial" | "reset"
    >,
  >(
    key: K,
    value: ProfileState[K],
  ) => void;
  setSocials: (items: SocialLink[]) => void;
  addSocial: (item: SocialLink) => void;
  removeSocial: (label: string) => void;
  reset: () => void;
};

const defaultState: Omit<
  ProfileState,
  "setField" | "setSocials" | "addSocial" | "removeSocial" | "reset"
> = {
  fullName: "незнакомец",
  role: "Твоя роль?",
  coins: 0,
  about: "",
  interests: "",
  socials: [],
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      ...defaultState,
      setField: (key, value) => set({ [key]: value } as any),
      setSocials: (items) => set({ socials: items }),
      addSocial: (item) => set({ socials: [...get().socials, item] }),
      removeSocial: (label) =>
        set({ socials: get().socials.filter((s) => s.label !== label) }),
      reset: () => set({ ...defaultState }),
    }),
    {
      name: "profile-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        fullName: state.fullName,
        role: state.role,
        coins: state.coins,
        about: state.about,
        interests: state.interests,
        socials: state.socials,
      }),
    },
  ),
);
