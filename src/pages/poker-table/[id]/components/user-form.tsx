import { useRouter } from "next/router";
import React, { useState, useEffect, FormEvent } from "react";
import styles from "../../../../styles/components/user-form.module.scss";
import InputAtom from "@/system-design/atoms/input";
import ButtonAtom from "@/system-design/atoms/button";
import { useUserContext } from "@/hooks/useUserContext";
import usePartyNameValidation from "@/hooks/usePartyNameValidation";
import { usePartyContext } from "@/hooks/usePartyContext";

const UserForm = () => {
  const [blur, setBlur] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const { setUsernameContext, setRolConText, setPartyContext, userNameContext } = useUserContext();
  const { socket, playersList } = usePartyContext();
  const router = useRouter();


  const obtenerIdUsuarioActual = () => {
    if (playersList.length > 0) {
      const usuarioActual = playersList.find(player => player.socketID === socket.id);
      if (usuarioActual) {
        const idUsuarioActual = usuarioActual._id;
        giveAdmin(idUsuarioActual);
      }
    }
  };


  function giveAdmin(idUsuario:any) {
    console.log(idUsuario);
    socket.emit("add-admin",  idUsuario )
    /* setConfirmationModal(false) */
}

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  if (selectedOption === "") {
    setSelectedOption("jugador");
  }
  

  const handleCreateParty = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)); //vuelve los inputs del formulario en un objeto literal
    if (data.type != "" && !validate.length) {
      setBlur(true);
      setRolConText(data.type);      
      setUsernameContext(username);
      socket.emit("join-classroom", {
        username,
        type: data.type,
        roomID: router.query.id,
      });
    }
  };

  const { validate } = usePartyNameValidation(username, selectedOption, true);

  return (
    <div>
      {!blur ? (
        <div className={`${styles["general-container"]}`}>
          <div className={`${styles["modal__blur"]}`}>
            <form onSubmit={handleCreateParty}
              className={`${styles["modal"]} ${styles["modal-border__glow"]}`}
            >
              <h3 className={styles["modal-title"]}>Tu nombre</h3>
              <InputAtom
                name="username"
                id={username}
                type="text"
                value={username}
                onChange={handleInputChange}
              />
              <div className={`${styles["modal-radioInput__position"]}`}>
                <label>Jugador</label>
                <input
                  name="type"
                  className={`${styles["modal-radioInput"]}`}
                  defaultChecked
                  type="radio"
                  value="player"
                />

                <label style={{ marginLeft: "40px" }}>Espectador</label>
                <input
                  name="type"
                  className={`${styles["modal-radioInput"]}`}
                  type="radio"
                  value="spectador"
                />
              </div>
              
              <ButtonAtom
                className={`${styles["modal-button"]} ${
                  validate.length ? styles["modal-button__disabled"] : ""
                }`}
                onClick={() => obtenerIdUsuarioActual()}
              >
                Crear Partida
              </ButtonAtom>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserForm;
