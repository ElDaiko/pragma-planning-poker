import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "../styles/components/user-form.module.scss";
import InputAtom from "@/system-design/atoms/input";
import ButtonAtom from "@/system-design/atoms/button";
import { useUserContext } from "@/hooks/useUserContext";
import usePartyNameValidation from "@/hooks/usePartyNameValidation";

const UserForm = () => {
  const router = useRouter();
  const [blur, setBlur] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const { userNameContext, setUsernameContext } = useUserContext();
  const { rolConText, setRolConText } = useUserContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  if (selectedOption === ""){
    setSelectedOption("jugador")
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleCreateParty = () => {
    if (selectedOption != "" && !validate.length) {
      setBlur(true);
    }
  };


  useEffect(() => {
    if (blur) {
      setUsernameContext(userName);
      setRolConText(selectedOption);
    }
  }, [userName, blur]);

  const { validate } = usePartyNameValidation(userName, selectedOption, true);

  return (
    <div>
      {!blur ? (
        <div className={`${styles["general-container"]}`}>
          <div className={`${styles["card__blur"]}`}>
            <section
              className={`${styles["container-party"]} ${styles["container-party__glow"]}`}
            >
              <h3 className={styles["card-title"]}>Tu nombre</h3>
              <InputAtom
                id={userName}
                type="text"
                value={userName}
                onChange={handleInputChange}
              />
              <div className={`${styles["card-radioInput__position"]}`} >
                <label>Jugador</label>
                <input
                  className={`${styles["card-radioInput"]}`}
                  type="radio"
                  value="jugador"
                  checked={selectedOption === "jugador"}
                  onChange={handleRadioChange}
                />

                <label style={{ marginLeft: "40px" }}>Espectador</label>
                <input
                  className={`${styles["card-radioInput"]}`}
                  type="radio"
                  value="espectador"
                  checked={selectedOption === "espectador"}
                  onChange={handleRadioChange}
                />
              </div>
              <ButtonAtom
                className={`${styles["card-button__size"]} ${
                  validate.length ? styles["card-button__disabled"] : ""
                }`}
                onClick={handleCreateParty}
              >
                Crear Partida
              </ButtonAtom>
            </section>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className={styles["map-message__position"]}>
        {validate.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
};

export default UserForm;
