import { createSlice } from "@reduxjs/toolkit";
import { IWords } from "../../models/IWords";

interface WordsState {
  words: IWords[];
  isLoading: boolean;
  error: string;
  isComplete: boolean;
}

const initialState: WordsState = {
  words: [],
  isLoading: false,
  error: "",
  isComplete: false,
};

export const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {},
  extraReducers: {},
});

export const wordsActions = wordsSlice.actions;
export const wordsReducer = wordsSlice.reducer;
