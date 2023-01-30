import { useWindowDimensions } from "react-native";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const useGetBottomTabInnerLayoutDimensions = () => {
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  const { height : wholeScreenHeight, width : wholeScreenWeight } = useWindowDimensions();
  
  const tabBarHeight = useBottomTabBarHeight();

  return {
    innerLayoutHeight: wholeScreenHeight - tabBarHeight - headerHeight,
    innerLayoutWidth : wholeScreenWeight,
  };
};

export default useGetBottomTabInnerLayoutDimensions;