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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleCreateParty = () => {
    console.log(userName);
  };

  /* const { validate } = usePartyNameValidation(partyName); */

  return (
    <div>
      <header className={"upper-container"}>
        <img className={"party-logo"} src="/images/ficha-de-poker.png" />
      </header>
      <main
        className={`${styles["party-container"]} ${styles["glowing-border"]}`}
      >
        <h3 className={styles["user-container__title-h3"]}>Tu nombre</h3>
        <InputAtom
          id={userName}
          type="text"
          value={userName}
          onChange={handleInputChange}
        />
        <div className={`${styles["poker-radio_flex"]}`}>
          <p>Jugador</p>
          <input className={`${styles["my-radio-input"]}`}></input>
          <p style={{ marginLeft: '40px' }}>Espectador</p>
          <input className={`${styles["my-radio-input"]}`}></input>
        </div>
        <ButtonAtom
          className={`${styles["user-container__button"]}`}
          onClick={handleCreateParty}
        >
          Continuar
        </ButtonAtom>
        {/* <div className={styles['validate-message']}>
          {validate.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div> */}
      </main>
    </div>
  );
};

export default Index;
