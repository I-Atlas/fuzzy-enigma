export const COLOR = {
  Blue: "#0073FF",
  White: "#FFFFFF",
  Grey: "#333333",
  Black: "#000000",
  Background_Yellow: "#FFC85C",
  Background_Orange: "#FF9B34",
  Background_Light: "#F7F7F7",
  Background_LightBlue: "#E1EFFF",
  Stroke_Blue: "#0177FF",
  Stroke_LightBlue: "#99C7FF",
  Stroke_Red: "#E35A5A",
} as const;

export type ColorToken = keyof typeof COLOR;
