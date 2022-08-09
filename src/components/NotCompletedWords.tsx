import { memo } from "react";
import { INotCompletedWords } from "../types/INotCompletedWords";

const NotCompletedWords = memo(({ word, ref2 }: INotCompletedWords) => {
  return (
    <div className="right" ref={ref2}>
      {[...word]?.map((w: any, i: number) => (
        <span key={i} className="not-completed">
          {w}
        </span>
      ))}
    </div>
  );
});

export default NotCompletedWords;
