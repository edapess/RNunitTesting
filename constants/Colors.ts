/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import { useColorScheme } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#2E3440", // darkest Polar Night
    background: "#ECEFF4", // lightest Snow Storm
    tint: "#5E81AC", // Nord Blue
    icon: "#4C566A", // subtle Polar Night
    tabIconDefault: "#4C566A",
    tabIconSelected: "#5E81AC",
    primary: "#88C0D0",
    secondary: "#81A1C1",
    success: "#A3BE8C",
    warning: "#EBCB8B",
    danger: "#BF616A",
    info: "#8FBCBB",
    border: "#D8DEE9",
    card: "#E5E9F0",
  },
  dark: {
    text: "#ECEFF4", // light Snow Storm
    background: "#2E3440", // darkest Polar Night
    tint: "#88C0D0", // Nord Cyan
    icon: "#D8DEE9", // soft Snow Storm
    tabIconDefault: "#D8DEE9",
    tabIconSelected: "#88C0D0",
    primary: "#5E81AC",
    secondary: "#81A1C1",
    success: "#A3BE8C",
    warning: "#EBCB8B",
    danger: "#BF616A",
    info: "#8FBCBB",
    border: "#4C566A",
    card: "#3B4252",
  },
};
export const useColors = () => {
  const colorScheme = useColorScheme() || "light";
  return Colors[colorScheme];
};
