import styles from "./Loader.module.css";
const Loader = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner} />
    </div>
  );
};
export default Loader;
