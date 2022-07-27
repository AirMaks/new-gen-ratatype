const FinishedModal = (props: any) => {
  const next = () => {
    props.setError(0);
    props.setLettersPerMin(0);
    props.setTimer(0);
    props.setWord("");
    props.setIsFinished(false);
    props.setWordCompletedArr([]);
    props.refetch();
  };

  const again = () => {
    props.setError(0);
    props.setLettersPerMin(0);
    props.setTimer(0);
    props.setWord(props.words?.join(" ").split(""));
    props.setIsFinished(false);
    props.setWordCompletedArr([]);
  };
  return (
    <div className="finished-modal">
      <div className="modal-title">
        {props.error > 5
          ? "Too many errors 😑"
          : `Not bad 😀 ${props.error} mistakes`}
      </div>
      <div className="modal-info">
        <div className="error-box">
          <div className="num-result">{`${props.error}`}</div>
          <div>Errors</div>
        </div>

        <div className="letters-min-box">
          <div className="num-result">{`${props.lettersPerMin}`}</div>
          <div>Symbols/min</div>
        </div>
      </div>

      <div className="buttons">
        <button className="again" onClick={() => again()}>
          Again
        </button>
        <button className="next" onClick={() => next()}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FinishedModal;
