import { useMemo } from "react";
import { DefaultTheme } from "styled-components/native";
import useIsDarkMode from "./useIsDarkMode";

type useColorsChangedByDarkModeType = () => DefaultTheme;

const useColorsChangedByDarkMode: useColorsChangedByDarkModeType = () => {

  const isDarkMode = useIsDarkMode();

  const colors = useMemo(
    () => getColorsChangedByDarkMode(isDarkMode),
    [isDarkMode]
  );
  
  return colors;
};

export default useColorsChangedByDarkMode;


type getColorsChangedByDarkModeType = (isDarkMode:boolean) => DefaultTheme;

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