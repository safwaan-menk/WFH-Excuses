import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Popup from "./popup";

export default function Home() {
  const [goodExcuses, setGoodExcuses] = useState("");
  const [badExcuses, setBadExcuses] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [promptResponse, setPromptResponse] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // call generate and pass in good excuses and bad excuses

  const generateInput = async (goodExcuses: any, badExcuses: any) => {
    setIsOpen(false);
    setIsLoading(true);
    const body = {
      goodExcuses: goodExcuses,
      badExcuses: badExcuses,
    };

    const respponse = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application-json" },
      body: JSON.stringify(body),
    });

    const data = await respponse.json();
    const { output } = data;
    //console.log(`${output}`);

    setPromptResponse(`${output}`);
    setIsLoading(false);
    togglePopup(true);
  };

  const togglePopup = (open: boolean) => {
    if (open) setIsOpen(true);
    else {
      setIsOpen(false);
      setPromptResponse("");
    }
  };

  function readInputs(event: any, good: boolean) {
    if (good) {
      setGoodExcuses(event.target.value);
    } else {
      setBadExcuses(event.target.value);
    }
  }
  function submit(e: any) {
    generateInput(goodExcuses, badExcuses);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>WFH Excuse</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Hey, boss</h1>

        <p className={styles.description}>
          Can&apos;t come in today because
          <code className={styles.code}> ______________________</code>
        </p>

        <div className={styles.container2}>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h2>Good Excuses</h2>
              <textarea onChange={(event) => readInputs(event, true)} />
            </div>

            <div className={styles.card}>
              <h2>Bad Excuses</h2>
              <textarea onChange={(event) => readInputs(event, false)} />
            </div>
          </div>

          <div className={styles.button}>
            <button onClick={submit}> Click me! </button>
          </div>
        </div>
        {isOpen && <Popup content={promptResponse} handleClose={togglePopup} />}
      </main>
    </div>
  );
}
