import React from 'react';
import styles from "../../../../styles/components/type-modal.module.scss"
import { usePartyContext } from '@/hooks/usePartyContext';

const SocoreTypeModal = ({ onClose }:any) => {

    const { socket, globalTypeOfScores } = usePartyContext();
    console.log(globalTypeOfScores);
    

    function handleUpdateScore(score: any) {
        console.log(score);
        socket.emit("change-type-of-score", { typeOfScores: score })
        onClose();
      }

    return (
        <div className={`${styles["container"]} ${styles["container__blur"]}`}>
            <div className={`${styles["container__modal"]} `}>
                <div className={`${styles["container__title"]} `}>
                    <h3>Modo visualización</h3>
                </div>
                <div className={`${styles["container__mode"]} `}>
                    <div onClick={() => handleUpdateScore('power-of-two')} className={styles["container__mode-player"]}>
                        <p>power</p>
                    </div>
                    <div onClick={() => handleUpdateScore('fibonacci')} className={styles["container__mode-spectator"]}>
                        <p style={{ fontWeight: '200' }}>fibo</p>
                    </div>
                    <div onClick={() => handleUpdateScore('lineal')} className={styles["container__mode-spectator"]}>
                        <p style={{ fontWeight: '200' }}>lineal</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SocoreTypeModal;
