type whereMonthType = "current" | "prev" | "next";
type animationWhereType = "prev" | "next";
type animationWhereWhichType = {
  where: "prev" | "next";
  which: "month" | "week";
};

export {
  whereMonthType,
  animationWhereType,
  animationWhereWhichType,
};