import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { nookipediaApi } from "../services/api";
import villagersReducer from "./villagersSlice";

export const store = configureStore({
  reducer: {
    [nookipediaApi.reducerPath]: nookipediaApi.reducer,
    villagers: villagersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nookipediaApi.middleware),
});

setupListeners(store.dispatch);
