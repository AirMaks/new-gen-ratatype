import { useEffect, useRef, useState } from "react";
import { wordsAPI } from "../store/wordsAPI";
import { checkKeyboard } from "../utils/detectKeyboardLang";
const WordsContainer = () => {
  const { data: words, refetch, isFetching } = wordsAPI.useFetchWordsQuery(5);
  const [keyboardIsEng, setKeyboardIsEng] = useState<any>(true);

  const [word, setWord] = useState<any>("");
  const [wordCompletedArr, setWordCompletedArr] = useState<any>("");

  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [isStartPage, setIsStartPage] = useState(true);

  const [lettersPerMin, setLettersPerMin] = useState(0);
  const [numOfSymbols, setNumOfSymbols] = useState(0);

  let [timer, setTimer] = useState(0);
  let id: any;
  let [error, setError] = useState(0);

  const ref: any = useRef(null);
  useEffect(() => {
    const length: any = words?.join(" ").length;

    setWord(words?.join(" ").split(""));
    setNumOfSymbols(length);

    const keyDownHandler = (event: any) => {
      if (
        event.key === "Control" ||
        event.key === "Shift" ||
        event.key === "Alt"
      ) {
        return false;
      }

      if (checkKeyboard(event)) {
        setIsRunning(true);
        setKeyboardIsEng(true);
        if (ref?.current?.textContent[0] === event.key) {
          ref?.current.firstChild?.classList.remove("red");

          setWord((prev: any) => {
            setWordCompletedArr((prev: any) => [
              ...prev,
              ref?.current?.textContent[0],
            ]);
            let removedFirstChar = prev.join("").substring(1);

            return removedFirstChar.split("");
          });

          if (ref?.current?.textContent.length === 1) {
            setIsRunning(false);
            setIsFinished(true);
          }
        } else {
          ref?.current?.firstChild?.classList.add("red");

          setError((error = error + 1));
        }
      } else {
        setKeyboardIsEng(false);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [words]);

  useEffect(() => {
    if (isRunning) {
      id = setInterval(() => {
        setTimer(timer++);
      }, 1000);
    } else {
      if (numOfSymbols !== 0 && timer !== 0) {
        let speed: any = (numOfSymbols / timer) * 60 || 0;
        setLettersPerMin(Math.round(speed));
      }
    }

    return () => clearInterval(id);
  }, [isRunning]);

  const next = () => {
    setError(0);
    setLettersPerMin(0);
    setTimer(0);
    setWord("");
    setIsFinished(false);
    setWordCompletedArr([]);
    refetch();
  };

  const again = () => {
    setError(0);
    setLettersPerMin(0);
    setTimer(0);
    setWord(words?.join(" ").split(""));
    setIsFinished(false);
    setWordCompletedArr([]);
  };

  if (isStartPage) {
    return (
      <>
        <div className="title">Ratatatatype</div>
        <button className="start-btn" onClick={() => setIsStartPage(false)}>
          Start
        </button>
      </>
    );
  }

  return (
    <>
      <div className="title">Ratatatatype</div>
      {isFetching ? (
        <div className="loader">Loading...</div>
      ) : !isFinished ? (
        <div className="words">
          <div className="info">
            <div className="error-text">{`Errors: ${error}`}</div>
            <div className="timer">{`Time: ${timer}`}</div>
            <div className="letters-per-min">{`Symbols/min: ${lettersPerMin}`}</div>
            <div className="num-of-symbols">{`Number of symbols: ${numOfSymbols}`}</div>
          </div>
          <div className="word">
            {wordCompletedArr && (
              <div className="left">
                {[...wordCompletedArr]?.map((w: any, i: number) => (
                  <span key={i} className="completed">
                    {w}
                  </span>
                ))}
              </div>
            )}
            {word && (
              <div className="right" ref={ref}>
                {[...word]?.map((w: any, i: number) => (
                  <span key={i} className="not-completed">
                    {w}
                  </span>
                ))}
              </div>
            )}
          </div>

          {!keyboardIsEng && (
            <div className="keyboard-error">
              Change keyboard language to english
            </div>
          )}
        </div>
      ) : (
        <div className="finished-modal">
          <div className="modal-title">
            {error > 5 ? "Too many errors 😑" : `Not bad 😀 ${error} mistakes`}
          </div>
          <div className="modal-info">
            <div className="error-box">
              <div className="num-result">{`${error}`}</div>
              <div>Errors</div>
            </div>

            <div className="letters-min-box">
              <div className="num-result">{`${lettersPerMin}`}</div>
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
      )}
    </>
  );
};

export default WordsContainer;
