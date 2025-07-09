import { Colors } from "@/constants/Colors";
import { EStorageKeys } from "@/constants/mmkvConstants";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Appearance, ColorSchemeName, useColorScheme } from "react-native";

export const useColors = () => {
  const colorScheme = useColorScheme() || "light";
  return Colors[colorScheme];
};

export const uiTheme = (theme?: ColorSchemeName | string) => {
  const colorSchema = Appearance.getColorScheme();
  if (!colorSchema) {
    return Colors.light;
  }
  //just did this for typescript
  const key = (theme || colorSchema) === "dark" ? "dark" : "light";
  return Colors[key];
};

export const useUiTheme = (forceMode?: ColorSchemeName) => {
  const colorScheme = useColorScheme();
  const { getItem } = useAsyncStorage(EStorageKeys.appearance);
  const [appearance, setAppearance] = useState<string | null>(null);

  useEffect(() => {
    getItem().then((value) => setAppearance(value || null));
  }, [getItem]);

  return uiTheme(forceMode || appearance || colorScheme);
};

export const useIsDark = () => {
  const colorScheme = useColorScheme();
  console.log("🚀 -> colorScheme->", colorScheme);
  const { getItem } = useAsyncStorage(EStorageKeys.appearance);
  const [appearance, setAppearance] = useState<string | null>(null);
  console.log("🚀 -> appearance->", appearance);

  useEffect(() => {
    getItem().then((value) => setAppearance(value || null));
  }, [getItem]);

  return (appearance || colorScheme) === "dark";
};
