import React, { useEffect, useState } from 'react';
import styles from "../../../../styles/components/invitation-modal.module.scss"
import ButtonAtom from "@/system-design/atoms/button";

const InvitationModal = () => {
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
    }, []);

    return (
        <div className={`${styles["container"]} ${styles["container__blur"]}`}>
            <div className={`${styles["container__modal"]} `}>
                <div className={`${styles["container__title"]} `}>
                    <h3 className={styles["container__title-text"]}>Invitar jugadores</h3>
                    <h3 className={styles["container__title-exit"]}>X</h3>
                </div>
                <p className={`${styles["container__link"]} `}>{currentUrl}</p>
                <ButtonAtom className={`${styles["container__button"]} `} >Copiar link</ButtonAtom>
            </div>
        </div>
    );
};

export default InvitationModal;
