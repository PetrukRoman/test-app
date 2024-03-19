import { useContext } from "react";
import Button from "../../components/Button/Button";
import OrderItem from "../../components/OrderItem/OrderItem";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./Order.module.css";
import { ModalContext, ModalContextType } from "../../context/modalContext";
import { useMutation } from "@tanstack/react-query";
import { OrderData } from "../../types";
import { clearCart } from "../../store/cartSlice";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { createOrder } from "../../services/firebase";
import InputGroup from "../../components/Input/Input";
import { Select, Option } from "../../components/Select/Select";
import { queryClient } from "../../util/queryClient";
import UseInput from "../../hooks/useInput";
import { isNotEmpty } from "../../util/validation";
import useSelect from "../../hooks/useSelect";
import useForm from "../../hooks/useForm";
import OrderConfirm from "../../components/OrderConfirm/OrderConfirm";
import { useTranslation } from "react-i18next";

const Order = () => {
  const { t } = useTranslation();
  const { token, userId } = useContext(AuthContext) as AuthContextType;
  const { items, subTotal } = useAppSelector((state) => state.cart);
  const { openOrderConfirm } = useContext(ModalContext) as ModalContextType;
  const dispath = useAppDispatch();

  const {
    data,
    mutate,
    isPending,
    isError: isRequestError,
    error: requestError,
  } = useMutation({
    mutationFn: (data: OrderData) => createOrder(token as string, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      openOrderConfirm();
      dispath(clearCart());
      addressInput.resetInput();
      paymentSelect.resetSelect();
    },
  });

  const addressInput = UseInput({
    defaulftValue: "",
    validFunc: (value: string) => {
      return isNotEmpty(value);
    },
  });
  const paymentSelect = useSelect("");

  const { hasFieldsErrors, checkFormValid } = useForm([addressInput, paymentSelect]);

  const handleCreateOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidForm = checkFormValid();

    if (!isValidForm) return;
    mutate({
      userId,
      items,
      address: addressInput.value,
      payment: paymentSelect.value,
    });
  };

  return (
    <>
      <OrderConfirm orderNumber={data} />
      <div className={styles.container}>
        {items.length === 0 ? (
          <h1 className={styles.heading}>{t("CartIsEmty.key")}</h1>
        ) : (
          <div className={styles.row}>
            <div className={styles.mealsContainer}>
              <h2 className={styles.heading}>{t("Cart.key")}</h2>
              <ul>
                {items.map((item) => {
                  return (
                    <li key={item.id}>
                      <OrderItem item={item} />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.subTotalContainer}>
              <h2 className={styles.heading}>{t("Checkout.key")}</h2>
              <p>
                {t("Subtotal.key")}: <span>{subTotal}</span>
              </p>
              <form className={styles.form} onSubmit={(event) => handleCreateOrder(event)}>
                <InputGroup
                  label={t("Address.key")}
                  id="address"
                  name="address"
                  value={addressInput.value}
                  onChange={addressInput.handleInputChange}
                  onBlur={addressInput.handleInputBlur}
                  error={{
                    isError: addressInput.error,
                    message: t("InvalidAddress.key"),
                  }}
                />
                <Select
                  label={t("Payment.key")}
                  name="payment"
                  value={paymentSelect.value}
                  onChange={paymentSelect.handleSelectChange}
                  onBlur={paymentSelect.handleSelectBlur}
                  error={{
                    isError: paymentSelect.error,
                    message: t("InvalidPayment.key"),
                  }}
                >
                  <Option value="">{t("ChoosePayment.key")}</Option>
                  <Option value="card">{t("Card.key")}</Option>
                  <Option value="cash">{t("Cash.key")}</Option>
                </Select>

                <div className={styles.cta}>
                  {isRequestError && <p> {requestError.message}</p>}
                  <Button variant="filled" size="fill" disabled={hasFieldsErrors || isPending || items.length === 0}>
                    {isPending ? t("Loading.key") : t("PlaceOrder.key")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Order;
