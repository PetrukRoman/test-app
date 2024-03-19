import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addToCart, changeQuantity } from "../../store/cartSlice";
import { Meal } from "../../types";
import Button from "../Button/Button";
import Counter from "../Counter/Counter";
import styles from "./Card.module.css";

type PropsCard = {
  item: Meal;
};

const Card = ({ item }: PropsCard) => {
  const { items } = useAppSelector((state) => state.cart);
  const { t } = useTranslation();
  const dispath = useAppDispatch();

  const alreadyinCartIndex = items.findIndex((meal) => meal.id === item.id);

  const handleAddToCart = () => {
    dispath(addToCart(item));
  };

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
      <div className={styles.imgContainer}>
        <img src={item.image} alt={item.name} />
      </div>
      <div>
        <h2>{item.name}</h2>
        <p className={styles.description}>{item.description}</p>
        <p className={styles.price}>{item.price}</p>
      </div>
      <div className={styles.cta}>
        {alreadyinCartIndex !== -1 ? (
          <Counter quantity={items[alreadyinCartIndex].quantity} handleChangeQuantity={handleChangeQuantity} />
        ) : (
          <Button size="fill" variant="outline" onClick={handleAddToCart}>
            {t("AddToCart.key")}
          </Button>
        )}
      </div>
    </article>
  );
};
export default Card;
