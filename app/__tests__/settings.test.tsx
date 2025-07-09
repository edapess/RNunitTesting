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

  it("renders correctly", async () => {
    const { getByTestId } = renderWithProviders(<SettingsScreen />);
    await waitFor(() => {
      expect(getByTestId(settingsScreenTestIds.container.testID)).toBeTruthy();
    });
  });

  it("displays correct switch state and updates AsyncStorage when toggled", async () => {
    // First test with no stored preference (should default to light)
    const { getByTestId } = renderWithProviders(<SettingsScreen />);
    const switchComponent = getByTestId(settingsScreenTestIds.switch.testID);
    const textComponent = getByTestId(settingsScreenTestIds.text.testID);

    // Wait for initial load to complete
    await waitFor(() => {
      expect(switchComponent.props.value).toBe(false);
      expect(textComponent.props.children).toBe("Turn On Dark mode");
    });

    // Test toggling to dark mode
    fireEvent(switchComponent, "onValueChange", true);

    // Wait for the update to take effect
    await waitFor(() => {
      expect(switchComponent.props.value).toBe(true);
      expect(textComponent.props.children).toBe("Turn Off Dark mode");
    });

    // Verify that AsyncStorage was updated to dark mode
    await waitFor(async () => {
      const storedValue = await AsyncStorage.getItem(EStorageKeys.appearance);
      expect(storedValue).toBe("dark");
    });

    // Test toggling back to light mode
    fireEvent(switchComponent, "onValueChange", false);

    // Wait for the update to take effect
    await waitFor(() => {
      expect(switchComponent.props.value).toBe(false);
      expect(textComponent.props.children).toBe("Turn On Dark mode");
    });

    // Verify that AsyncStorage was updated to light mode
    await waitFor(async () => {
      const storedValue = await AsyncStorage.getItem(EStorageKeys.appearance);
      expect(storedValue).toBe("light");
    });
  });

  it("loads existing dark mode preference from AsyncStorage", async () => {
    // Set dark mode preference before rendering
    await AsyncStorage.setItem(EStorageKeys.appearance, "dark");

    const { getByTestId } = renderWithProviders(<SettingsScreen />);
    const switchComponent = getByTestId(settingsScreenTestIds.switch.testID);
    const textComponent = getByTestId(settingsScreenTestIds.text.testID);

    // Wait for the component to load the stored preference
    await waitFor(() => {
      expect(switchComponent.props.value).toBe(true);
      expect(textComponent.props.children).toBe("Turn Off Dark mode");
    });
  });
});
