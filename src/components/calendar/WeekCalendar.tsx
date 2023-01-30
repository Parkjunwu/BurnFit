import EachCalendarPaddingContainer from "./EachCalendarPaddingContainer";
import RenderWeekCalendar from "./RenderWeekCalendar";

type WeekCalendarProps = {
  prevDateArr: JSX.Element[];
  currentDateArr: JSX.Element[];
  nextDateArr: JSX.Element[];
  selectedRow: number;
  thisMonthWeeks: number;
  previousMonthWeeks: number;
  thisMonthFirstDay: number;
  thisMonthLastDay: number;
};

const WeekCalendar = ({
  prevDateArr,
  currentDateArr,
  nextDateArr,
  selectedRow,
  thisMonthWeeks,
  previousMonthWeeks,
  thisMonthFirstDay,
  thisMonthLastDay,
}: WeekCalendarProps) => (
  <>
    <EachCalendarPaddingContainer>
      <RenderWeekCalendar
        datesArr={currentDateArr}
        selectedRow={selectedRow}
        prevDatesArr={prevDateArr}
        previousMonthWeeks={previousMonthWeeks}
        thisMonthFirstDay={thisMonthFirstDay}
        whereWeek={"prev"}
      />
    </EachCalendarPaddingContainer>
    <EachCalendarPaddingContainer>
      <RenderWeekCalendar
        datesArr={currentDateArr}
        selectedRow={selectedRow}
        whereWeek={"current"}
      />
    </EachCalendarPaddingContainer>
    <EachCalendarPaddingContainer>
      <RenderWeekCalendar
        datesArr={currentDateArr}
        selectedRow={selectedRow}
        nextDatesArr={nextDateArr}
        thisMonthWeeks={thisMonthWeeks}
        thisMonthLastDay={thisMonthLastDay}
        whereWeek={"next"}
      />
    </EachCalendarPaddingContainer>
  </>
);

export default WeekCalendar;