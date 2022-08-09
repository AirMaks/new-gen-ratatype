import { memo } from "react";
import { ICompletedWords } from "../types/ICompletedWords";

const CompletedWords = memo((props: ICompletedWords) => {
  return (
    <div className="left">
      {[...props.wordCompletedArr]?.map((w: any, i: number) => (
        <span key={i} className="completed">
          {w}
        </span>
      ))}
    </div>
  );
});

export default CompletedWords;
