import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p className={styles.eyebrow}>CramBudy</p>
        <div className={styles.intro}>
          <h1>Study what matters most.</h1>
          <p>
            CramBudy will help you turn your course materials into a focused
            study session.
          </p>
        </div>
        <p className={styles.status}>Setup complete. Uploads are coming in Step 1.</p>
      </main>
    </div>
  );
}
