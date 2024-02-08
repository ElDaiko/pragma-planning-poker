import { useRouter } from "next/router";
import styles from "../../styles/poker-table.module.scss";
import { useUserContext } from "@/hooks/useUserContext";
import UserForm from "@/components/user-form";

const Index = () => {
  const router = useRouter();
  const { partyName } = router.query;
  const { userNameContext} = useUserContext();

  return (
    <div className={`${styles["table-container"]}`}>
      <header>
        <img
          className={`${styles["element1"]} ${styles["table-container-logo"]}`}
          src="/images/ficha-de-poker.png"
        />
        <h1
          className={`${styles["element2"]} ${styles["table-container-title"]}`}
        >
          {partyName}
        </h1>
        <button
          className={`${styles["element3"]} ${styles["invite-button"]}`}
        >
          Invitar
        </button>
      </header>
      <main>
        <div className={styles["top-chairs"]}>top-chairs</div>
        <div className={styles["desk"]}></div>
        <div className={styles["desk2"]}></div>
        <div className={styles["desk3"]}></div>
        <div className={styles["left-chair"]}>left-chair</div>
        <div className={styles["rigth-chair"]}>rigth-chair</div>
        <div className={styles["botton-chairs"]}>{userNameContext}</div>
      </main>
        <div className={styles["card-title"]}>
          <h2>Elige una carta 👇</h2>
        </div>
      <footer>
        <div className={styles["card-numbers"]}>
          0
        </div>
        <div className={styles["card-numbers"]}>
          1
        </div>
      </footer>
      <UserForm></UserForm>
    </div>
  );
};

export default Index;
