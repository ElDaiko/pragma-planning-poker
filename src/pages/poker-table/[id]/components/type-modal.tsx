import React from 'react';
import styles from "../../../../styles/components/type-modal.module.scss"
import { usePartyContext } from '@/hooks/usePartyContext';
import { useUserContext } from '@/hooks/useUserContext';

const TypeModal = ({ onClose }:any) => {

    const { socket } = usePartyContext();
    const {setRolConText} = useUserContext();

    function handleUpdateUser(type: any) {
        socket.emit("update-player", { type });
        setRolConText(type)
        onClose();
      }

    return (
        <div className={`${styles["container"]} ${styles["container__blur"]}`}>
            <div className={`${styles["container__modal"]} `}>
                <div className={`${styles["container__title"]} `}>
                    <h3 className={`${styles["container__title__text2"]}`}>Modo visualización</h3>
                    <h3 onClick={() => onClose()} className={`${styles["container__title__exit"]} `}>X</h3>
                </div>
                <div className={`${styles["container__mode"]} `}>
                    <div className={`${styles["container__card"]} `}>
                        <div role='mode-player' onClick={() => handleUpdateUser('player')} className={styles["container__mode-player"]}>
                            <p>♥️</p>
                        </div>
                        <p>Jugador</p>
                    </div>
                    <div className={`${styles["container__card"]} `}>
                        <div role='mode-spectator' onClick={() => handleUpdateUser('spectador')} className={styles["container__mode-spectator"]}>
                            <p style={{ fontWeight: '200' }}>👁</p>
                        </div>
                        <p>Espectador</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TypeModal;
