import React, { useState } from "react";
import styles from "../../../../styles/components/poker-table.module.scss";
import stylesC from "../../../../styles/components/user-card.module.scss";
import { usePartyContext } from "@/hooks/usePartyContext";
import { useUserContext } from "@/hooks/useUserContext";
import TypeModal from "./type-modal";
import SocoreTypeModal from "./socore-type-modal";

const Header = () => {
  const { classroomName, setInvitationBlur } = usePartyContext();
  const { userNameContext } = useUserContext();
  const [showOptions, setShowOptions] = useState(false);
  const [handleModal, setHandleModal] = useState(false)
  const [scoreModal, setScoreModal] = useState(false)

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const handleButtonClickModal = () => {
    setHandleModal(!handleModal);
    setShowOptions(!showOptions);
  };

  const handleScoreClickModal = () => {
    setScoreModal(!handleModal);
    setShowOptions(!showOptions);
  };

  const closeModal = () => {
    setHandleModal(false);
    setScoreModal(false);
};

  return (
  <>
  {handleModal && <TypeModal onClose={closeModal} />}
  {scoreModal && <SocoreTypeModal onClose={closeModal} />}
  <header>
      <img
        className={`${styles["container__logo"]}`}
        src="/images/ficha-de-poker.png"
      />
      <h1 className={`${styles["container__title"]}`}>{classroomName}</h1>
      <div className={`${styles["container__user"]}`}>
        <button className={styles["container__user-button"]} onClick={handleButtonClick}>
            <div className={`${stylesC["card__spectator"]} ${stylesC["card__spectator-size"]}`} >
                <p>{userNameContext.slice(0, 2).toUpperCase()}</p>
            </div>
        </button>
        {showOptions &&
         <div className={styles["container__user-display"]}>
            <p onClick={() => handleButtonClickModal()} className={styles["container__user-display-text"]}>Cambiar visualizacion</p> 
            <p onClick={() => handleScoreClickModal()} className={styles["container__user-display-text"]}>Cambiar juego</p>
        </div> }
        <button
          onClick={() => setInvitationBlur(true)}
          className={`${styles["container__user-invite"]}`}
        >
          Invitar jugadores
        </button>
      </div>
    </header>
  </>
    
  );
};

export default Header;
