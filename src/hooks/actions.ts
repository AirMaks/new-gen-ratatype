import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { wordsActions } from "../store/reducers/WordsSlice";

const actions = {
  ...wordsActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
