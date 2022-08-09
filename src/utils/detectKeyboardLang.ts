import { IKeyboardEvent } from "../types/IKeyboardEvent";

export const detectKeyboardLang = (e: IKeyboardEvent) => {
  let re = /^[a-zA-Z\s]*$/g;
  let a = e.key.match(re);

  if (a == null) {
    return false;
  }

  return true;
};
