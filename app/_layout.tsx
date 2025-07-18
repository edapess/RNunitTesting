import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";

import store from "@/app/store/configureStore";
import {
  ThemeProvider,
  useIsDark,
  useUiTheme,
} from "@/utils/uiUtils/themeUtils";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { initRemoteLogger } from "./store/setupLogger";

initRemoteLogger("ws://localhost:7878");

function AppContent() {
  const colors = useUiTheme();
  const isDark = useIsDark();
  console.log("🚀 -> AppContent -> isDark->", isDark);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    StatusBar.setBarStyle(isDark ? "light-content" : "dark-content");
  }, [colors.primary, isDark]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}
