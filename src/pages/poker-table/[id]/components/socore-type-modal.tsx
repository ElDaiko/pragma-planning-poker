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
                    <h3>Modo de Juego</h3>
                </div>
                <div className={`${styles["container__mode"]} `}>
                    <div className={styles['container_score']} onClick={() => handleUpdateScore('power-of-two')}>
                        <div className={styles['container_score-icons']}>🂡</div>
                        <p>Power</p>
                    </div>
                    <div className={styles['container_score']} onClick={() => handleUpdateScore('fibonacci')}>
                        <div className={styles['container_score-icons']}>🂢</div>
                        <p>Fibonacci</p>
                    </div>
                    <div className={styles['container_score']} onClick={() => handleUpdateScore('lineal')}>
                        <div className={styles['container_score-icons']}>🂣</div>
                        <p>Lineal</p>
                    </div>         
                </div>
            </div>
        </div>
    );
}

export default SocoreTypeModal;
