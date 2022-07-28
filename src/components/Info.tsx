import { memo } from "react";

const Info = memo((props: any) => {
  return (
    <div className="info">
      <div className="error-text">{`Errors: ${props.error}`}</div>
      <div className="timer">{`Time: ${props.timer}`}</div>
      <div className="letters-per-min">{`Symbols/min: ${props.lettersPerMin}`}</div>
      <div className="num-of-symbols">{`Number of symbols: ${props.numOfSymbols}`}</div>
    </div>
  );
});

export default Info;
