import { memo } from "react";

const CompletedWords = memo((props: any) => {
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
