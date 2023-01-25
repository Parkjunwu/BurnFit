import styled, { css } from "styled-components/native";

const viewBaseProps = css`
  flex: 1;
  background-color: ${({theme:{backgroundColor}})=>backgroundColor};
`;
const textBaseProps = css`
  color: ${({theme:{textColor}})=>textColor};
`;

const DarkModeAppliedSafeAreaView = styled.SafeAreaView`
  ${viewBaseProps}
`;
const DarkModeAppliedView = styled.View`
  ${viewBaseProps}
`;
const DarkModeAppliedText = styled.Text`
  ${textBaseProps}
`;
const DarkModeAppliedTextInput = styled.TextInput`
  ${textBaseProps}
`;

export {
  DarkModeAppliedSafeAreaView,
  DarkModeAppliedView,
  DarkModeAppliedText,
  DarkModeAppliedTextInput,
};