import { AnimatedPieChart } from "@/components/AnimatedDonutChart/AnimatedPieChart";
import { Collapsible } from "@/components/Collapsible";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGeneratePieChartData } from "@/hooks/useGeneratePieChartData";
import { useAppSelector } from "@/hooks/useRedux";
import {
  createParentTestIDObjectKeys,
  createTestIDsObject,
} from "@/utils/createTestIDs";
import { useIsDark, useThemeContext } from "@/utils/uiUtils/themeUtils";
import { useCallback } from "react";
import { Switch, View } from "react-native";
import {
  selectCompletedTodos,
  selectTodos,
  selectTotalTodosCount,
} from "../store/slices/todos/selectors";
import { useSettingsScreenStyles } from "./styles";

export const settingsScreenTestIds = createTestIDsObject(
  "SettingsScreen",
  createParentTestIDObjectKeys(
    "container",
    "switchContainer",
    "text",
    "switch",
    "completedTodosText",
  ),
);

export default function SettingsScreen() {
  const isDark = useIsDark();
  const { setTheme } = useThemeContext();
  const { container, switchContainer } = useSettingsScreenStyles();
  const todos = useAppSelector(selectTodos);
  const completedTodos = useAppSelector(selectCompletedTodos);
  const totalTodosCount = useAppSelector(selectTotalTodosCount);
  const pieChartData = useGeneratePieChartData(todos);
  const onChangeTheme = useCallback(
    (value: boolean) => {
      const newTheme = value ? "dark" : "light";
      setTheme(newTheme);
    },
    [setTheme],
  );

  return (
    <ThemedView
      style={container}
      testID={settingsScreenTestIds.container.testID}
    >
      <View
        style={switchContainer}
        testID={settingsScreenTestIds.switchContainer.testID}
      >
        <ThemedText
          testID={settingsScreenTestIds.text.testID}
        >{`Turn ${isDark ? "Off" : "On"} Dark mode`}</ThemedText>
        <Switch
          testID={settingsScreenTestIds.switch.testID}
          onValueChange={onChangeTheme}
          value={isDark}
        />
      </View>
      <AnimatedPieChart data={pieChartData} />
      <Collapsible title="Completed Todos">
        <ThemedText
          testID={settingsScreenTestIds.completedTodosText.testID}
        >{`You have completed ${completedTodos.length} out of ${totalTodosCount} todos.`}</ThemedText>
      </Collapsible>
    </ThemedView>
  );
}
