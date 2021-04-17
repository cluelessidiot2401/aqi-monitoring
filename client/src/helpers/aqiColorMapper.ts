import CSS from "csstype";
export const getCSSStyle = (aqi: number): CSS.Properties => {
  const colorArray: string[] = [
    "#55A84F",
    "#A3C853",
    "#FFF833",
    "#F29C33",
    "#E93F33",
    "#AF2D24",
  ];
  const aqiRange: number[] = [0, 51, 101, 201, 301, 401];

  for (let i = aqiRange.length - 1; i >= 0; --i) {
    if (aqi >= aqiRange[i])
      return {
        backgroundColor: colorArray[i],
      };
  }
  return {
    backgroundColor: colorArray[0],
  };
};
