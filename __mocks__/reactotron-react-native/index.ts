export default {
  configure: () => ({
    useReactNative: () => ({
      use: () => ({
        connect: () => ({
          createEnhancer: jest.fn(() => {
            return jest.fn((store) => store);
          }),
        }),
      }),
    }),
  }),
};
