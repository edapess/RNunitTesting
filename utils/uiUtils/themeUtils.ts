import { Colors } from "@/constants/Colors";
import { EStorageKeys } from "@/constants/mmkvConstants";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Appearance, ColorSchemeName, useColorScheme } from "react-native";

// Theme Context
interface ThemeContextType {
  isDark: boolean;
  appearance: string | null;
  isLoading: boolean;
  setTheme: (theme: "dark" | "light") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();
  const { getItem, setItem } = useAsyncStorage(EStorageKeys.appearance);
  const [appearance, setAppearance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAppearance = async () => {
      try {
        const value = await getItem();
        setAppearance(value);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching appearance:", error);
        setIsLoading(false);
      }
    };

    loadAppearance();
  }, [getItem]);

  const setTheme = async (theme: "dark" | "light") => {
    try {
      await setItem(theme);
      setAppearance(theme);
      Appearance.setColorScheme(theme);
    } catch (error) {
      console.error("Error setting theme:", error);
    }
  };

  const isDark = isLoading
    ? colorScheme === "dark"
    : appearance !== null
      ? appearance === "dark"
      : colorScheme === "dark";

  return React.createElement(
    ThemeContext.Provider,
    { value: { isDark, appearance, isLoading, setTheme } },
    children,
  );
};

// Custom hook to use theme context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

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
  const { appearance, isLoading } = useThemeContext();
  const colorScheme = useColorScheme();

  if (isLoading) {
    return uiTheme(forceMode || colorScheme);
  }

  const currentTheme = forceMode || appearance || colorScheme;
  return uiTheme(currentTheme);
};

export const useIsDark = () => {
  const { isDark } = useThemeContext();
  return isDark;
};
