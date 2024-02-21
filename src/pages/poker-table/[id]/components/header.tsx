import React, { useState } from "react";
import styles from "../../../../styles/components/poker-table.module.scss";
import stylesC from "../../../../styles/components/user-card.module.scss";
import { usePartyContext } from "@/hooks/usePartyContext";
import { useUserContext } from "@/hooks/useUserContext";
import TypeModal from "./type-modal";

const Header = () => {
  const { classroomName, setInvitationBlur, socket } = usePartyContext();
  const { userNameContext, setRolConText } = useUserContext();
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);

  function handleUpdateUser(type: any) {
    socket.emit("update-player", { type });
    /* setModal(null)
        setTypeOfPlayer(type) */
  }

  const handleButtonClick = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };

  const handleOpcionClick = (opcion: string) => {
    // Aquí puedes manejar la lógica cuando se hace clic en una opción
    console.log(`Se seleccionó la opción: ${opcion}`);
    // Puedes agregar más lógica según la opción seleccionada
  };

  return (
  <>
  {/* <TypeModal></TypeModal> */}
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
        {mostrarDesplegable &&
         <div className={styles["container__user-display"]}>
            <p className={styles["container__user-display-text"]}>Cambiar visualizacion</p> 
            <p className={styles["container__user-display-text"]}>Cambiar juego</p>
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
