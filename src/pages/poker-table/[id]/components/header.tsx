import React from 'react';
import styles from "../../../../styles/components/poker-table.module.scss";
import { usePartyContext } from '@/hooks/usePartyContext';

const Header = () => {

    const { classroomName, setInvitationBlur } =
    usePartyContext();

    return (
        <header>
          <img
            className={`${styles["container__logo"]}`}
            src="/images/ficha-de-poker.png"
          />
          <h1 className={`${styles["container__title"]}`}>{classroomName}</h1>
          <div className={`${styles["container__user"]}`}>
            <button>
              image
            </button>
            <button
              onClick={() => setInvitationBlur(true)}
              className={`${styles["container__user-invite"]}`}
            >
              Invitar jugadores
            </button>
          </div>
        </header>
    );
}

export default Header;
