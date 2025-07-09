import { EStorageKeys } from "@/constants/mmkvConstants";
import { renderWithProviders } from "@/utils/testUtils/test-utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fireEvent, waitFor } from "@testing-library/react-native";
import SettingsScreen, { settingsScreenTestIds } from "../(tabs)/settings";

// Mock useColorScheme to return a controllable value
const mockUseColorScheme = jest.fn();
jest.mock("react-native/Libraries/Utilities/useColorScheme", () => ({
  __esModule: true,
  default: mockUseColorScheme,
}));

describe("Settings screen", () => {
  beforeEach(() => {
    //clear all mocks and AsyncStorage before each test
    jest.clearAllMocks();
    AsyncStorage.clear();
    // set default color scheme to light
    mockUseColorScheme.mockReturnValue("light");
  });

  it("renders correctly", () => {
    const { getByTestId } = renderWithProviders(<SettingsScreen />);
    expect(getByTestId(settingsScreenTestIds.container.testID)).toBeTruthy();
  });

  it("displays correct switch state and updates AsyncStorage when toggled", async () => {
    const { getByTestId, rerender } = renderWithProviders(<SettingsScreen />);
    const switchComponent = getByTestId(settingsScreenTestIds.switch.testID);
    const textComponent = getByTestId(settingsScreenTestIds.text.testID);
    //initial state should be false (light mode) and text should indicate turning on dark mode
    expect(switchComponent.props.value).toBe(false);
    expect(textComponent.props.children).toBe("Turn On Dark mode");
    // simulate that user has previously set dark mode preference
    await AsyncStorage.setItem(EStorageKeys.appearance, "dark");

    // Re-render to trigger the useEffect in useIsDark hook that reads from AsyncStorage
    rerender(<SettingsScreen />);

    // wait for the component to update with the dark theme preference
    await waitFor(() => {
      expect(switchComponent.props.value).toBe(true);
      expect(textComponent.props.children).toBe("Turn Off Dark mode");
    });

    // test the toggle functionality - switch back to light mode
    fireEvent(switchComponent, "onChange", { nativeEvent: { value: false } });

    // verify that AsyncStorage was updated to light mode
    await waitFor(async () => {
      const storedValue = await AsyncStorage.getItem(EStorageKeys.appearance);
      expect(storedValue).toBe("light");
    });
  });
});
