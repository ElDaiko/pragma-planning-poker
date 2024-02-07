import React, { useState } from "react";
import InputAtom from "@/system-design/atoms/input";
import ButtonAtom from "@/system-design/atoms/button";
import { useRouter } from "next/router";
import styles from '../../styles/poker-creation.module.scss';
import usePartyNameValidation from "@/hooks/usePartyNameValidation";
import { useUserContext } from "@/hooks/useUserContext";

const Index = () => {
  const router = useRouter();
  const [partyName, setPartyName] = useState("");
  const { validate } = usePartyNameValidation(partyName);  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartyName(event.target.value);
  };

  const handleCreateParty = () => {
    if (!validate.length) {

      //   Petición  

      router.push(`/poker-table?partyName=${encodeURIComponent(partyName)}`);

    } else {
      alert("ERROR")
    }
  };

  return (
    <div>
      <header className={'upper-container'}>
        <img className={'party-logo'} src="/images/ficha-de-poker.png" />
        <h3 className={styles['party-h3']}>Crear Partida</h3>
      </header>
      <main className={styles['party-container']}>
        <h3 className={styles['party-container__title-h3']}>Nombra la partida</h3>
        <InputAtom 
          className={styles['party-container__input']}
          id={partyName}
          type="text"
          value={partyName}
          onChange={handleInputChange}
        />
        <ButtonAtom
          className={`${styles['party-container__button']} ${
            validate.length ? styles['party-button__disabled'] : ""
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
