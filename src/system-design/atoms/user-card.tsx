import React from "react";
import styles from "../../styles/components/user-card.module.scss";
import styles2 from "../../styles/components/user-card.module.scss";
import { usePartyContext } from "@/hooks/usePartyContext";

export default function Usercard({ className }: any) {
  const { playersList } = usePartyContext();
  

  return (
    <>
      {playersList.map((user) => (
        <div key={user._id} className={`${styles["card"]}`}>
          <div className={user.type === "spectador" ? styles2["card__spectator"] : (user.vote ? styles2["card__playerVote"] : styles2["card__player"])}>
            {user.type === "spectador" ? (
              <p>{user.username.slice(0, 2).toUpperCase()}</p>
            ) : null}
          </div>
          <p>{user.username}</p>
        </div>
      ))}
    </>
  );
}

