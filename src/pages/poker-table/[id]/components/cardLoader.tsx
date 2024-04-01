import React from "react";
import styles from "../../../../styles/components/cardLoader.module.scss";

const CardLoader = () => {
  return (
    <div className={styles["ball-loader"]}>
      <div className={`${styles["ball-loader-ball"]} ${styles["ball1"]}`}></div>
      <div className={`${styles["ball-loader-ball"]} ${styles["ball2"]}`}></div>
      <div className={`${styles["ball-loader-ball"]} ${styles["ball3"]}`}></div>
    </div>
  );
};

export default CardLoader;
