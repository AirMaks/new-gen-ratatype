import { memo } from "react";
import { ICompletedWords } from "../types/ICompletedWords";

const CompletedWords = memo(({ wordCompletedArr }: ICompletedWords) => {
  return (
    <div className="left">
      {[...wordCompletedArr]?.map((w: any, i: number) => (
        <span key={i} className="completed">
          {w}
        </span>
      ))}
    </div>
  );
});

export default CompletedWords;
