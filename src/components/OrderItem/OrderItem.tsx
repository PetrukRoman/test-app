import { useAppDispatch } from "../../hooks/hooks";
import { changeQuantity } from "../../store/cartSlice";
import { CartMeal } from "../../types";
import Counter from "../Counter/Counter";
import styles from "./OrderItem.module.css";

type PropsOrderItem = {
  item: CartMeal;
};
const OrderItem = ({ item }: PropsOrderItem) => {
  const dispath = useAppDispatch();
  const handleChangeQuantity = (type: "increment" | "decrement") => {
    dispath(
      changeQuantity({
        type,
        id: item.id,
      })
    );
  };
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={styles.descriptionContainer}>
        <h2>{item.name}</h2>
        <p className={styles.price}>{item.price}</p>
      </div>

      <div className={styles.counterContainer}>
        <Counter quantity={item.quantity} handleChangeQuantity={handleChangeQuantity} />
      </div>
    </article>
  );
};
export default OrderItem;
