import { FC } from "react";
import { View } from "react-native";

interface BarsOverlayProps {
  bars: number;
  barHeights: number[];
  color: string;
  height: number;
  width: number;
}

export const BarsOverlay: FC<BarsOverlayProps> = ({
  bars,
  barHeights,
  color,
  height,
  width,
}) => {
  const gap = 2;
  const barWidth = Math.max(2, (width - gap * (bars - 1)) / bars);
  return (
    <View
      style={{
        position: "absolute",
        inset: 0,
        flexDirection: "row",
        alignItems: "center",
      }}
      pointerEvents="none"
    >
      {new Array(bars).fill(null).map((_, i) => {
        const h = Math.max(
          8,
          Math.floor(height * 0.2 + (height * 0.8 - 6) * barHeights[i]),
        );
        return (
          <View
            key={i}
            style={{
              width: barWidth,
              height: h,
              backgroundColor: color,
              borderRadius: 2,
              marginRight: i === bars - 1 ? 0 : gap,
            }}
          />
        );
      })}
    </View>
  );
};
