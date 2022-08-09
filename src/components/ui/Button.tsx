import { IButton } from "../../types/IButton";

const Button = ({ text, setIsStartPage }: IButton) => {
  return (
    <button className="start-btn" onClick={() => setIsStartPage(false)}>
      {text}
    </button>
  );
};

export default Button;
