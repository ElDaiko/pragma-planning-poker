import { useState, useEffect } from 'react';

interface PartyNameValidationHook {
  validate: string[];
  hasInitialValidation: boolean;
}

const usePartyNameValidation = (partyName: string): PartyNameValidationHook => {
    const [validate, setValidate] = useState<string[]>([]);
    const [hasInitialValidation, setHasInitialValidation] = useState<boolean>(false);

useEffect(() => {
    const errors = [];

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

  return { validate, hasInitialValidation };
};

export default usePartyNameValidation;




