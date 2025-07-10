import { mockedTodosData } from "@/__mocks__/mockedData";
import { useColors } from "@/utils/uiUtils/themeUtils";
import { useGeneratePieChartData } from "../useGeneratePieChartData";

describe("useGeneratePieChartData", () => {
  it("should return pie chart data with correct values", () => {
    const colors = useColors();

    const expectedData = [
      {
        id: "completed-todos",
        label: "completed",
        value: 0.5,
        color: colors.success,
      },
      {
        id: "uncompleted-todos",
        label: "uncompleted",
        value: 0.5,
        color: colors.danger,
      },
    ];

    const result = useGeneratePieChartData(mockedTodosData.todos);

    expect(result).toEqual(expectedData);
  });
});
