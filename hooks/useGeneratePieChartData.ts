import { TToDo } from "@/app/shared/types";
import { TPieChartData } from "@/app/shared/types/pieChart";
import { useColors } from "../utils/uiUtils/themeUtils";

export const useGeneratePieChartData = (data: TToDo[]): TPieChartData => {
  const colors = useColors();
  const completedCount = data.filter((todo) => todo.completed).length;
  const uncompletedCount = data.length - completedCount;
  const completedPercentage = completedCount / data.length || 0;
  const uncompletedPercentage = uncompletedCount / data.length || 0;
  return [
    {
      id: "completed-todos",
      label: "completed",
      value: completedPercentage,
      color: colors.success,
    },
    {
      id: "uncompleted-todos",
      label: "uncompleted",
      value: uncompletedPercentage,
      color: colors.danger,
    },
  ];
};
