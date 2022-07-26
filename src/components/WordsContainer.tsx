import { useEffect, useRef, useState } from "react";
import { wordsAPI } from "../store/wordsAPI";

const WordsContainer = () => {
  const [word, setWord] = useState<any>("");
  const [wordCompleted, setWordCompleted] = useState<any>("");
  const { data: words, isLoading } = wordsAPI.useFetchWordsQuery(7);
  const ref: any = useRef(null);
  let [error, setError] = useState(0);

  useEffect(() => {
    setWord(words?.join(" ").split(""));

    let completedWord: any = [];
    const keyDownHandler = (event: any) => {
      event.preventDefault();

      if (ref?.current?.textContent[0] === event.key) {
        setWord((prev: any) => {
          completedWord.push(ref?.current?.textContent[0]);

          let temp = prev.join("").substring(1);

          return temp.split("");
        });

        setWordCompleted(completedWord);
      } else {
        setError((error = error + 1));
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [words]);

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }
  return (
    <div className="words">
      <div className="word">
        <div className="error-text">{`Errors: ${error}`}</div>
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
