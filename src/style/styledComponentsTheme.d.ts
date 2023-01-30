import 'styled-components/native';;

declare module 'styled-components/native' {
  export interface DefaultTheme {
    backgroundColor: string;
    textColor: string;
    borderTopColor: string;
    tabBarActiveTintColor: string;
  }
};