import { memo, useEffect, useRef, useState } from "react";
import { wordsAPI } from "../store/wordsAPI";
import { detectKeyboardLang } from "../utils/detectKeyboardLang";
import Button from "./ui/Button";
import CompletedWords from "./CompletedWords";
import FinishedModal from "./FinishedModal";
import Info from "./Info";
import KeyboardErrorText from "./KeyboardErrorText";
import Loader from "./ui/Loader";
import NotCompletedWords from "./NotCompletedWords";
import Title from "./Title";
import Keyboard from "./Keyboard";
import ErrorText from "./ErrorText";
import { IKeyboardEvent } from "../types/IKeyboardEvent";
import { getAllJSDocTagsOfKind } from "typescript";
import { nextTick } from "process";

const WordsContainer = memo(() => {
  const {
    data: words,
    refetch,
    isFetching,
    error,
  } = wordsAPI.useFetchWordsQuery(5);

  const [keyboardIsEng, setKeyboardIsEng] = useState<boolean>(true);

  const [word, setWord] = useState<string[]>([]);
  const [wordCompletedArr, setWordCompletedArr] = useState<string[]>([]);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const [isStartPage, setIsStartPage] = useState<boolean>(true);

  const [lettersPerMin, setLettersPerMin] = useState<number>(0);
  const [numOfSymbols, setNumOfSymbols] = useState<number | undefined>(0);

  let [timer, setTimer] = useState<number>(0);
  let id: ReturnType<typeof setInterval>;
  let [errorCount, setErrorCount] = useState<number>(0);

  const ref = useRef<any>(null);

  const keyDownHandler = (e: IKeyboardEvent) => {
    if (e.key === "Control" || e.key === "Shift" || e.key === "Alt") {
      return true;
    }
    if (detectKeyboardLang(e)) {
      setIsRunning(true);
      setKeyboardIsEng(true);

      if (ref?.current?.textContent[0] === e.key) {
        ref?.current?.firstChild?.classList.remove("red");

        setWord((prev: string[]) => {
          setWordCompletedArr((prev: string[]) => [
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

        if (e.key == " ") {
          document.querySelector(".letter-space")?.classList.add("border-red");
        }
        document.querySelector(`.letter-${e.key}`)?.classList.add("border-red");
        setTimeout(() => {
          document
            .querySelector(".letter-space")
            ?.classList.remove("border-red");
          document
            .querySelector(`.letter-${e.key}`)
            ?.classList.remove("border-red");
        }, 600);

        setErrorCount((errorCount = errorCount + 1));
      }
    } else {
      setKeyboardIsEng(false);
    }
  };
  useEffect(() => {
    const length: number | undefined = words?.join(" ").length;
    if (words) {
      setWord(words?.join(" ").split(""));
    }

    setNumOfSymbols(length);

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
      if (numOfSymbols && numOfSymbols !== 0 && timer !== 0) {
        let speed: number = (numOfSymbols / timer) * 60 || 0;
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

  if (error) {
    return (
      <>
        <Title />
        <ErrorText />;
      </>
    );
  }

  const again = () => {
    setErrorCount(0);
    setLettersPerMin(0);
    setTimer(0);
    if (words) setWord(words?.join(" ").split(""));
    setIsFinished(false);
    setWordCompletedArr([]);
  };
  const next = () => {
    setErrorCount(0);
    setLettersPerMin(0);
    setTimer(0);
    setWord([]);
    setIsFinished(false);
    setWordCompletedArr([]);
    refetch();
  };

  return (
    <>
      <Title />
      {isFetching ? (
        <Loader />
      ) : !isFinished ? (
        <div className="words">
          <Info {...{ errorCount, lettersPerMin, timer, numOfSymbols }} />
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
            errorCount,
            lettersPerMin,
          }}
          again={() => again()}
          next={() => next()}
        />
      )}
    </>
  );
});

export default WordsContainer;
