import { memo } from "react";
import { INotCompletedWords } from "../types/INotCompletedWords";

const NotCompletedWords = memo((props: INotCompletedWords) => {
  return (
    <div className="right" ref={props.ref2}>
      {[...props.word]?.map((w: any, i: number) => (
        <span key={i} className="not-completed">
          {w}
        </span>
      ))}
    </div>
  );
});

export default NotCompletedWords;
