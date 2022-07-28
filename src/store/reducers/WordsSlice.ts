import { createSlice } from "@reduxjs/toolkit";
import { IWords } from "../../models/IWords";

interface WordsState {
  words: IWords[];
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
