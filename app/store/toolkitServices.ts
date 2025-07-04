import { createApi } from "@reduxjs/toolkit/query/react";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import * as Device from "expo-device";

const axiosBaseQuery = () => async (params: AxiosRequestConfig) => {
  try {
    const axiosApi = axios.create({
      baseURL: "https://dummyjson.com",
      headers: {
        deviceId: Device.deviceName || "unknown-device",
      },
    });

    const result = await axiosApi(params);
    if (!result.data) {
      return { error: { message: "No data" } };
    }
    return { data: result.data };
  } catch (axiosError) {
    let err = axiosError as AxiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data,
      },
    };
  }
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
