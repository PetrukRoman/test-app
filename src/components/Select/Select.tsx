import classes from "./Select.module.css";

type SelectError = {
  isError: boolean;
  message: string;
};
type SelectProps = React.ComponentPropsWithoutRef<"select"> & {
  label?: string;
  children: React.ReactNode;
  error?: SelectError;
};
type OptionProps = React.ComponentPropsWithoutRef<"option"> & {
  children: string;
};

export const Select = ({ id, label, children, error, ...rest }: SelectProps) => {
  return (
    <div className={classes.control}>
      <label htmlFor={id}>{label}</label>
      <div className={classes.selectWrapper}>
        <select className={error?.isError ? `${classes.select} ${classes.error}` : classes.select} id={id} {...rest}>
          {children}
        </select>
      </div>
      {error?.isError && <span>{error.message}</span>}
    </div>
  );
};

export const Option = ({ children, ...rest }: OptionProps) => {
  return <option {...rest}> {children}</option>;
};
