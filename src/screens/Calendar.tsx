import { useMemo, useRef, useState } from "react";
import styled from "styled-components/native";
import { DarkModeAppliedSafeAreaView } from "../components/DarkModeAppliedStyledComponents";
import momentSeoulTZ from "../logics/momentSeoul/momentSeoulTZ";
import CalendarHeader from "../components/calendar/CalendarHeader";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Extrapolation, interpolate, runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import useGetDetailViewHeight from "../hooks/calendar/useGetDetailViewHeight";
import { rowHeight } from "../constants/calendarConstants";
import { useWindowDimensions } from "react-native";
import DetailView from "../components/calendar/DetailView";
import DayOfWeekList from "../components/calendar/DayOfWeekList";
import getRenderingDateArrayAndNecessaryDateData from "../logics/calendar/getDateRenderingArrayAndNecessaryDateData";
import MonthCalendar from "../components/calendar/MonthCalendar";
import WeekCalendar from "../components/calendar/WeekCalendar";
import { animationWhereWhichType, animationWhereType, whereMonthType } from "../type/calendarType";
import AnimatedCalendarHOC from "../components/calendar/AnimatedCalendarHOC";
import AnimatedDetailViewHOC from "../components/calendar/AnimatedDetailViewHOC";

const CalendarContainer = styled.View`
  
`;
const Dates = styled.View`
  position: relative;
`;

const today = momentSeoulTZ();

