import styled from "styled-components/native";
import { calendarPadding, rowHeight } from "../../constants/calendarConstants";
import colors from "../../style/colors";

const weekPadding = `0px ${calendarPadding}px`;

const Container = styled.View`
  flex-direction: row;
  height: ${rowHeight}px;
  padding: ${weekPadding};
`;
const DayOfWeek = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const DayOfWeekText = styled.Text<{index:number}>`
  color: ${({index,theme:{textColor}}) =>
    index === 0 ?
        "red"
      :
        index === 6 ? colors.lightBlue : textColor
  };
`;

const dayArr = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const renderDayOfWeekArray = () => {
  const dayViewArr = [];
  for(let i = 0; i < dayArr.length; i++){
    dayViewArr.push(<DayOfWeek key={i}>
      <DayOfWeekText index={i}>{dayArr[i]}</DayOfWeekText>
    </DayOfWeek>);
  }
  return dayViewArr;
};

const DayOfWeekList = () => (
  <Container>
    {renderDayOfWeekArray()}
  </Container>
);

export default DayOfWeekList;