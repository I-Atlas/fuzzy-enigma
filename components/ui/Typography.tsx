import React, { FC, PropsWithChildren } from "react";
import { Text, TextProps, TextStyle } from "react-native";

import { COLOR } from "@/constants/color";

type TypographyVariant = "regular" | "medium" | "semi-bold" | "bold";

type TypographyColor = "grey" | "white" | "blue" | string;

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  size?: number;
}

function resolveFontWeight(
  variant: TypographyVariant | undefined,
): TextStyle["fontWeight"] {
  switch (variant) {
    case "bold":
      return "700";
    case "semi-bold":
      return "600";
    case "medium":
      return "500";
    case "regular":
    default:
      return "400";
  }
}

function resolveColor(color: TypographyColor | undefined): string | undefined {
  if (!color) return undefined;
  switch (color) {
    case "grey":
      return COLOR.Grey;
    case "white":
      return COLOR.White;
    case "blue":
      return COLOR.Blue;
    default:
      return color;
  }
}

export const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  children,
  variant = "regular",
  color,
  size,
  style,
  ...rest
}) => {
  const textStyle: TextStyle = {
    fontWeight: resolveFontWeight(variant),
    color: resolveColor(color),
    fontSize: size,
  };

  return (
    <Text {...rest} style={[textStyle, style]}>
      {children}
    </Text>
  );
};
