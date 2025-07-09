import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  createParentTestIDObjectKeys,
  createTestIDsObject,
} from "@/utils/createTestIDs";
import { useIsDark, useThemeContext } from "@/utils/uiUtils/themeUtils";
import { useCallback } from "react";
import { Switch, View } from "react-native";
import { useSettingsScreenStyles } from "./styles";

export const settingsScreenTestIds = createTestIDsObject(
  "SettingsScreen",
  createParentTestIDObjectKeys(
    "container",
    "switchContainer",
    "text",
    "switch",
  ),
);

export default function SettingsScreen() {
  const isDark = useIsDark();
  const { setTheme } = useThemeContext();
  const { container, switchContainer } = useSettingsScreenStyles();

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
    </ThemedView>
  );
}
