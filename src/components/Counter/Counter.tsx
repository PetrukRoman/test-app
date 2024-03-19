import styles from "./Counter.module.css";

type CounterProps = {
  quantity: number;
  handleChangeQuantity: (type: "increment" | "decrement") => void;
};

const Counter = ({ quantity, handleChangeQuantity }: CounterProps) => {
  return (
    <div className={styles.counter}>
      <button onClick={() => handleChangeQuantity("decrement")}> &ndash;</button>
      <span>{quantity}</span>
      <button onClick={() => handleChangeQuantity("increment")}>+</button>
    </div>
  );
};
export default Counter;
