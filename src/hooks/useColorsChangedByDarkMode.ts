import { useMemo } from "react";
import useIsDarkMode from "./useIsDarkMode";

type colorList = {
  backgroundColor: string;
  textColor: string;
  borderTopColor: string;
  tabBarActiveTintColor: string;
};

type useColorsChangedByDarkModeType = () => colorList;

const useColorsChangedByDarkMode: useColorsChangedByDarkModeType = () => {

  const isDarkMode = useIsDarkMode();

  // useMemo 쓰던지
  const colors = useMemo(
    () => getColorsChangedByDarkMode(isDarkMode),
    [isDarkMode]
  );
  
  return colors;
};

export default useColorsChangedByDarkMode;


type getColorsChangedByDarkModeType = (isDarkMode:boolean) => colorList;

const getColorsChangedByDarkMode: getColorsChangedByDarkModeType = (isDarkMode) => isDarkMode ?
    {
      backgroundColor: "black",
      textColor: "white",
      borderTopColor: "rgba(255,255,255,0.5)",
      tabBarActiveTintColor: "white",
    }
  :
    {
      backgroundColor: "white",
      textColor: "black",
      borderTopColor: "rgba(0,0,0,0.5)",
      tabBarActiveTintColor: "rgba(0,0,0,0.7)",
    };