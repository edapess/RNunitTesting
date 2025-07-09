import { loadProjectEnv } from "@expo/env";
jest.mock("expo-device", () => ({
  deviceId: "mocked-device-id",
}));

loadProjectEnv(process.cwd(), { silent: true });

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);
