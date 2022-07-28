import { memo } from "react";

const NotCompletedWords = memo((props: any) => {
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
