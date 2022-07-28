import { useEffect, useRef, useState } from "react";
import { wordsAPI } from "../store/wordsAPI";
import { checkKeyboard } from "../utils/detectKeyboardLang";
import Button from "./Button";
import CompletedWords from "./CompletedWords";
import FinishedModal from "./FinishedModal";
import Info from "./Info";
import KeyboardErrorText from "./KeyboardErrorText";
import Loader from "./Loader";
import NotCompletedWords from "./NotCompletedWords";
import Title from "./Title";
import Keyboard from "./Keyboard";

const WordsContainer = () => {
  const { data: words, refetch, isFetching } = wordsAPI.useFetchWordsQuery(3);
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
          ref?.current?.firstChild?.classList.remove("red");

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

          if (event.key == " ") {
            document
              .querySelector(".letter-space")
              ?.classList.add("border-red");
          }
          document
            .querySelector(".letter-" + event.key)
            ?.classList.add("border-red");
          setTimeout(() => {
            document
              .querySelector(".letter-space")
              ?.classList.remove("border-red");
            document
              .querySelector(".letter-" + event.key)
              ?.classList.remove("border-red");
          }, 600);

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
  }, [words, isStartPage]);

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

  if (isStartPage) {
    return (
      <>
        <Title />
        <Button {...{ text: "Start", setIsStartPage }} />
      </>
    );
  }

  return (
    <>
      <Title />
      {isFetching ? (
        <Loader />
      ) : !isFinished ? (
        <div className="words">
          <Info {...{ error, lettersPerMin, timer, numOfSymbols }} />
          <div className="word">
            {wordCompletedArr && <CompletedWords {...{ wordCompletedArr }} />}
            {word && <NotCompletedWords {...{ word, ref2: ref }} />}
          </div>
          <Keyboard {...{ word }} />

          {!keyboardIsEng && <KeyboardErrorText />}
        </div>
      ) : (
        <FinishedModal
          {...{
            setLettersPerMin,
            setError,
            error,
            lettersPerMin,
            setTimer,
            setWord,
            setIsFinished,
            words,
            refetch,
            setWordCompletedArr,
          }}
        />
      )}
    </>
  );
};

export default WordsContainer;
