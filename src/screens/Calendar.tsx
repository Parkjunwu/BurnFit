import { Moment } from "moment-timezone";
import { useMemo, useRef, useState } from "react";
import styled from "styled-components/native";
import { DarkModeAppliedSafeAreaView } from "../components/DarkModeAppliedStyledComponents";
import momentSeoulTZ from "../logics/momentSeoul/momentSeoulTZ";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DarkModeAppliedText } from "../components/DarkModeAppliedStyledComponents";

const lightBlue = "rgb(0, 150, 255)";

const Container = styled.View`
  padding: 10px;
  flex: 1;
`;
const MarginContainer = styled.View`
  height: 10px;
`;
const Header = styled.View`
  flex-direction: row;
`;
const GoToPrevMonthBtn = styled.TouchableOpacity`

`;
const CurrentYearMonth = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const CurrentYearMonthText = styled(DarkModeAppliedText)`
  
`;
const GoToNextMonthBtn = styled.TouchableOpacity`

`;
const DaysOfWeek = styled.View`
  flex-direction: row;
`;
const Day = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const DayText = styled.Text<{index:number}>`
  color: ${({index,theme:{textColor}}) => index === 0 ? "red" : index === 6 ? lightBlue : textColor };
`;
const Dates = styled.View`
  
`;
const DatesRow = styled.View`
  flex-direction: row;
`;
const Date = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const CurrentMonthDatePressable = styled.TouchableOpacity<{isSelected:boolean}>`
  width: 30px;
  height: 30px;
  border-radius: 20px;
  margin: 5px;
  align-items: center;
  justify-content: center;
  border-width: ${({isSelected})=>isSelected ? "1px" : "0px"};
  border-color: ${lightBlue};
`;
const CurrentMonthDateText = styled(DarkModeAppliedText)`
  
`;
const NotCurrentMonthDatePressable = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 20px;
  margin: 5px;
  align-items: center;
  justify-content: center;
`;
const NotCurrentMonthDateText = styled.Text`
  color: grey;
