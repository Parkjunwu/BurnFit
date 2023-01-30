import { PropsWithChildren } from "react";
import Animated from "react-native-reanimated";
import useColorsChangedByDarkMode from "../../hooks/useColorsChangedByDarkMode";

type AnimatedDetailViewHOCProps = {
  wholeScreenHeight: number;
  animatedMainUpDown: {
    transform: {
        translateY: number;
    }[];
  };
};

const AnimatedDetailViewHOC: React.FC<
  PropsWithChildren<AnimatedDetailViewHOCProps>
> = ({
  wholeScreenHeight,
  animatedMainUpDown,
  children,
}) => {

  const { backgroundColor } = useColorsChangedByDarkMode();

  return (
    <Animated.View
      style={[
        {
          height: wholeScreenHeight,
          backgroundColor,
        },
        animatedMainUpDown,
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedDetailViewHOC;