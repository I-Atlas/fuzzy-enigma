import { COLOR } from "@/constants/color";
import { FC, useCallback, useMemo, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { BarsOverlay } from "./BarsOverlay";

interface AudioWaveformProps {
  durationSec: number;
  currentSec: number;
  onSeek: (sec: number) => void;
  height?: number;
  bars?: number;
}

export const AudioWaveform: FC<AudioWaveformProps> = ({
  durationSec,
  currentSec,
  onSeek,
  height = 32,
  bars = 72,
}) => {
  const [width, setWidth] = useState(0);
  const progress =
    durationSec > 0 ? Math.min(Math.max(currentSec / durationSec, 0), 1) : 0;

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const barHeights = useMemo(() => {
    // Deterministic pseudo-random bars
    const result: number[] = [];
    for (let i = 0; i < bars; i += 1) {
      const t = i / bars;
      const v = Math.abs(Math.sin((t + 0.13) * Math.PI * 4)) * 0.7 + 0.3; // 0.3..1.0
      result.push(v);
    }
    return result;
  }, [bars]);

  const handleSeek = useCallback(
    (x: number) => {
      if (width <= 0) {
        return;
      }
      const clamped = Math.max(
        0,
        Math.min((x / width) * durationSec, durationSec),
      );
      onSeek(clamped);
    },
    [width, durationSec, onSeek],
  );

  const tapGesture = useMemo(
    () =>
      Gesture.Tap()
        .runOnJS(true)
        .onStart((e) => {
          // e.x is relative to the target view
          runOnJS(handleSeek)(e.x);
        }),
    [handleSeek],
  );

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .runOnJS(true)
        .onStart((e) => {
          runOnJS(handleSeek)(e.x);
        })
        .onChange((e) => {
          runOnJS(handleSeek)(e.x);
        }),
    [handleSeek],
  );

  const composedGesture = useMemo(
    () => Gesture.Simultaneous(tapGesture, panGesture),
    [tapGesture, panGesture],
  );

  const activeWidth = Math.round(width * progress);

  return (
    <GestureDetector gesture={composedGesture}>
      <View onLayout={onLayout} style={{ height, marginTop: 12 }}>
        <View
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 12,
          }}
        />
        {/* Background bars */}
        <BarsOverlay
          bars={bars}
          barHeights={barHeights}
          color={COLOR.Grey}
          height={height}
          width={width}
        />
        {/* Foreground (progress) bars */}
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: activeWidth,
            overflow: "hidden",
          }}
        >
          <BarsOverlay
            bars={bars}
            barHeights={barHeights}
            color={COLOR.Blue}
            height={height}
            width={width}
          />
        </View>
      </View>
    </GestureDetector>
  );
};
