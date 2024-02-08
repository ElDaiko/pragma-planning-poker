import React from "react";
import styles from "../../styles/components/user-card.module.scss";
import { useUserContext } from "@/hooks/useUserContext";

export default function Usercard({ className, ...props }: any) {

  const { userNameContext} = useUserContext();
  return (
    <>
      <div className={`${styles["card-container"]}`}>
        <div {...props} className={`${className}`}></div>
        <p>{userNameContext}</p>
      </div>
    </>
  );
}
