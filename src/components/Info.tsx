import { memo } from "react";
import { IInfo } from "../types/IInfo";

const Info = memo(({ errorCount, timer, numOfSymbols }: IInfo) => {
  return (
    <div className="info">
      <div className="error-text">{`Errors: ${errorCount}`}</div>
      <div className="timer">{`Time: ${timer}`}</div>
      <div className="num-of-symbols">{`Number of symbols: ${numOfSymbols}`}</div>
    </div>
  );
});

export default Info;
