import { fireEvent, render } from "@testing-library/react-native";
import { Collapsible, collapsibleTestIDs } from "../Collapsible";

const mockedTitle = "Step 1";
const mockedContent = "This is the content of the collapsible section.";

describe("<Collapsible />", () => {
  test("Match snapshot", () => {
    const { toJSON } = render(<Collapsible title="mock title" />);

    expect(toJSON()).toMatchSnapshot();
  });
  test("Renders title correctly", () => {
    const { getByTestId } = render(<Collapsible title={mockedTitle} />);

    expect(getByTestId(collapsibleTestIDs.title.testID).props.children).toBe(
      mockedTitle
    );
  });
  test("Toggles content visibility on heading press", () => {
    const { getByTestId, queryByText } = render(
      <Collapsible title={mockedTitle}>{mockedContent}</Collapsible>
    );
    expect(queryByText(mockedContent)).toBeNull();
    fireEvent.press(getByTestId(collapsibleTestIDs.heading.testID));
    expect(getByTestId(collapsibleTestIDs.content.testID)).toBeTruthy();
    expect(getByTestId(collapsibleTestIDs.content.testID).props.children).toBe(
      mockedContent
    );
  });
});
