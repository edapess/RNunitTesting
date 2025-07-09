import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { EStorageKeys } from "@/constants/mmkvConstants";

import {
  createParentTestIDObjectKeys,
  createTestIDsObject,
} from "@/utils/createTestIDs";
import { useIsDark } from "@/utils/uiUtils/themeUtils";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import { Appearance, Switch, View } from "react-native";
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
  const { container, switchContainer } = useSettingsScreenStyles();
  const { setItem } = useAsyncStorage(EStorageKeys.appearance);

  const onChangeTheme = useCallback(() => {
    Appearance.setColorScheme(isDark ? "light" : "dark");
    setItem(isDark ? "light" : "dark");
  }, [isDark, setItem]);

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
          onChange={onChangeTheme}
          value={isDark}
        />
      </View>
    </ThemedView>
  );
}
