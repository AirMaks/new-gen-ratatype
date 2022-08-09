import { memo } from "react";
import { IInfo } from "../types/IInfo";

const Info = memo(
  ({ errorCount, timer, lettersPerMin, numOfSymbols }: IInfo) => {
    return (
      <div className="info">
        <div className="error-text">{`Errors: ${errorCount}`}</div>
        <div className="timer">{`Time: ${timer}`}</div>
        <div className="letters-per-min">{`Symbols/min: ${lettersPerMin}`}</div>
        <div className="num-of-symbols">{`Number of symbols: ${numOfSymbols}`}</div>
      </div>
    );
  }
);

export default Info;
