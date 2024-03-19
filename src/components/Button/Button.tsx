import styles from "./Button.module.css";

type Variant = "filled" | "text" | "outline";
type Size = "small" | "medium" | "large" | "fill";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  size?: Size;
  variant?: Variant;
  children: React.ReactNode;
};

const Button = ({ children, variant, size, ...rest }: ButtonProps) => {
  return (
    <button className={`${styles.btn} ${variant ? styles[variant] : styles.text} ${size ? styles[size] : styles.medium}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
