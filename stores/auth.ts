import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AuthState = {
  fullName: string;
  phone: string;
  code: string;
  codeExpiresAt: number | null;
  isAuthenticated: boolean;
  setFullName: (value: string) => void;
  setPhone: (value: string) => void;
  generateCode: () => string;
  setCode: (code: string) => void;
  login: () => void;
  logout: () => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      fullName: "",
      phone: "",
      code: "",
      codeExpiresAt: null,
      isAuthenticated: false,
      setFullName: (value: string) => set({ fullName: value }),
      setPhone: (value: string) => set({ phone: value }),
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
      reset: () =>
        set({ fullName: "", phone: "", code: "", codeExpiresAt: null }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        fullName: state.fullName,
        phone: state.phone,
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

export function validateFullName(value: string): string {
  if (!value.trim()) return "Обязательное поле";
  if (!/^[А-ЯЁа-яё\-\s]+$/.test(value.trim()))
    return "Разрешены только кириллица и дефис";
  return "";
}

export const validatePhone = (value: string): string => {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 0) {
    return "Обязательное поле";
  }

  if (digits.length < 11) {
    return "Номер телефона должен содержать 11 цифр";
  }

  if (digits[0] !== "7") {
    return "Номер должен начинаться с +7";
  }

  const operatorCode = digits.slice(1, 4);
  const validOperatorCodes = [
    // МТС
    "910",
    "911",
    "912",
    "913",
    "914",
    "915",
    "916",
    "917",
    "918",
    "919",
    "980",
    "981",
    "982",
    "983",
    "984",
    "985",
    "986",
    "987",
    "988",
    "989",
    // Билайн
    "903",
    "905",
    "906",
    "909",
    "951",
    "952",
    "953",
    "954",
    "955",
    "956",
    "957",
    "958",
    "959",
    "960",
    "961",
    "962",
    "963",
    "964",
    "965",
    "966",
    "967",
    "968",
    "969",
    // МегаФон
    "920",
    "921",
    "922",
    "923",
    "924",
    "925",
    "926",
    "927",
    "928",
    "929",
    "930",
    "931",
    "932",
    "933",
    "934",
    "935",
    "936",
    "937",
    "938",
    "939",
    // Теле2
    "900",
    "901",
    "902",
    "904",
    "908",
    "950",
    "991",
    "992",
    "993",
    "994",
    "995",
    "996",
    "997",
    "998",
    "999",
  ];

  if (!validOperatorCodes.includes(operatorCode)) {
    return "Неверный код оператора";
  }

  return "";
};
