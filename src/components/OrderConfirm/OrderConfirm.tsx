import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { ModalContext, ModalContextType } from "../../context/modalContext";
import Modal from "../Modal/Modal";
import styles from "./OrderConfirm.module.css";
type Props = {
  orderNumber: string | undefined;
};
const OrderConfirm = ({ orderNumber }: Props) => {
  const { t } = useTranslation();
  const { isOrderConfirmOpen, closeOrderConfirm } = useContext(ModalContext) as ModalContextType;
  return (
    <Modal open={isOrderConfirmOpen} onClose={closeOrderConfirm}>
      <div className={styles.container}>
        <h2>{t("ThanksForOrder.key")}</h2>
        <p>
          {t("OrderNumber.key")}: №{orderNumber}
        </p>
      </div>
    </Modal>
  );
};
export default OrderConfirm;
