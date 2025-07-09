import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";

import store from "@/app/store/configureStore";
import { useIsDark, useUiTheme } from "@/utils/uiUtils/themeUtils";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
export default function RootLayout() {
  const colors = useUiTheme();
  const isDark = useIsDark();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  useEffect(() => {
    StatusBar.setBarStyle(isDark ? "light-content" : "dark-content");
  }, [colors.primary, isDark]);
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </Provider>
    </SafeAreaView>
  );
}
