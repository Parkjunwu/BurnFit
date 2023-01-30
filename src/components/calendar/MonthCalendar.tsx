import EachCalendarPaddingContainer from "./EachCalendarPaddingContainer";
import renderDatesRow from "./renderDatesRow";

type MonthCalendarProps = {
  prevDateArr: JSX.Element[];
  currentDateArr: JSX.Element[];
  nextDateArr: JSX.Element[];
  selectedRow: number;
  setSelectedRow: React.Dispatch<React.SetStateAction<number>> | undefined;
  animatedWeekUpDown: {
    transform: {
        translateY: number;
    }[];
  };
  animatedOpacity: {
    opacity: number;
  };
};

const MonthCalendar = ({
  prevDateArr,
  currentDateArr,
  nextDateArr,
  selectedRow,
  setSelectedRow,
  animatedWeekUpDown,
  animatedOpacity,
}: MonthCalendarProps) => (
  <>
    <EachCalendarPaddingContainer>
      {renderDatesRow({
        datesArr:prevDateArr,
        whereMonth:"prev"
      })}
    </EachCalendarPaddingContainer>
    <EachCalendarPaddingContainer>
      {renderDatesRow({
        datesArr:currentDateArr,
        whereMonth:"current",
        selectedRow,
        setSelectedRow,
        animatedOpacity,
        animatedWeekUpDown,
      })}
    </EachCalendarPaddingContainer>
    <EachCalendarPaddingContainer>
      {renderDatesRow({
        datesArr:nextDateArr,
        whereMonth:"next"
      })}
    </EachCalendarPaddingContainer>
  </>
);

export default MonthCalendar;