import React from 'react';
import styles from "../../../../styles/components/type-modal.module.scss"

const TypeModal = () => {
    return (
        <div className={`${styles["container"]} ${styles["container__blur"]}`}>
            <div className={`${styles["container__modal"]} `}>
                <div className={`${styles["container__title"]} `}>
                    <h3>Modo visualización</h3>
                </div>
                <div className={`${styles["container__mode"]} `}>
                    <div className={styles["container__mode-player"]}>
                        <p>♥️</p>
                    </div>
                    <div className={styles["container__mode-spectator"]}>
                        <p style={{ fontWeight: '200' }}>👁</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TypeModal;
