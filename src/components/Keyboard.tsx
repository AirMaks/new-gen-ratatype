import { useEffect, useState } from "react";
import { KEYBOARD } from "../constants";
import { checkKeyboard } from "../utils/detectKeyboardLang";

const Keyboard = (props: any) => {
  return (
    <div className="keyboard">
      {KEYBOARD.map((row: any, i: number) => (
        <div key={`row-${i}`} className="row">
          {row.map((el: any, i: number) => (
            <div
              key={`el-${i}`}
              className={`letter letter-${el} ${
                (props.word && el === props.word[0]) ||
                (props.word[0] === " " && el === "space")
                  ? "current"
                  : ""
              }`}
            >
              {el}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;