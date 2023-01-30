import { Moment } from "moment-timezone";

const getNecessaryMomentDate = (time: Moment) => {
  const previousMonth = time.clone().subtract(1,"months");
  const previous2Month = time.clone().subtract(2,"months");
  const nextMonth = time.clone().add(1,"months");

  const formatThisMonth = time.format("MMMM YYYY");
  const formatPrevMonth = previousMonth.format("MMMM YYYY");
  const formatNextMonth = nextMonth.format("MMMM YYYY");

  const previous2MonthLast = previous2Month.endOf('month');
  const previous2MonthLastDate = previous2MonthLast.date();
  const previous2MonthLastDay = previous2MonthLast.date();
  
  const previousMonthFirst = previousMonth.startOf('month');
  const previousMonthFirstDay = previousMonthFirst.day();
  const previousMonthFirstWeek = previousMonthFirst.week();
  const previousMonthLast = previousMonth.endOf('month');
  const previousMonthLastDate = previousMonthLast.date();
  const previousMonthLastDay = previousMonthLast.day();
  const previousMonthLastWeekNumber = previousMonthLast.week();
  const previousMonthLastWeek = previousMonthLastWeekNumber === 1 ? 53 : previousMonthLastWeekNumber;
  const previousMonthWeeks = previousMonthLastWeek - previousMonthFirstWeek + 1;

  const thisMonthLast = time.endOf('month');
  const thisMonthLastDate = thisMonthLast.date();
  const thisMonthLastDay = thisMonthLast.day();
  const thisMonthLastWeekNumber = thisMonthLast.week();
  const thisMonthLastWeek = thisMonthLastWeekNumber === 1 ? 53 : thisMonthLastWeekNumber;
  const thisMonthFirst = time.startOf('month');
  const thisMonthFirstDay = thisMonthFirst.day();
  const thisMonthFirstWeek = thisMonthFirst.week();
  const thisMonthWeeks = thisMonthLastWeek - thisMonthFirstWeek + 1;

  const nextMonthFirstDay = nextMonth.startOf('month').day();
  const nextMonthLast = nextMonth.endOf('month');
  const nextMonthLastDate = nextMonthLast.date();
  const nextMonthLastDay = nextMonthLast.day();

  return {
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
    nextMonthFirstDay,
    nextMonthLastDate,
    nextMonthLastDay,
  };
};

export default getNecessaryMomentDate;