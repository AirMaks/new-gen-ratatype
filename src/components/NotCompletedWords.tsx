import { memo } from "react";
import { INotCompletedWords } from "../types/INotCompletedWords";

const NotCompletedWords = memo(({ word, ref2 }: INotCompletedWords) => {
  return (
    <>
      {word.length !== 0 && (
        <div className="right" ref={ref2}>
          {[...word]?.map((w: string, i: number) => (
            <span key={i} className="not-completed">
              {w}
            </span>
          ))}
        </div>
      )}
    </>
  );
});

export default NotCompletedWords;
