import styled from "styled-components/native";
import { DarkModeAppliedText } from "../../components/DarkModeAppliedStyledComponents";
import colors from "../../style/colors";

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
  border-color: ${colors.lightBlue};
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

type renderDatesProps = {
  thisMonthFirstDay: number;
  thisMonthLastDate: number;
  thisMonthLastDay: number;
  previousMonthLastDate: number;
  previousMonthLastDay: number;
  goToPrevMonth?: () => void;
  goToNextMonth?: () => void;
  selectedDate?: number | undefined
  setSelectedDate?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setSelectedRow?: React.Dispatch<React.SetStateAction<number>>;
  animatedOpacity?: {
    opacity: number;
  };
  animatedWeekUpDown?: {
    transform: {
        translateY: number;
    }[];
  };
};

const getRenderingDateArray = ({
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
}: renderDatesProps) => {
  const datesArr = [];

  const onPressPrevDate = (date:number) => {
    goToPrevMonth && goToPrevMonth();
    setSelectedDate && setSelectedDate(date);
    setSelectedRow && setSelectedRow(Math.floor((previousMonthLastDay + date - 1)/7));
  };

  const onPressCurrentMonthDate = (date:number) => {
    setSelectedDate && setSelectedDate(date);
    setSelectedRow && setSelectedRow(Math.floor((thisMonthFirstDay + date - 1)/7));
  }

  const onPressNextDate = (date:number) => {
    goToNextMonth && goToNextMonth();
    setSelectedDate && setSelectedDate(date);
    setSelectedRow && setSelectedRow(Math.floor((thisMonthLastDay + date)/7));
  };

  if(thisMonthFirstDay !== 0){
    const firstRenderedPrevMonthDate = previousMonthLastDate - thisMonthFirstDay + 1;
    for(let i = firstRenderedPrevMonthDate; i <= previousMonthLastDate; i++){
      datesArr.push(<Date key={i}>
        <NotCurrentMonthDatePressable onPress={()=>onPressPrevDate(i)}>
          <NotCurrentMonthDateText>{i}</NotCurrentMonthDateText>
        </NotCurrentMonthDatePressable>
      </Date>);
    }
  }
  for(let i = 1; i <= thisMonthLastDate; i++){
    datesArr.push(<Date key={i}>
      <CurrentMonthDatePressable onPress={()=>onPressCurrentMonthDate(i)} isSelected={selectedDate === i}>
        <CurrentMonthDateText>{i}</CurrentMonthDateText>
      </CurrentMonthDatePressable>
    </Date>);
  }
  const totalDates = 42; // 7*6
  const nextMonthRenderDateNumber = totalDates - thisMonthLastDate - thisMonthFirstDay;
  for(let i = 1; i <= nextMonthRenderDateNumber; i++){
    datesArr.push(<Date key={i}>
      <NotCurrentMonthDatePressable onPress={()=>onPressNextDate(i)}>
        <NotCurrentMonthDateText>{i}</NotCurrentMonthDateText>
      </NotCurrentMonthDatePressable>
    </Date>);
  }

  return datesArr;
};

export default getRenderingDateArray;