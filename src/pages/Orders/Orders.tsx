import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { getAllOrdersByUser } from "../../services/firebase";
import { CartMeal } from "../../types";
import styles from "./Orders.module.css";
import Loader from "../../components/Loader/Loader";
import { useTranslation } from "react-i18next";

const Orders = () => {
  const { token, userId } = useContext(AuthContext) as AuthContextType;
  const { t } = useTranslation();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getAllOrdersByUser(token, userId),
  });
  return (
    <div className={styles.container}>
      {isPending && !isError && <Loader />}
      {!isPending && isError && <p>{error.message}</p>}
      {!isPending && !isError && (
        <ul className={styles.orderList}>
          {data?.map((order) => {
            return (
              <li key={order.order_number}>
                <article className={styles.order}>
                  <h2>
                    {t("Order.key")} №: {order.order_number}
                  </h2>

                  <ul className={styles.mealsList}>
                    {order.items.map((meal: CartMeal) => {
                      return (
                        <li key={`${order.order_number + meal.id}`}>
                          <p className={styles.name}>
                            {meal.name} X <span>{meal.quantity}</span>
                          </p>
                          <p className={styles.price}>{meal.price}</p>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Orders;
