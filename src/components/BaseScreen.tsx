import styled from "styled-components/native";
import { DarkModeAppliedSafeAreaView, DarkModeAppliedText } from "./DarkModeAppliedStyledComponents";

const ChildCenteredContainer = styled(DarkModeAppliedSafeAreaView)`
  align-items: center;
  justify-content: center;
`;

type BaseScreenProps = {
  screenName: string;
};

const BaseScreen = ({screenName}:BaseScreenProps) => (
  <ChildCenteredContainer>
    <DarkModeAppliedText>
      {screenName}
    </DarkModeAppliedText>
  </ChildCenteredContainer>
);

export default BaseScreen;