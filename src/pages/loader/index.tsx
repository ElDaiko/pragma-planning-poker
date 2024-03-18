import React from 'react';
import styles from "./loader.module.scss"

const Loader = () => {
    return (
        <div className={styles["loader__container"]}>
            <img className={styles["loader__img"]} src="/images/ficha-de-poker.png" />
            <img className={styles["loader__pragma"]} src="/images/image.png" />
        </div>
    );
}

export default Loader;
