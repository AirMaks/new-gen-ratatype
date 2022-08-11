import { IFinishedModal } from "../types/IFinishedModal";

const FinishedModal = ({
  again,
  next,
  errorCount,
  lettersPerMin,
}: IFinishedModal) => {
  return (
    <div className="finished-modal">
      <div className="modal-title">
        {errorCount > 5
          ? "Too many errors 😑"
          : `Not bad 😀 ${errorCount} mistakes`}
      </div>
      <div className="modal-info">
        <div className="error-box">
          <div className="num-result">{`${errorCount}`}</div>
          <div>Errors</div>
        </div>

        <div className="letters-min-box">
          <div className="num-result">{`${lettersPerMin}`}</div>
          <div>Symbols/min</div>
        </div>
      </div>

      <div className="buttons">
        <button className="again" onClick={again}>
          Again
        </button>
        <button className="next" onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FinishedModal;
