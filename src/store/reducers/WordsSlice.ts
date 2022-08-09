import { createSlice } from "@reduxjs/toolkit";

interface WordsState {
  words: string[];
  error: string;
}

const initialState: WordsState = {
  words: [],
  error: "",
};

export const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {},
  extraReducers: {},
});

export const wordsActions = wordsSlice.actions;
export const wordsReducer = wordsSlice.reducer;
