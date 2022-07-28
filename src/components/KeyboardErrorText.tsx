import { memo } from "react";

const KeyboardErrorText = memo(() => {
  return (
    <div className="keyboard-error">
      Change keyboard language to english and type only letters or space
    </div>
  );
});

export default KeyboardErrorText;
