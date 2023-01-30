import styled from "styled-components/native";
import { DarkModeAppliedText } from "../DarkModeAppliedStyledComponents";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../style/colors";
import { calendarPadding, rowHeight } from "../../constants/calendarConstants";

const padding = `${calendarPadding}px ${calendarPadding}px 0px ${calendarPadding}px `

const HeaderContainer = styled.View`
  flex-direction: row;
  height: ${rowHeight}px;
  align-items: center;
  padding: ${padding};
`;
const GoToPrevButton = styled.TouchableOpacity`

`;
const CurrentYearMonth = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const CurrentYearMonthText = styled(DarkModeAppliedText)`
  
`;
const GoToNextButton = styled.TouchableOpacity`

`;

type HeaderProps = {
  onPressGoToPrevButton: () => void;
  formatMonth: string;
  onPressGoToNextButton: () => void;
};

const CalendarHeader = ({
  onPressGoToPrevButton,
  formatMonth,
  onPressGoToNextButton,
}: HeaderProps) => (
  <HeaderContainer>
    <GoToPrevButton onPress={onPressGoToPrevButton}>
      <Ionicons name="chevron-back-sharp" color={colors.lightBlue} size={30} />
    </GoToPrevButton>
    <CurrentYearMonth>
      <CurrentYearMonthText>
        {formatMonth}
      </CurrentYearMonthText>
    </CurrentYearMonth>
    <GoToNextButton onPress={onPressGoToNextButton}>
      <Ionicons name="chevron-forward-sharp" color={colors.lightBlue} size={30} />
    </GoToNextButton>
  </HeaderContainer>
);

export default CalendarHeader;