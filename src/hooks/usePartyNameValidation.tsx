import { useState, useEffect } from 'react';

interface PartyNameValidationHook {
  validate: string[];
  hasInitialValidation: boolean;
  additionalError?: string;
  poker?: boolean;
}

const usePartyNameValidation = (partyName: string, additionalError?: string, poker?: boolean): PartyNameValidationHook => {
  const [validate, setValidate] = useState<string[]>([]);
  const [hasInitialValidation, setHasInitialValidation] = useState<boolean>(false);

  useEffect(() => {
    const errors = [];

    if (partyName != undefined && partyName.trim() !== "") {
      setHasInitialValidation(true);
    }

    if (!hasInitialValidation) {
      errors.push("");
    }

    if (partyName != undefined && partyName.trim() === "" && hasInitialValidation) {
      errors.push("El nombre de la partida no puede estar vacío.");
    }

    if (partyName != undefined && !/^[a-zA-Z0-9 ]+$/.test(partyName) && !(partyName.trim() === "")) {
      errors.push("\n No puede tener caracteres especiales. ");
    }

    if (partyName != undefined && !isNaN(Number(partyName)) && !(partyName.trim() === "")) {
      errors.push("\n No pueden contener solo números.");
    }

    if (partyName != undefined && !((partyName.match(/\d/g) || []).length <= 3)) {
      errors.push("\n Debe tener menos de tres números.");
    }

    if (partyName != undefined && !(partyName.length >= 5) && !(partyName.trim() === "")) {
      errors.push("\n Debe contener más de cinco caracteres.");
    }

    if (partyName != undefined && !(partyName.length <= 20)) {
      errors.push("\n Debe de contener menos de veinte caracteres.");
    }

    if (poker && additionalError === "" && hasInitialValidation) {
      errors.push("\n Debes de escoger entre jugador o espectador.");
    }

    setValidate(errors);
  }, [partyName, hasInitialValidation, additionalError]);

  return { validate, hasInitialValidation, additionalError };
};

export default usePartyNameValidation;





