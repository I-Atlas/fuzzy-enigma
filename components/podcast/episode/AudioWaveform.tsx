import { COLOR } from "@/constants/color";
import { Canvas, Group, Rect, RoundedRect } from "@shopify/react-native-skia";
import React, { FC, useEffect, useMemo, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import { BarsOverlay } from "./BarsOverlay";

interface AudioWaveformProps {
  durationSec: number;
  currentSec: number;
  onSeek: (sec: number) => void;
  height?: number;
  bars?: number;
}

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

export const AudioWaveform: FC<AudioWaveformProps> = ({
  durationSec,
  currentSec,
  onSeek,
  height = 54,
  bars = 96,
}) => {
  const [width, setWidth] = useState(0);

  // Interaction state
  const zoom = useSharedValue(1); // 1..8
  const offset = useSharedValue(0); // px within zoomed timeline
  const basePxPerSec = useSharedValue(0); // computed from width/duration
  const currentSv = useSharedValue(0);
  const panPrevTranslationX = useSharedValue(0);
  const pinchStartZoom = useSharedValue(1);
  const pinchStartOffset = useSharedValue(0);

  // Values mirrored to JS for Skia props
  const [zoomJs, setZoomJs] = useState(1);
  const [offsetJs, setOffsetJs] = useState(0);
  const [clipWidth, setClipWidth] = useState(0);
  const [playheadJs, setPlayheadJs] = useState(0);

  useEffect(() => {
    if (durationSec > 0 && width > 0) {
      basePxPerSec.value = width / durationSec;
      const totalPx = width * zoom.value;
      offset.value = clamp(offset.value, 0, Math.max(0, totalPx - width));
    }
  }, [durationSec, width, basePxPerSec, offset, zoom]);

  useEffect(() => {
    currentSv.value = currentSec;
  }, [currentSec, currentSv]);

  useAnimatedReaction(
    () => {
      const pps = basePxPerSec.value * zoom.value;
      const x = currentSv.value * pps - offset.value;
      return { z: zoom.value, o: offset.value, x };
    },
    (v) => {
      runOnJS(setZoomJs)(v.z);
      runOnJS(setOffsetJs)(v.o);
      runOnJS(setPlayheadJs)(v.x);
      runOnJS(setClipWidth)(clamp(v.x, 0, width || 0));
    },
  );

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  // Visual bars (deterministic pseudo-random heights)
  const barHeights = useMemo(() => {
    const result: number[] = [];
    for (let i = 0; i < bars; i += 1) {
      const t = i / bars;
      const v = Math.abs(Math.sin((t + 0.13) * Math.PI * 4)) * 0.7 + 0.3;
      result.push(v);
    }
    return result;
  }, [bars]);

  // Helpers
  const timeFromX = (x: number) => {
    if (durationSec <= 0 || width <= 0) return 0;
    const px = offset.value + x;
    const sec = px / (basePxPerSec.value * zoom.value);
    return clamp(sec, 0, durationSec);
  };

  // Gestures
  const tap = Gesture.Tap()
    .maxDuration(180)
    .onEnd((e) => {
      if (width <= 0 || durationSec <= 0) return;
      const sec = timeFromX(e.x);
      runOnJS(onSeek)(sec);
    });

  const pan = Gesture.Pan()
    .onBegin(() => {
      panPrevTranslationX.value = 0;
    })
    .onUpdate((e) => {
      if (width <= 0 || durationSec <= 0) return;
      if (zoom.value > 1) {
        const delta = e.translationX - panPrevTranslationX.value;
        panPrevTranslationX.value = e.translationX;
        const totalPx = width * zoom.value;
        const next = clamp(
          offset.value - delta,
          0,
          Math.max(0, totalPx - width),
        );
        offset.value = next;
      } else {
        const sec = timeFromX(e.x);
        runOnJS(onSeek)(sec);
      }
    })
    .onEnd((e) => {
      if (zoom.value > 1) {
        const totalPx = width * zoom.value;
        offset.value = withDecay({
          velocity: -e.velocityX,
          clamp: [0, Math.max(0, totalPx - width)],
        });
      }
    });

  const pinch = Gesture.Pinch()
    .onBegin(() => {
      pinchStartZoom.value = zoom.value;
      pinchStartOffset.value = offset.value;
    })
    .onUpdate((e) => {
      if (width <= 0 || durationSec <= 0) return;
      const startZoom = pinchStartZoom.value;
      const startOffset = pinchStartOffset.value;
      const nextZoom = clamp(startZoom * e.scale, 1, 8);
      if (nextZoom === zoom.value) return;

      const base = basePxPerSec.value;
      const timeAtFocal = (startOffset + e.focalX) / (base * startZoom);
      const totalPxNext = width * nextZoom;
      const newOffset = clamp(
        timeAtFocal * (base * nextZoom) - e.focalX,
        0,
        Math.max(0, totalPxNext - width),
      );
      zoom.value = nextZoom;
      offset.value = newOffset;
    });

  const composed = Gesture.Simultaneous(tap, pinch, pan);

  const bgColor = "#EAEAEA";

  return (
    <GestureDetector gesture={composed}>
      <View onLayout={onLayout} style={{ height, marginTop: 12 }}>
        <Canvas style={{ width, height }}>
          {/* Background */}
          <RoundedRect
            x={0}
            y={0}
            width={width}
            height={height}
            r={12}
            color={bgColor}
          />

          {/* Timeline content translated by scroll offset; zoom simulated via wider content width */}
          <Group transform={[{ translateX: -offsetJs }]}>
            {/* Bars background */}
            <BarsOverlay
              bars={bars}
              barHeights={barHeights}
              color="#D9D9D9"
              height={height}
              width={Math.max(1, Math.floor(width * zoomJs))}
            />
          </Group>

          {/* Foreground progress: clip in screen space and draw transformed content inside */}
          <Group
            clip={{
              rect: { x: 0, y: 0, width: Math.max(0, clipWidth), height },
              rx: 0,
              ry: 0,
            }}
          >
            <Group transform={[{ translateX: -offsetJs }]}>
              <BarsOverlay
                bars={bars}
                barHeights={barHeights}
                color={COLOR.Blue}
                height={height}
                width={Math.max(1, Math.floor(width * zoomJs))}
              />
            </Group>
          </Group>

          {/* Playhead indicator in screen space */}
          <Rect
            x={playheadJs}
            y={0}
            width={2}
            height={height}
            color={COLOR.Blue}
          />
        </Canvas>
      </View>
    </GestureDetector>
  );
};
