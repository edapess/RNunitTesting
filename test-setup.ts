import { loadProjectEnv } from "@expo/env";
jest.mock("expo-device", () => ({
  deviceId: "mocked-device-id",
}));

loadProjectEnv(process.cwd(), { silent: true });
