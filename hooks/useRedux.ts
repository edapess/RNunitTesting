import { AppDispatch, TApplicationState } from "@/app/shared/types/redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TApplicationState> =
  useSelector;
