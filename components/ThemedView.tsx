import { View, type ViewProps } from "react-native";

import { useUiTheme } from "@/utils/uiUtils/themeUtils";

export type ThemedViewProps = ViewProps & {};

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const colors = useUiTheme();

  return (
    <View
      style={[{ backgroundColor: colors.background }, style]}
      {...otherProps}
    />
  );
}
