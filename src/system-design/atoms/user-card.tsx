import React from "react";
import styles from "../../styles/components/user-card.module.scss";
import { useUserContext } from "@/hooks/useUserContext";

export default function Usercard({ className, ...props }: any) {

  const { userNameContext} = useUserContext();

  return (
    <>
      <div {...props} className={`${styles["card-container"]} ${className}`}>
        <div className={`${styles["card"]}`}></div>
        <p>{userNameContext}</p>
      </div>
    </>
  );
}
