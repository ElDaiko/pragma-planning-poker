import React, { FC } from "react";

const Index:FC = () => {
  return (
    <div>
      <img className="party-logo" src="/images/ficha-de-poker.png" />
      <main className="party-container">
        <h3 className="party-container__title-h3">Nombra la partida</h3>
        <input className="party-container__input" type="text" />
        <button className="party-container__button">Crear una Partida</button>
      </main>
    </div>
  );
};

export default Index;