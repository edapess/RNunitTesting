import { useColors } from "@/utils/uiUtils/themeUtils";
import { StyleSheet } from "react-native";

export const useAnimatedPieChartStyles = () => {
  const colors = useColors();
  return StyleSheet.create({
    mainContainer: {
      height: 200,
      width: 200,
      justifyContent: "center",
      alignItems: "center",
    },
  });
};
