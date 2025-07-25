import { useUiTheme } from "@/utils/uiUtils/themeUtils";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useHomeScreenStyles = () => {
  const insets = useSafeAreaInsets();
  const colors = useUiTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: insets.bottom + 48,
      backgroundColor: colors.background,
    },
  });
};

export const useSettingsScreenStyles = () => {
  const colors = useUiTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      rowGap: 16,
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.card,
      paddingVertical: 16,
      paddingHorizontal: 8,
      borderRadius: 8,
    },
  });
};
