import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { wordsAPI } from "../store/wordsAPI";
import { wordsReducer } from "./reducers/WordsSlice";

export const store = configureStore({
  reducer: {
    wordsReducer,
    [wordsAPI.reducerPath]: wordsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      wordsAPI.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
