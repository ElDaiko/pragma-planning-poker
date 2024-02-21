import React, { useEffect, useState } from 'react';
import styles from "../../../../styles/components/invitation-modal.module.scss"
import ButtonAtom from "@/system-design/atoms/button";
import { usePartyContext } from '@/hooks/usePartyContext';

const InvitationModal = () => {
    const [currentUrl, setCurrentUrl] = useState('');
    const { setInvitationBlur} = usePartyContext();

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
                    <h3 onClick={() => setInvitationBlur(false)} className={styles["container__title-exit"]}>X</h3>
                </div>
                <div className={`${styles["container__link"]} `}>
                    <p className={styles["container__link-text"]}>{currentUrl}</p>
                </div>
                <ButtonAtom  onClick={() => navigator.clipboard.writeText(currentUrl)} className={`${styles["container__button"]} `}>Copiar link</ButtonAtom>
            </div>
        </div>
    );
};

export default InvitationModal;
