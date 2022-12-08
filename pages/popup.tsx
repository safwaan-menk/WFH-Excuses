import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Popup.module.css";
import { useState, useEffect } from "react";
import { json } from "stream/consumers";

export default function Popup(props: any) {
  console.log(JSON.stringify(props));
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <div className={styles.card}>
          <span
            className={styles.closeIcon}
            onClick={() => props.handleClose(false)}
          >
            x
          </span>
          <h2> {props.content} </h2>
          <span> &#128077;</span>
          <span>&#128078;</span>
        </div>
      </div>
    </main>
  );
}
