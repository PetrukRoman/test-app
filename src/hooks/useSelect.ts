import { useState } from "react";
import { isNotEmpty } from "../util/validation";

export type Select = {
  value: string;
  error: boolean;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSelectBlur: () => void;
  hasError: () => boolean;
  resetSelect: () => void;
};
const useSelect = (defaultValue: string): Select => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isEdit, setIsEdit] = useState(false);

  const isValid = isNotEmpty(selectedValue);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleSelectBlur = () => {
    setIsEdit(true);
  };

  const hasError = () => {
    setIsEdit(true);
    return !isNotEmpty(selectedValue);
  };

  const resetSelect = () => {
    setSelectedValue(defaultValue);
    setIsEdit(false);
  };
  return {
    value: selectedValue,
    error: !isValid && isEdit,
    hasError,
    handleSelectChange,
    handleSelectBlur,
    resetSelect,
  };
};

export default useSelect;
