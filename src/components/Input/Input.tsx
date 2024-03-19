import styles from "./Input.module.css";

type inputError = {
  isError: boolean;
  message: string;
};
type InputGroupProps = React.ComponentPropsWithoutRef<"input"> & {
  label?: string;
  error?: inputError;
};
const InputGroup = ({ label, id, error, ...rest }: InputGroupProps) => {
  return (
    <p className={styles.inputGroup}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...rest} />
      {error?.isError && <span>{error?.message}</span>}
    </p>
  );
};
export default InputGroup;
