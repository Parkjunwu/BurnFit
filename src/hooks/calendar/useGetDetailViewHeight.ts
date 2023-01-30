import { useMemo } from "react";
import { calendarPadding, rowHeight } from "../../constants/calendarConstants";
import useGetBottomTabInnerLayoutDimensions from "../useGetBottomTabInnerLayoutDimensions";

const monthCalendarHeight = calendarPadding*2 + rowHeight*8;
const weekCalendarHeight = calendarPadding*2 + rowHeight*3;

const useGetDetailViewHeight = () => {

  const { innerLayoutHeight } = useGetBottomTabInnerLayoutDimensions();

  const detailHeights = useMemo(
    () => getNecessaryHeight({
      innerLayoutHeight,
    }),
    [innerLayoutHeight]
  );

  return detailHeights;
};

export default useGetDetailViewHeight;


type getNecessaryHeightProps = {
  innerLayoutHeight: number;
};

const getNecessaryHeight = ({
  innerLayoutHeight,
}: getNecessaryHeightProps) => {

  const halfOfInnerLayoutHeight = innerLayoutHeight / 2;

  const upPositionHeight = halfOfInnerLayoutHeight - (innerLayoutHeight - weekCalendarHeight);
  const downPositionHeight = halfOfInnerLayoutHeight - (innerLayoutHeight - monthCalendarHeight);
  const centerHeight = (upPositionHeight - downPositionHeight)/2;

  return{
    upPositionHeight,
    downPositionHeight,
    centerHeight,
  };
};