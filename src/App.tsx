import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNav from './navigators/MainNav';
import { DefaultTheme, ThemeProvider } from 'styled-components/native';
import useColorsChangedByDarkMode from './hooks/useColorsChangedByDarkMode';
import 'react-native-gesture-handler';

const App = () => {

  const colorsChangedByDarkMode = useColorsChangedByDarkMode();

  const theme: DefaultTheme = { ...colorsChangedByDarkMode };

  return (
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <MainNav/>
        </ThemeProvider>
      </NavigationContainer>
  );
};

export default App;