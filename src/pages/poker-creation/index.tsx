import React, { useState } from "react";
import InputAtom from "@/system-design/atoms/input";
import ButtonAtom from "@/system-design/atoms/button";
import styles from '../../styles/poker-creation.module.scss';
import usePartyNameValidation from "@/hooks/usePartyNameValidation";
import { useCreateParty } from "@/hooks/useCreateParty";

const Index = () => {
  const [partyName, setPartyName] = useState("");
  const { validate } = usePartyNameValidation(partyName);
  const { createParty} = useCreateParty()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartyName(event.target.value);
  };

  const handleCreateParty = () => {
    if (!validate.length) {
      createParty(partyName)
    } 
  };

  return (
    <div>
      <header className={'upper-container'}>
        <img className={'party-logo'} src="/images/ficha-de-poker.png" />
        <h3 className={styles['logo-title']}>Crear Partida</h3>
      </header>
      <main className={styles['modal']}>
        <h3 className={styles['modal-title']}>Nombra la partida</h3>
        <InputAtom
          role="input" 
          id={partyName}
          type="text"
          value={partyName}
          onChange={handleInputChange}
        />
        <ButtonAtom
        role="click"
          className={`${styles['modal-button']} ${
            validate.length ? styles['modal-button__disabled'] : ""
          }`}
          onClick={handleCreateParty}
        >
          Crear Partida
        </ButtonAtom>
        <div className={styles['validate-message']}>
          {validate.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
