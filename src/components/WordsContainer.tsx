import { useEffect, useRef, useState } from "react";
import { wordsAPI } from "../store/wordsAPI";

const WordsContainer = () => {
  const { data: words, isLoading } = wordsAPI.useFetchWordsQuery(7);

  const [word, setWord] = useState<any>("");
  const [wordCompleted, setWordCompleted] = useState<any>("");
  const [isRunning, setIsRunning] = useState(false);

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

    const completedWord: any = [];

    const keyDownHandler = (event: any) => {
      event.preventDefault();

      setIsRunning(true);

      if (ref?.current?.textContent[0] === event.key) {
        ref?.current.firstChild?.classList.remove("red");
        setWord((prev: any) => {
          completedWord.push(ref?.current?.textContent[0]);

          const removedFirstChar = prev.join("").substring(1);

          return removedFirstChar.split("");
        });
        if (ref?.current?.textContent.length === 1) {
          setIsRunning(false);
        }
        setWordCompleted(completedWord);
      } else {
        ref?.current.firstChild?.classList.add("red");

        setError((error = error + 1));
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

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }
  return (
    <div className="words">
      <div className="word">
        <div className="info">
          <div className="error-text">{`Errors: ${error}`}</div>
          <div className="timer">{`Time: ${timer}`}</div>
          <div className="letters-per-min">{`Symbols/min: ${lettersPerMin}`}</div>
          <div className="num-of-symbols">{`Number of symbols: ${numOfSymbols}`}</div>
        </div>
        {wordCompleted && (
          <div className="left">
            {[...wordCompleted]?.map((w: any, i: number) => (
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
    </div>
  );
};

export default WordsContainer;
