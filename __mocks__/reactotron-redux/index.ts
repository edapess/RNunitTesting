//reactotron-redux mock

function reactotronRedux() {
  return {
    onCommand: jest.fn(),
    features: {
      createEnhancer: () => {},
      setReduxStore: jest.fn(),
    },
  };
}

export type ReactotronReduxPlugin = ReturnType<typeof reactotronRedux>;
export { reactotronRedux };
