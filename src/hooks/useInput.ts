import { useState } from "react";

type useInputProps = {
  defaulftValue: string;
  validFunc: (value: string) => boolean;
};

export type Input = {
  value: string;
  error: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputBlur: () => void;
  hasError: () => boolean;
  resetInput: () => void;
};

const UseInput = ({ defaulftValue, validFunc }: useInputProps): Input => {
  const [enteredValue, setEnteredValue] = useState(defaulftValue);
  const [isEdit, setIsEdit] = useState(false);

  const isValid = validFunc(enteredValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEdit(false);
    setEnteredValue(event.target.value);
  };

  const handleInputBlur = () => {
    setIsEdit(true);
  };

  const hasError = () => {
    setIsEdit(true);
    const error = !validFunc(enteredValue);
    return error;
  };
  const resetInput = () => {
    setEnteredValue(defaulftValue);
    setIsEdit(false);
  };
  return {
    value: enteredValue,
    error: !isValid && isEdit,
    handleInputChange,
    handleInputBlur,
    hasError,
    resetInput,
  };
};
export default UseInput;
