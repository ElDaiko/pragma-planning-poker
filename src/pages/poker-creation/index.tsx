import React, { useState, useEffect } from "react";
import InputAtom from "@/system-design/atoms/input";
import { useRouter } from "next/router";
import styles from '../../styles/poker-creation.module.scss';

const Index = () => {
  const [partyName, setPartyName] = useState("");
  const [validate, setValidate] = useState<string[]>([]);
  const [hasInitialValidation, setHasInitialValidation] = useState(false);
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartyName(event.target.value);
  };

  const handleCreateParty = () => {
    if (!validate.length) {
      console.log(partyName);
      router.push(`/poker-table?partyName=${encodeURIComponent(partyName)}`);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    const errors: string[] = [];

    if (partyName.trim() !== "") {
      setHasInitialValidation(true);
    }
    if (!hasInitialValidation) {
      errors.push("");
    }
    if (partyName.trim() === "" && hasInitialValidation) {
      errors.push("El nombre de la partida no puede estar vacío.");
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(partyName) && !(partyName.trim() === "")) {
      errors.push("\n No puede tener caracteres especiales. ");
    }
    if (!isNaN(Number(partyName)) && !(partyName.trim() === "")) {
      errors.push("\n No pueden contener solo números");
    }
    if (!((partyName.match(/\d/g) || []).length <= 3)) {
      errors.push("\n Debe tener menos de tres números");
    }
    if (!(partyName.length >= 5) && !(partyName.trim() === "")) {
      errors.push("\n Debe contener más de cinco caracteres");
    }
    if (!(partyName.length <= 20)) {
      errors.push("\n Debe de contener menos de veinte caracteres");
    }

    setValidate(errors);
  }, [partyName, hasInitialValidation]);

  return (
    <div>
      <div className={styles['upper-container']}>
        <img className={styles['party-logo']} src="/images/ficha-de-poker.png" />
        <h3 className={styles['party-h3']}>Crear Partida</h3>
      </div>
      <main className={styles['party-container']}>
        <h3 className={styles['party-container__title-h3']}>Nombra la partida</h3>
        <InputAtom
          id={partyName}
          type="text"
          value={partyName}
          onChange={handleInputChange} 
        />
        <button
          className={`${styles['party-container__button']} ${
            validate.length ? styles['party-button__disabled'] : ""
          }`}
          onClick={handleCreateParty}
        >
          Crear Partida
        </button>
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
