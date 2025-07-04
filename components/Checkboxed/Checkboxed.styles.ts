import { StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors, useColors } from "@/constants/Colors";

export const useCheckboxedStyles = () => {
  const colors = useColors();
  return StyleSheet.create({
    container: {
      padding: 16,
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
    },
    content: {
      color: colors.text,
    },
  });
};