`;

const today = momentSeoulTZ();

const Calendar = () => {
  
  const [currentMonth,setCurrentMonth] = useState(today.month());
  const currentYear = useRef(today.year());
  const currentMoment = useRef(today);
  const [selectedDate,setSelectedDate] = useState<number|undefined>();

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
  
  const {
    formatMonth,
    thisMonthFirstDay,
    thisMonthLastDate,
    thisMonthLastDay,
    previousMonthLastDate,
  } = useMemo(
    ()=>getNecessaryDate(momentSeoulTZ(`${currentYear.current}-${String(currentMonth+1).padStart(2,'0')}`)),
    [currentMonth]
  );

  const onPressGoToPrevMonth = () => {
    goToPrevMonth();
    setSelectedDate(undefined);
  };
  const onPressGoToNextMonth = () => {
    goToNextMonth();
    setSelectedDate(undefined);
  };

  return (
    <DarkModeAppliedSafeAreaView>
      <Container>
        <Header>
          <GoToPrevMonthBtn onPress={onPressGoToPrevMonth}>
            <Ionicons name="chevron-back-sharp" color={lightBlue} size={30} />
          </GoToPrevMonthBtn>
          <CurrentYearMonth>
            <CurrentYearMonthText>
              {formatMonth}
            </CurrentYearMonthText>
          </CurrentYearMonth>
          <GoToNextMonthBtn onPress={onPressGoToNextMonth}>
            <Ionicons name="chevron-forward-sharp" color={lightBlue} size={30} />
          </GoToNextMonthBtn>
        </Header>
        <MarginContainer/>
        <DaysOfWeek>
          {renderDayArray()}
        </DaysOfWeek>
        <MarginContainer/>
        <Dates>
          {renderDatesRow({
            thisMonthFirstDay,
            thisMonthLastDate,
            thisMonthLastDay,
            previousMonthLastDate,
            goToPrevMonth,
            goToNextMonth,
            setSelectedDate,
            selectedDate,
          })}
        </Dates>
      </Container>
    </DarkModeAppliedSafeAreaView>
  );
};

export default Calendar;


const dayArr = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const renderDayArray = () => {
  const dayViewArr = [];
  for(let i = 0; i < dayArr.length; i++){
    dayViewArr.push(<Day key={i}>
      <DayText index={i}>{dayArr[i]}</DayText>
    </Day>)
  }
  return dayViewArr;
};

const getNecessaryDate = (time: Moment) => {
  const formatMonth = time.format("MMMM YYYY");
  const thisMonthFirst = time.startOf('month');
  const thisMonthFirstDay = thisMonthFirst.day();
  const thisMonthLast = time.endOf('month');
  const thisMonthLastDate = thisMonthLast.date();
  const thisMonthLastDay = thisMonthLast.day();
  const previousMonthLastDate = time.clone().subtract(1,"months").endOf('month').date();

  return {
    formatMonth,
    thisMonthFirstDay,
    thisMonthLastDate,
    thisMonthLastDay,
    previousMonthLastDate,
  };
};


type renderDatesRowProps = {
  thisMonthFirstDay: number;
  thisMonthLastDate: number;
  thisMonthLastDay: number;
  previousMonthLastDate: number;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  selectedDate: number | undefined
  setSelectedDate: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const renderDatesRow = (props: renderDatesRowProps) => {
  const datesRowArr = [];
  const datesArr = getDatesArr(props);
  const thisMonthWeeksNumber = datesArr.length / 7;
  for(let i = 0; i < thisMonthWeeksNumber; i++){
    const startIndex = i*7;
    datesRowArr.push(<DatesRow key={i}>
      {datesArr.slice(startIndex,startIndex+7)}
    </DatesRow>)
  }

  return datesRowArr;
};


type renderDatesProps = renderDatesRowProps;

const getDatesArr = ({
  thisMonthFirstDay,
  thisMonthLastDate,
  thisMonthLastDay,
  previousMonthLastDate,
  goToPrevMonth,
  goToNextMonth,
  selectedDate,
  setSelectedDate,
}: renderDatesProps) => {
  const datesArr = [];

  const onPressPrevDate = (date:number) => {
    goToPrevMonth();
    setSelectedDate(date);
  };

  const onPressCurrentMonthDate = (date:number) => setSelectedDate(date);

  const onPressNextDate = (date:number) => {
    goToNextMonth();
    setSelectedDate(date);
  };

  if(thisMonthFirstDay !== 0){
    const firstRenderedPrevMonthDate = previousMonthLastDate - thisMonthFirstDay + 1;
    for(let i = firstRenderedPrevMonthDate; i <= previousMonthLastDate; i++){
      datesArr.push(<Date key={i}>
        <NotCurrentMonthDatePressable onPress={()=>onPressPrevDate(i)}>
          <NotCurrentMonthDateText>{i}</NotCurrentMonthDateText>
        </NotCurrentMonthDatePressable>
      </Date>)
    }
  }
  for(let i = 1; i <= thisMonthLastDate; i++){
    datesArr.push(<Date key={i}>
      <CurrentMonthDatePressable onPress={()=>onPressCurrentMonthDate(i)} isSelected={selectedDate === i}>
        <CurrentMonthDateText>{i}</CurrentMonthDateText>
      </CurrentMonthDatePressable>
    </Date>)
  }
  if(thisMonthLastDay !== 6){
    const nextMonthRenderDateNumber = 6 - thisMonthLastDay;
    for(let i = 1; i <= nextMonthRenderDateNumber; i++){
      datesArr.push(<Date key={i}>
        <NotCurrentMonthDatePressable onPress={()=>onPressNextDate(i)}>
          <NotCurrentMonthDateText>{i}</NotCurrentMonthDateText>
        </NotCurrentMonthDatePressable>
      </Date>)
    }
  }

  return datesArr;
};