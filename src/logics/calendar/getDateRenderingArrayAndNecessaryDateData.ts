import { Moment } from "moment-timezone";
import getNecessaryMomentDate from "./getNecessaryMomentDate";
import getRenderingDateArray from "./getRenderingDateArray";

type getNecessaryDataType = {
  time: Moment;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  selectedDate: number | undefined
  setSelectedDate: React.Dispatch<React.SetStateAction<number | undefined>>;
  setSelectedRow: React.Dispatch<React.SetStateAction<number>>;
  animatedOpacity: {
    opacity: number;
  };
  animatedWeekUpDown: {
    transform: {
        translateY: number;
    }[];
  };
};

const getRenderingDateArrayAndNecessaryDateData = ({
  time,
  goToPrevMonth,
  goToNextMonth,
  selectedDate,
  setSelectedDate,
  setSelectedRow,
  animatedOpacity,
  animatedWeekUpDown,
}: getNecessaryDataType) => {

  const {
    formatThisMonth,
    formatPrevMonth,
    formatNextMonth,
    previous2MonthLastDate,
    previous2MonthLastDay,
    previousMonthWeeks,
    previousMonthLastDate,
    previousMonthLastDay,
    previousMonthFirstDay,
    thisMonthWeeks,
    thisMonthFirstDay,
    thisMonthLastDate,
    thisMonthLastDay,
    nextMonthLastDate,
    nextMonthLastDay,
    nextMonthFirstDay,
  } = getNecessaryMomentDate(time);

  const prevDateArr = getRenderingDateArray({
    thisMonthFirstDay: previousMonthFirstDay,
    thisMonthLastDate: previousMonthLastDate,
    thisMonthLastDay: previousMonthLastDay,
    previousMonthLastDate: previous2MonthLastDate,
    previousMonthLastDay: previous2MonthLastDay,
  });
  const currentDateArr = getRenderingDateArray({
    thisMonthFirstDay,
    thisMonthLastDate,
    thisMonthLastDay,
    previousMonthLastDate,
    previousMonthLastDay,
    goToPrevMonth,
    goToNextMonth,
    selectedDate,
    setSelectedDate,
    setSelectedRow,
    animatedOpacity,
    animatedWeekUpDown,
  });
  const nextDateArr = getRenderingDateArray({
    thisMonthFirstDay: nextMonthFirstDay,
    thisMonthLastDate: nextMonthLastDate,
    thisMonthLastDay: nextMonthLastDay,
    previousMonthLastDate: thisMonthLastDate,
    previousMonthLastDay: thisMonthLastDay,
  });

  return {
    formatThisMonth,
    formatPrevMonth,
    formatNextMonth,
    previousMonthWeeks,
    thisMonthWeeks,
    thisMonthFirstDay,
    thisMonthLastDay,
    prevDateArr,
    currentDateArr,
    nextDateArr,
  };
};

export default getRenderingDateArrayAndNecessaryDateData;