import { createTestIDsObject } from "../createTestIDs";

describe("createTestIDs", () => {
  test("should create an object with test ids", () => {
    const testIDsObject = createTestIDsObject("Collapsible", [
      "heading",
      "title",
      "content",
    ]);

    expect(testIDsObject).toEqual({
      heading: { testID: "Collapsible.heading" },
      title: { testID: "Collapsible.title" },
      content: { testID: "Collapsible.content" },
    });
  });
});
