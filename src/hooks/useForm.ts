import { Input } from "./useInput";
import { Select } from "./useSelect";

export type Form = {
  hasFieldsErrors: boolean;
  checkFormValid: () => boolean;
};

const useForm = (fields: (Input | Select)[]): Form => {
  const checkFormValid = () => {
    const errors = fields.map((field) => field.hasError());
    const isValidForm = errors.every((error) => error === false);

    return isValidForm;
  };

  const hasFieldsErrors = fields.some((field) => field.error);

  return {
    hasFieldsErrors,
    checkFormValid,
  };
};
export default useForm;
