import { useRouter } from "next/router";
import React, { useState } from "react";
import usePartyNameValidation from "@/hooks/usePartyNameValidation";
import styles from "../../styles/poker-table.module.scss";
import InputAtom from "@/system-design/atoms/input";
import ButtonAtom from "@/system-design/atoms/button";

const Index = () => {
  const router = useRouter();
  const { partyName } = router.query;
  const [userName, setUserName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [blur, setBlur] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleCreateParty = () => {
    if ( selectedOption != "" && !validate.length) {
      console.log(partyName);
      console.log(userName);
      console.log(selectedOption);
      setBlur(true);
    }
  };

  const { validate } = usePartyNameValidation(userName, selectedOption, true);

  return (
    <div>
      <header className={"upper-container"}>
        <img className={"party-logo"} src="/images/ficha-de-poker.png" />
      </header>

      {!blur ? (
        <div className={`${styles["card__blur"]}`}>
          <section
            className={`${styles["container-party"]} ${styles["container-border__glow"]}`}
          >
            <h3 className={styles["card-title__h3"]}>Tu nombre</h3>
            <InputAtom
              id={userName}
              type="text"
              value={userName}
              onChange={handleInputChange}
            />
            <div className={`${styles["card-radioInput__position"]}`}>
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
      ) : (
        <></>
      )}
      <section className={styles["table-container"]}>
        <div className={styles["table1"]}></div>
        <div className={styles["table2"]}></div>
        <div className={styles["table3"]}></div>
      </section>
      <section>
        <h1>CARTAS</h1>
      </section>
      <div className={styles["map-message__position"]}>
        {validate.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
};

export default Index;
