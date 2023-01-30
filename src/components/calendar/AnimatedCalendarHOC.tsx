import { PropsWithChildren } from "react";
import Animated from "react-native-reanimated";

type AnimatedCalendarHOCProps = {
  wholeScreenWeight: number;
  animatedCalendarPosition: {
    transform: {
        translateX: number;
    }[];
  };
};

const AnimatedCalendarHOC: React.FC<
  PropsWithChildren<AnimatedCalendarHOCProps>
> = ({
  wholeScreenWeight,
  animatedCalendarPosition,
  children,
}) => (
  <Animated.View
    style={[
      {
        width: wholeScreenWeight*3,
        flexDirection: 'row',
      },
      animatedCalendarPosition,
    ]}
  >
    {children}
  </Animated.View>
);

export default AnimatedCalendarHOC;