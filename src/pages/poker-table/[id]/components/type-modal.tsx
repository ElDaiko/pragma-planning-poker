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
                    <h3>Modo visualización</h3>
                </div>
                <div className={`${styles["container__mode"]} `}>
                    <div role='mode-player' onClick={() => handleUpdateUser('player')} className={styles["container__mode-player"]}>
                        <p>♥️</p>
                    </div>
                    <div role='mode-spectator' onClick={() => handleUpdateUser('spectador')} className={styles["container__mode-spectator"]}>
                        <p style={{ fontWeight: '200' }}>👁</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TypeModal;
