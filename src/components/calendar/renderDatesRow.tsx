import Animated from "react-native-reanimated";
import DatesRow from "./DatesRow";

type renderDatesRowProps = {
  datesArr: JSX.Element[];
  whereMonth: string;
  selectedRow?: number;
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

const renderDatesRow = ({
  datesArr,
  whereMonth,
  selectedRow,
  animatedOpacity,
  animatedWeekUpDown,
}: renderDatesRowProps) => {
  const datesRowArr = [];
  if(whereMonth === "current") {
    for(let i = 0; i < 6; i++){
      const startIndex = i*7;
      datesRowArr.push(
        <Animated.View key={i} style={selectedRow === i ? animatedWeekUpDown : animatedOpacity}>
          <DatesRow>
            {datesArr.slice(startIndex,startIndex+7)}
          </DatesRow>
        </Animated.View>
      );
    }
  } else {
    for(let i = 0; i < 6; i++){
      const startIndex = i*7;
      datesRowArr.push(
        <DatesRow key={i}>
          {datesArr.slice(startIndex,startIndex+7)}
        </DatesRow>
      );
    }
  }
  return datesRowArr;
};

export default renderDatesRow;