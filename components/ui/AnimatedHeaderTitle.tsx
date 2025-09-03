import { COLOR } from "@/constants/color";
import { FC } from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface AnimatedHeaderTitleProps {
  title: string;
  progress: SharedValue<number>;
}

export const AnimatedHeaderTitle: FC<AnimatedHeaderTitleProps> = ({
  title,
  progress,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(progress.value, { duration: 200 }),
      transform: [{ translateY: withTiming(1 - progress.value) }],
    };
  });

  return (
    <Animated.Text
      style={[
        { fontSize: 16, fontWeight: "500", color: COLOR.Grey },
        animatedStyle,
      ]}
    >
      {title}
    </Animated.Text>
  );
};
