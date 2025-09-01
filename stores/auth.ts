import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AuthState = {
  email: string;
  code: string;
  codeExpiresAt: number | null;
  isAuthenticated: boolean;
  setEmail: (value: string) => void;
  generateCode: () => string;
  setCode: (code: string) => void;
  login: () => void;
  logout: () => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      email: "",
      code: "",
      codeExpiresAt: null,
      isAuthenticated: false,
      setEmail: (value: string) => set({ email: value }),
      setCode: (value: string) => set({ code: value }),
      generateCode: () => {
        const calc = 7777 - new Date().getDate() * 10 - 1;
        const code = String(calc).padStart(4, "0").slice(0, 4);
        const ttlMs = 60 * 1000;
        set({ code: code, codeExpiresAt: Date.now() + ttlMs });
        return code;
      },
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
      reset: () => set({ email: "", code: "", codeExpiresAt: null }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        email: state.email,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export const applyPhoneMask = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  const limitedDigits = digits.slice(0, 11);
  if (limitedDigits.length === 0) {
    return "";
  }
  if (limitedDigits.length <= 1) {
    return `+7`;
  }
  if (limitedDigits.length <= 4) {
    return `+7 (${limitedDigits.slice(1)}`;
  }
  if (limitedDigits.length <= 7) {
    return `+7 (${limitedDigits.slice(1, 4)}) ${limitedDigits.slice(4)}`;
  }
  if (limitedDigits.length <= 9) {
    return `+7 (${limitedDigits.slice(1, 4)}) ${limitedDigits.slice(
      4,
      7,
    )}-${limitedDigits.slice(7)}`;
  }
  return `+7 (${limitedDigits.slice(1, 4)}) ${limitedDigits.slice(
    4,
    7,
  )}-${limitedDigits.slice(7, 9)}-${limitedDigits.slice(9, 11)}`;
};

export const validateEmail = (value: string): string => {
  const v = (value || "").trim();
  if (!v) return "Обязательное поле";
  const re =
    /^(?:[a-zA-Z0-9_'^&\/+-])+(?:\.(?:[a-zA-Z0-9_'^&\/+-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  return re.test(v) ? "" : "Введите корректный email";
};
