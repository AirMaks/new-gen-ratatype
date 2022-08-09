import { memo } from "react";
import { ICompletedWords } from "../types/ICompletedWords";

const CompletedWords = memo(({ wordCompletedArr }: ICompletedWords) => {
  return (
    <>
      {wordCompletedArr.length !== 0 && (
        <div className="left">
          {[...wordCompletedArr]?.map((w: any, i: number) => (
            <span key={i} className="completed">
              {w}
            </span>
          ))}
        </div>
      )}
    </>
  );
});

export default CompletedWords;
