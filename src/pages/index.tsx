import React, { FC, useState, useEffect } from "react";

const Index: FC = () => {
  const [partyName, setPartyName] = useState<string>("");
  const [validate, setValidate] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartyName(event.target.value);
  };

  const handleCreateParty = () => {
    if (!validate.length) {
      console.log(partyName);
    } else {
      console.log("error");
    }
  };

    useEffect(() => {
      const errors: string[] = [];
  
      if (partyName.trim() === "") {
        errors.push("El nombre de la partida no puede estar vacío.");
      }
      if (!/^[a-zA-Z0-9 ]+$/.test(partyName) && !(partyName.trim() === "")){
        errors.push("\n No puede tener caracteres especiales. ")
      }
      if (!isNaN(Number(partyName)) && !(partyName.trim() === "")) {
        errors.push("\n No pueden contener solo números")
      }
      if (!((partyName.match(/\d/g) || []).length <= 3)){
        errors.push("\n Debe tener menos de tres números")
      }
      if (!(partyName.length >= 5)){
        errors.push("\n Debe contener más de cinco caracteres")
      }
      if (!(partyName.length <= 20)){
        errors.push("\n Debe de contener menos de veinte caracteres")
      }

  
      setValidate(errors);
    }, [partyName]);

  return (
    <div>
      <img className="party-logo" src="/images/ficha-de-poker.png" />
      <main className="party-container">
        <h3 className="party-container__title-h3">Nombra la partida</h3>
        <input
          className="party-container__input"
          type="text"
          value={partyName}
          onChange={handleInputChange}
        />
        <button
          className={`party-container__button ${
            validate.length ? "party-button__disabled" : ""
          }`}
          onClick={handleCreateParty}
        >
          Crear una Partida
        </button>
        <div>
          {validate.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;