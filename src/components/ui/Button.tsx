import { IButton } from "../../types/IButton";

const Button = (props: IButton) => {
  return (
    <button className="start-btn" onClick={() => props.setIsStartPage(false)}>
      {props.text}
    </button>
  );
};

export default Button;
