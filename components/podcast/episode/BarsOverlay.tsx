import { Group, RoundedRect, Skia } from "@shopify/react-native-skia";
import React, { FC, useMemo } from "react";

interface BarsOverlayProps {
  bars: number;
  barHeights: number[];
  color: string;
  height: number;
  width: number;
  gap?: number;
  radius?: number;
}

export const BarsOverlay: FC<BarsOverlayProps> = ({
  bars,
  barHeights,
  color,
  height,
  width,
  gap = 2,
  radius = 2,
}) => {
  const { barWidth, positions } = useMemo(() => {
    const bw = Math.max(2, (width - gap * (bars - 1)) / Math.max(1, bars));
    const pos = new Array(Math.max(0, bars)).fill(null).map((_, i) => {
      const x = i * (bw + gap);
      const rawH = Math.max(
        8,
        Math.floor(height * 0.2 + (height * 0.8 - 6) * (barHeights[i] || 0)),
      );
      const y = Math.max(0, (height - rawH) / 2);
      return { x, y, h: rawH };
    });
    return { barWidth: bw, positions: pos };
  }, [bars, barHeights, gap, height, width]);

  const skiaColor = useMemo(() => Skia.Color(color), [color]);

  return (
    <Group>
      {positions.map((p, i) => (
        <RoundedRect
          key={i}
          x={p.x}
          y={p.y}
          width={barWidth}
          height={p.h}
          r={radius}
          color={skiaColor}
        />
      ))}
    </Group>
  );
};
