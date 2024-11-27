import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { nookipediaApi } from "../services/api";

export const store = configureStore({
  reducer: {
    [nookipediaApi.reducerPath]: nookipediaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nookipediaApi.middleware),
});

setupListeners(store.dispatch);
