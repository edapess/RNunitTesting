import { renderWithProviders } from "@/utils/testUtils/test-utils";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { Collapsible, collapsibleTestIDs } from "../Collapsible";

const mockedTitle = "Step 1";
const mockedContent = "This is the content of the collapsible section.";

describe("<Collapsible />", () => {
  test("Match snapshot", async () => {
    const { toJSON } = await renderWithProviders(
      <Collapsible title="mock title" />,
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
  test("Renders title correctly", async () => {
    const { getByTestId } = await renderWithProviders(
      <Collapsible title={mockedTitle} />,
    );
    await waitFor(() => {
      expect(getByTestId(collapsibleTestIDs.title.testID).props.children).toBe(
        mockedTitle,
      );
    });
  });
  test("Toggles content visibility on heading press", async () => {
    const { getByTestId, queryByText } = await renderWithProviders(
      <Collapsible title={mockedTitle}>{mockedContent}</Collapsible>,
    );
    await waitFor(() => {
      expect(queryByText(mockedContent)).toBeNull();
    });
    fireEvent.press(getByTestId(collapsibleTestIDs.heading.testID));
    await waitFor(() => {
      expect(getByTestId(collapsibleTestIDs.content.testID)).toBeTruthy();
      expect(
        getByTestId(collapsibleTestIDs.content.testID).props.children,
      ).toBe(mockedContent);
    });
  });
});
