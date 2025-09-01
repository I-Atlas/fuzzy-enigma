# Project Style Guide

## 1. General Principles

- Write **clean, modular, and maintainable code**.
- Follow **TypeScript-first development**: always type your props, states, and hooks.
- Keep **logic and UI separated**. Avoid placing business logic directly inside screens (`app/` directory).
- Use **domain-driven folder structure** for components, hooks, and utils.

---

## 2. Project Structure

```
/app
  /home
    index.tsx          // Home screen entry
  /profile
    index.tsx
/components
  /home
    HomeHeader.tsx
    HomeList.tsx
  /profile
    ProfileCard.tsx
  /common
    Button.tsx
    Card.tsx
/hooks
  /home
    useHomeData.ts
  /profile
    useProfileForm.ts
/state
  useAuthStore.ts
  useUserStore.ts
/types
  user.ts
  team.ts
/utils
  /profile
    formatProfile.ts
  /team
    calculateTeamStats.ts
  formatDate.ts
  constants.ts
/assets
  /icons
  /images
```

### Rules

- **Screens (`app/`)**: orchestrate navigation and compose components.
- **Components (`components/`)**: split by domain (`components/home/`, `components/profile/`). Shared UI primitives go into `components/common/`.
- **Hooks (`hooks/`)**: split by domain (`hooks/home/`, `hooks/profile/`).
- **Utils (`utils/`)**: split by domain (`utils/team/`, `utils/profile/`). Shared utilities (e.g., `formatDate`) go directly into `utils/`.
- **State (`state/`)**: one file per Zustand store, typed.
- **Types (`types/`)**: domain-specific types (e.g., `user.ts`, `team.ts`).
- **Assets (`assets/`)**: icons, images, fonts. Use `react-native-svg-transformer` for SVG imports.

---

## 3. Components

### Declaration

```tsx
interface NewComponentProps {
  title: string;
  isVisible?: boolean;
}

export const NewComponent: FC<NewComponentProps> = ({
  title,
  isVisible = true,
}) => {
  if (!isVisible) return null;

  return <Text>{title}</Text>;
};
```

### Guidelines

- Always use **`FC<Props>`** with explicit props interface.
- Name boolean props and constants with `is`, `has`, or `can`.
- Keep components **small and composable**.
- Extract **reusable UI primitives** into `components/common/`.

---

## 4. State Management (Zustand)

```ts
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));
```

### Guidelines

- Define **typed store interfaces**.
- Keep **actions inside the store**.
- Avoid unnecessary nesting in state.

---

## 5. Animations (Reanimated)

- Use **Reanimated v3 hooks** (`useSharedValue`, `useAnimatedStyle`, `withSpring`, `withTiming`).
- Extract animation logic into **hooks** if reused.
- Keep animation values close to the component they belong to.

---

## 6. SVGs

- Import SVGs directly as components using `react-native-svg-transformer`.

```tsx
import Logo from "@/assets/icons/logo.svg";
```

- Do not wrap SVGs in `<Image />`.

---

## 7. Styling

- Use **StyleSheet** consistently.
- Avoid inline styles unless trivial.
- Keep **theme and color palette centralized**.

```ts
export const colors = {
  primary: "#0073FF",
  background: "#F7F7F7",
  text: "#333333" or "#FFF",
};
```

---

## 8. Naming Conventions

- **Files & folders**: `PascalCase` for components, `camelCase` for utils/hooks.
- **Interfaces**: `PascalCase` with `Props` suffix for component props.
- **Booleans**: prefix with `is`, `has`, or `can`.
- **Constants**: `UPPER_CASE_WITH_UNDERSCORES`.

---

## 9. Types & Interfaces

- Prefer **interfaces for objects and props**.
- Use **type aliases** for unions, utility types, or function signatures.

```ts
interface User {
  id: string;
  name: string;
  isActive: boolean;
}

type UserRole = "admin" | "editor" | "viewer";
```

---

## 10. Best Practices

- Keep **screens lean**.
- Place **business/domain logic** inside hooks, utils, or stores.
- Write **self-documenting code** with meaningful names.
- Keep imports ordered:

  1. External libraries
  2. Internal modules grouped by type (components, state, utils)

```ts
import { View } from "react-native";
import { useAuthStore } from "@/state/useAuthStore";
import { HomeHeader } from "@/components/home/HomeHeader";
import { formatDate } from "@/utils/formatDate";
```
