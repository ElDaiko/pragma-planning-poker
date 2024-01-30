import React, { FC, useState } from "react";

const Index: FC = () => {
  const [partyName, setPartyName] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartyName(event.target.value);
  };

  const handleCreateParty = () => {
    if (!isButtonDisabled) {
      console.log(partyName);
    }
    else{
      console.log("error");
    }
  };

  const isButtonDisabled =
    partyName.trim() === "" ||
    !(
      partyName.length >= 5 &&
      partyName.length <= 20 &&
      /^[a-zA-Z0-9 ]+$/.test(partyName) &&
      (partyName.match(/\d/g) || []).length <= 3 &&
      isNaN(Number(partyName))
    );

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
            isButtonDisabled ? "party-button__disabled" : ""
          }`}
          onClick={handleCreateParty}
        >
          Crear una Partida
        </button>
      </main>
    </div>
  );
};

export default Index;