const Calendar = () => {
  
  const [currentMonth,setCurrentMonth] = useState(today.month());
  const currentYear = useRef(today.year());
  const currentMoment = useRef(today);
  const [selectedDate,setSelectedDate] = useState<number|undefined>();

  const [selectedRow,setSelectedRow] = useState(0);

  const { height : wholeScreenHeight, width : wholeScreenWeight } = useWindowDimensions();

  const {
    upPositionHeight,
    downPositionHeight,
    centerHeight,
  } = useGetDetailViewHeight();

  const detailViewOnDownPosition = useSharedValue(true);

  const [isMonthCalendar,setIsMonthCalendar] = useState(true);

  const isMonthCalendarStateChangeTo = (monthState:boolean) => setIsMonthCalendar(monthState); // runOnJS 위한 애

  const detailViewPosition = useSharedValue(downPositionHeight);

  const updateDetailViewPosition = (panPosition:number) => {
    'worklet';
    if(panPosition >= upPositionHeight && panPosition <= downPositionHeight) {
      detailViewPosition.value = panPosition;
    } else if (panPosition < upPositionHeight) {
      detailViewPosition.value = upPositionHeight;
    } else {
      detailViewPosition.value = downPositionHeight;
    }
  };

  const detailViewPanGesture = Gesture.Pan()
    .onBegin(() => runOnJS(isMonthCalendarStateChangeTo)(true))
    .onUpdate((e) => detailViewOnDownPosition.value ?
        updateDetailViewPosition(downPositionHeight + e.translationY)
      :
        updateDetailViewPosition(upPositionHeight + e.translationY)
    )
    .onEnd((e) => detailViewPosition.value < centerHeight ? 
        detailViewPosition.value = withTiming(upPositionHeight, { duration: 300 },()=>{
          detailViewOnDownPosition.value = false;
          runOnJS(isMonthCalendarStateChangeTo)(false);
        })
      :
        detailViewPosition.value = withTiming(downPositionHeight, { duration: 300 },()=>{
          detailViewOnDownPosition.value = true;
        })
    );

  const animatedMainUpDown = useAnimatedStyle(() => ({
    transform: [{ translateY: detailViewPosition.value }],
  }));

  const animatedWeekUpDown = useAnimatedStyle(() => {
    const translateY = interpolate(
      detailViewPosition.value,
      [ upPositionHeight, downPositionHeight ],
      [ -(rowHeight*selectedRow), 0 ],
      { extrapolateRight: Extrapolation.CLAMP }
    );

    return {
      transform: [{ translateY }],
    };
  });

  const animatedOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      detailViewPosition.value,
      [ upPositionHeight, downPositionHeight ],
      [ 0, 1 ],
      { extrapolateRight: Extrapolation.CLAMP }
    );

    return { opacity };
  });



  const goToPrevMonth = () => {
    const newMoment = currentMoment.current.subtract(1,"month");
    currentYear.current = newMoment.year();
    setCurrentMonth(newMoment.month());
  };
  const goToNextMonth = () => {
    const newMoment = currentMoment.current.add(1,"month");
    currentYear.current = newMoment.year();
    setCurrentMonth(newMoment.month());
  };

  const goToPrevWeek = () => {
    if(selectedRow === 0) {
      goToPrevMonth();
      setSelectedRow(thisMonthFirstDay === 0 ? previousMonthWeeks - 1 : previousMonthWeeks - 2);
      setSelectedDate(undefined);
    } else {
      setSelectedRow(prev => prev - 1);
    }
  };
  const goToNextWeek = () => {
    if(selectedRow === thisMonthWeeks - 1) {
      goToNextMonth();
      setSelectedRow(thisMonthLastDay === 6 ? 0 : 1);
      setSelectedDate(undefined);
    } else {
      setSelectedRow(prev => prev + 1);
    }
  };

  const {
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
  } = useMemo(
    ()=>getRenderingDateArrayAndNecessaryDateData({
      time: today,
      goToPrevMonth,
      goToNextMonth,
      selectedDate,
      setSelectedDate,
      setSelectedRow,
      animatedOpacity,
      animatedWeekUpDown,
    }),
    [currentMonth, selectedDate, selectedRow]
  );

  const calendarPosition = useSharedValue(-wholeScreenWeight);
  const monthCalendarWhereMonth = useSharedValue<whereMonthType>("current");

  const [whereMonth,setWhereMonth] = useState<whereMonthType>("current");
  const showYearMonth = whereMonth === "current" ? formatThisMonth : whereMonth === "prev" ? formatPrevMonth : formatNextMonth;

  const changeShowYearMonth = (where:whereMonthType) => setWhereMonth(where);

  useDerivedValue(() => {
    runOnJS(changeShowYearMonth)(monthCalendarWhereMonth.value)
  }, [monthCalendarWhereMonth]);

  const currentYearMonthChange = (where:animationWhereType) => {
    where === "prev" ? goToPrevMonth() : goToNextMonth();
    setWhereMonth("current")
    setSelectedDate(undefined);
    calendarPosition.value = -wholeScreenWeight
  };

  const currentYearMonthWeekChange = (where:animationWhereType) => {
    where === "prev" ? goToPrevWeek() : goToNextWeek();
    setWhereMonth("current");
    calendarPosition.value = -wholeScreenWeight;
  };

  const calendarAnimationNeedWhereAndWhich = ({
    where,
    which
  }: animationWhereWhichType) => {
    'worklet'
    const isMonth = which === "month";
    const toMovePosition = where === "prev" ? 0 : -wholeScreenWeight*2;
    isMonth && (monthCalendarWhereMonth.value = where);
    calendarPosition.value = withTiming(toMovePosition, { duration: 300 },()=>{
      runOnJS(isMonth ? currentYearMonthChange : currentYearMonthWeekChange)(where)
    });
  };

  const monthCalendarPanGesture = Gesture.Pan()
    .onUpdate((e) => {
      calendarPosition.value = -wholeScreenWeight + e.translationX;
      if(calendarPosition.value > -wholeScreenWeight/2) {
        monthCalendarWhereMonth.value = "prev";
      } else if (calendarPosition.value < -wholeScreenWeight/2*3) {
        monthCalendarWhereMonth.value = "next";
      } else {
        monthCalendarWhereMonth.value = "current";
      }
    })
    .onEnd((e) => {
      if (calendarPosition.value > -wholeScreenWeight/2) {
        calendarAnimationNeedWhereAndWhich({
          where:"prev",
          which:"month",
        });
      } else if (calendarPosition.value < -wholeScreenWeight/2*3) {
        calendarAnimationNeedWhereAndWhich({
          where:"next",
          which:"month",
        });
      } else {
        calendarPosition.value = withTiming(-wholeScreenWeight, { duration: 300 });
      }
    });
    
  const weekCalendarPanGesture = Gesture.Pan()
    .onUpdate((e) => {
      calendarPosition.value = -wholeScreenWeight + e.translationX;
      if(selectedRow === 0) {
        if(calendarPosition.value > -wholeScreenWeight/2) {
          monthCalendarWhereMonth.value = "prev";
        }
      } else if (selectedRow === thisMonthWeeks - 1) {
        if (calendarPosition.value < -wholeScreenWeight/2*3) {
          monthCalendarWhereMonth.value = "next";
        }
      } else {
        monthCalendarWhereMonth.value = "current";
      }
    })
    .onEnd((e) => {
      if (calendarPosition.value > -wholeScreenWeight/2) {
        calendarAnimationNeedWhereAndWhich({
          where:"prev",
          which:"week",
        });
      } else if (calendarPosition.value < -wholeScreenWeight/2*3) {
        calendarAnimationNeedWhereAndWhich({
          where:"next",
          which:"week",
        });
      } else {
        calendarPosition.value = withTiming(-wholeScreenWeight, { duration: 300 });
      }
    });

  const animatedCalendarPosition = useAnimatedStyle(() => ({
    transform: [{ translateX: calendarPosition.value }],
  }));

  const onPressGoToPrevButton = () => calendarAnimationNeedWhereAndWhich({
    where: "prev",
    which: isMonthCalendar ? "month" : "week",
  });
  const onPressGoToNextButton = () => calendarAnimationNeedWhereAndWhich({
    where: "next",
    which: isMonthCalendar ? "month" : "week",
  });

  return (
    <DarkModeAppliedSafeAreaView>
      <CalendarContainer>
        <CalendarHeader
          onPressGoToPrevButton={onPressGoToPrevButton}
          formatMonth={showYearMonth}
          onPressGoToNextButton={onPressGoToNextButton}
        />
        <DayOfWeekList/>
        <Dates>
          {isMonthCalendar ?
            <GestureDetector gesture={monthCalendarPanGesture}>
              <AnimatedCalendarHOC
                wholeScreenWeight={wholeScreenWeight}
                animatedCalendarPosition={animatedCalendarPosition}
              >
                <MonthCalendar
                  prevDateArr={prevDateArr}
                  currentDateArr={currentDateArr}
                  nextDateArr={nextDateArr}
                  selectedRow={selectedRow}
                  setSelectedRow={setSelectedRow}
                  animatedWeekUpDown={animatedWeekUpDown}
                  animatedOpacity={animatedOpacity}
                />
              </AnimatedCalendarHOC>
            </GestureDetector>
          :
            <GestureDetector gesture={weekCalendarPanGesture}>
              <AnimatedCalendarHOC
                wholeScreenWeight={wholeScreenWeight}
                animatedCalendarPosition={animatedCalendarPosition}
              >
                <WeekCalendar
                  prevDateArr={prevDateArr}
                  currentDateArr={currentDateArr}
                  nextDateArr={nextDateArr}
                  selectedRow={selectedRow}
                  thisMonthWeeks={thisMonthWeeks}
                  previousMonthWeeks={previousMonthWeeks}
                  thisMonthFirstDay={thisMonthFirstDay}
                  thisMonthLastDay={thisMonthLastDay}
                />
              </AnimatedCalendarHOC>
            </GestureDetector>
          }
        </Dates>
      </CalendarContainer>
      <GestureDetector gesture={detailViewPanGesture}>
        <AnimatedDetailViewHOC
          wholeScreenHeight={wholeScreenHeight}
          animatedMainUpDown={animatedMainUpDown}
        >
          <DetailView/>
        </AnimatedDetailViewHOC>
      </GestureDetector>
    </DarkModeAppliedSafeAreaView>
  );
};

export default Calendar;