import styled from "styled-components/native";
import { rowHeight } from "../../constants/calendarConstants";

const WeekCalendarHeightView = styled.View`
  height: ${rowHeight*6}px;
`;
const DatesRow = styled.View`
  flex-direction: row;
  height: ${rowHeight}px;
`;

type whereMonthType = "current" | "prev" | "next";
type whereWeekType = whereMonthType;

type RenderWeekCalendarProp = {
  prevDatesArr?: JSX.Element[];
  previousMonthWeeks?: number;
  datesArr: JSX.Element[];
  nextDatesArr?: JSX.Element[];
  thisMonthWeeks?: number;
  thisMonthFirstDay?: number;
  thisMonthLastDay?: number;
  selectedRow: number;
  whereWeek: whereWeekType;
};

const RenderWeekCalendar = ({
  prevDatesArr,
  previousMonthWeeks,
  datesArr,
  nextDatesArr,
  thisMonthWeeks,
  thisMonthFirstDay,
  thisMonthLastDay,
  selectedRow,
  whereWeek,
}: RenderWeekCalendarProp) => {
  let renderRow = 0;
  let renderData = datesArr;
  switch(whereWeek){
    case "prev":
      if(selectedRow === 0) {
        previousMonthWeeks && (renderRow = thisMonthFirstDay === 0 ? previousMonthWeeks - 1 : previousMonthWeeks - 2);
        prevDatesArr && (renderData = prevDatesArr);
      } else {
        renderRow = selectedRow - 1;
      }
      break;
    case "current":
      renderRow = selectedRow;
      break;
    case "next":
      if(thisMonthWeeks && selectedRow === thisMonthWeeks - 1) {
        renderRow = thisMonthLastDay === 6 ? 0 : 1;
        nextDatesArr && (renderData = nextDatesArr);
      } else {
        renderRow = selectedRow + 1;
      }
      break;
  }

  const startIndex = renderRow*7;
  
  return (
    <WeekCalendarHeightView>
      <DatesRow>
        {renderData.slice(startIndex,startIndex+7)}
      </DatesRow>
    </WeekCalendarHeightView>
  );
};

export default RenderWeekCalendar;