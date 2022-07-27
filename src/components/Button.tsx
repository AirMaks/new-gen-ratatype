import React from "react";

const Button = (props: any) => {
  return (
    <button className="start-btn" onClick={() => props.setIsStartPage(false)}>
      {props.text}
    </button>
  );
};

export default Button;
