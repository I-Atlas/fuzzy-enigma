import { Typography } from "@/components/ui";
import React, { FC, useEffect, useMemo } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface FloatingPillProps {
  text: string;
  top: number;
  left: number;
  delay?: number;
  rotate?: number;
}

export const FloatingPill: FC<FloatingPillProps> = ({
  text,
  top,
  left,
  delay,
  rotate = 0,
}: {
  text: string;
  top: number;
  left: number;
  delay?: number;
  rotate?: number;
}) => {
  const amplitude = 8;
  const bob = useSharedValue(0);
  const rot = useSharedValue(0);

  const seededDelay = useMemo(
    () => delay ?? Math.floor(Math.random() * 800),
    [delay],
  );
  const bobDuration = useMemo(
    () => 2600 + Math.floor(Math.random() * 1600),
    [],
  );
  const rotDuration = useMemo(
    () => 4200 + Math.floor(Math.random() * 1800),
    [],
  );

  useEffect(() => {
    bob.value = withDelay(
      seededDelay,
      withRepeat(
        withTiming(1, {
          duration: bobDuration,
          easing: Easing.inOut(Easing.quad),
        }),
        -1,
        true,
      ),
    );
    rot.value = withDelay(
      (seededDelay + 300) % 1000,
      withRepeat(
        withTiming(1, {
          duration: rotDuration,
          easing: Easing.inOut(Easing.quad),
        }),
        -1,
        true,
      ),
    );
  }, [seededDelay, bobDuration, rotDuration, bob, rot]);

  const style = useAnimatedStyle(() => {
    const translateY = (bob.value - 0.5) * 2 * amplitude;
    const rotation = rotate + (rot.value - 0.5) * 0.12;
    return {
      top,
      left,
      transform: [{ translateY }, { rotate: `${rotation}rad` }],
    };
  });

  return (
    <Animated.View style={[styles.pill, style]} pointerEvents="none">
      <Typography size={14} color="#1771E6" variant="medium">
        {text}
      </Typography>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  pill: {
    position: "absolute",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#1A73E8",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 1,
    marginVertical: 8,
  },
});
