import { mockedTodosData } from "@/__mocks__/mockedData";
import { TToDo } from "@/app/shared/types";
import { collapsibleTestIDs } from "@/components/Collapsible";
import { EStorageKeys } from "@/constants/mmkvConstants";
import { renderWithProviders } from "@/utils/testUtils/test-utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createEntityAdapter } from "@reduxjs/toolkit";
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
    const { getByTestId } = await renderWithProviders(<SettingsScreen />);
    await waitFor(() => {
      expect(getByTestId(settingsScreenTestIds.container.testID)).toBeTruthy();
    });
  });

  it("displays correct switch state and updates AsyncStorage when toggled", async () => {
    // First test with no stored preference (should default to light)
    const { getByTestId } = await renderWithProviders(<SettingsScreen />);
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

    const { getByTestId } = await renderWithProviders(<SettingsScreen />);
    const switchComponent = getByTestId(settingsScreenTestIds.switch.testID);
    const textComponent = getByTestId(settingsScreenTestIds.text.testID);

    // Wait for the component to load the stored preference
    await waitFor(() => {
      expect(switchComponent.props.value).toBe(true);
      expect(textComponent.props.children).toBe("Turn Off Dark mode");
    });
  });

  it("displays correct collapsible text based on todos state", async () => {
    // Create entity adapter to set up proper initial state
    const todosAdapter = createEntityAdapter<TToDo>();

    // Calculate completed todos count from mock data
    const originalCompletedCount = mockedTodosData.todos.filter(
      (todo) => todo.completed,
    ).length;
    const totalTodos = mockedTodosData.total; // Use the total from mock data, not the array length

    // Test 1: Initial state with original todos
    const initialTodosState = {
      todos: todosAdapter.setAll(
        todosAdapter.getInitialState({
          offset: 0,
          totalElements: mockedTodosData.total,
          isReachEndOfList: false,
        }),
        mockedTodosData.todos,
      ),
    };

    const preloadedState = {
      todos: initialTodosState,
    };

    const { getByTestId, unmount } = await renderWithProviders(
      <SettingsScreen />,
      { preloadedState },
    );

    // Find and press the collapsible heading to open it
    const collapsibleHeading = getByTestId(collapsibleTestIDs.heading.testID);
    fireEvent.press(collapsibleHeading);

    // Wait for collapsible to open and verify initial text
    await waitFor(() => {
      const collapsibleContent = getByTestId(collapsibleTestIDs.content.testID);
      expect(collapsibleContent).toBeTruthy();
      const textComponent = getByTestId(
        settingsScreenTestIds.completedTodosText.testID,
      );
      expect(textComponent.props.children).toBe(
        `You have completed ${originalCompletedCount} out of ${totalTodos} todos.`,
      );
    });

    // Unmount the first component
    unmount();

    // Test 2: Updated state with more completed todos
    const updatedTodos = mockedTodosData.todos.map((todo, index) =>
      index === 0 && !todo.completed ? { ...todo, completed: true } : todo,
    );

    const updatedCompletedCount = updatedTodos.filter(
      (todo) => todo.completed,
    ).length;

    const updatedTodosState = {
      todos: todosAdapter.setAll(
        todosAdapter.getInitialState({
          offset: 0,
          totalElements: mockedTodosData.total,
          isReachEndOfList: false,
        }),
        updatedTodos,
      ),
    };

    const updatedPreloadedState = {
      todos: updatedTodosState,
    };

    // Render with updated state
    const { getByTestId: getByTestId2 } = await renderWithProviders(
      <SettingsScreen />,
      {
        preloadedState: updatedPreloadedState,
      },
    );

    // Find and press the collapsible heading to open it
    const collapsibleHeading2 = getByTestId2(collapsibleTestIDs.heading.testID);
    fireEvent.press(collapsibleHeading2);

    // Wait for collapsible to open and verify updated text
    await waitFor(() => {
      const collapsibleContent2 = getByTestId2(
        collapsibleTestIDs.content.testID,
      );
      expect(collapsibleContent2).toBeTruthy();
      const textComponent = getByTestId2(
        settingsScreenTestIds.completedTodosText.testID,
      );
      expect(textComponent.props.children).toBe(
        `You have completed ${updatedCompletedCount} out of ${totalTodos} todos.`,
      );
    });

    // Verify the count actually changed
    expect(updatedCompletedCount).toBeGreaterThan(originalCompletedCount);
  });
});
