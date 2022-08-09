import { memo } from "react";
import { KEYBOARD } from "../constants";
import { IKeyboard } from "../types/IKeyboard";

const Keyboard = memo(({ word }: IKeyboard) => {
  return (
    <div className="keyboard">
      {KEYBOARD.map((row: any, i: number) => (
        <div key={`row-${i}`} className="row">
          {row.map((el: any, i: number) => {
            const current =
              el === word[0] || (word[0] === " " && el === "space");
            return (
              <div
                key={`el-${i}`}
                className={`letter letter-${el} ${current ? "current" : ""}`}
              >
                {el}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
});

export default Keyboard;
