import { FC, useMemo } from "react";

import { TPieChartData, TPieChartItem } from "@/app/shared/types/pieChart";
import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useAnimatedPieChartStyles } from "./AnimatedPieChart.styles";

type TAnimatedDunot = {
  data?: TPieChartData;
  size?: number;
  strokeWidth?: number;
};
type TSegmentChart = {
  item: TPieChartItem;
  center: number;
  radius: number;
  strokeWidth: number;
  circumference: number;
  angle: number;
};
const SegmentChart: FC<TSegmentChart> = ({
  item,
  center,
  radius,
  strokeWidth,
  circumference,
  angle,
}) => {
  const segmentLength = (item.value / 100) * circumference;
  const gap = circumference - segmentLength;

  return (
    <Circle
      key={item.id}
      cy={center}
      cx={center}
      r={radius}
      strokeWidth={strokeWidth}
      stroke={item.color}
      strokeDasharray={`${segmentLength} ${gap}`}
      strokeDashoffset={0}
      originX={center}
      originY={center}
      fill="transparent"
      rotation={angle}
    />
  );
};
export const AnimatedPieChart: FC<TAnimatedDunot> = ({
  data,
  size = 200,
  strokeWidth = 20,
}) => {
  const { mainContainer } = useAnimatedPieChartStyles();
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = useMemo(
    () => data?.reduce((acc, item) => acc + item.value, 0) || 0,
    [data],
  );

  if (!total || !data?.length) {
    return null;
  }

  let cumulativeAngle = -90; // Start from top

  return (
    <View style={mainContainer}>
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const currentAngle = cumulativeAngle;
          cumulativeAngle += (item.value / total) * 360;

          return (
            <SegmentChart
              key={item.id || index}
              item={{
                ...item,
                value: percentage,
              }}
              center={center}
              radius={radius}
              strokeWidth={strokeWidth}
              circumference={circumference}
              angle={currentAngle}
            />
          );
        })}
      </Svg>
    </View>
  );
};
