import { useUiTheme } from "@/utils/uiUtils/themeUtils";
import { StyleSheet } from "react-native";

export const useCheckboxedStyles = () => {
  const colors = useUiTheme();
  return StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: colors.secondary,
      borderRadius: 8,
    },
    checkBox: {
      borderWidth: 1,
      height: 20,
      width: 20,
      borderRadius: 4,
    },
    selectedCheckbox: {
      backgroundColor: colors.primary,
    },
    pressable: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: 16,
      width: "80%",
    },
    content: {
      color: colors.text,
    },
  });
};
