import React, { useState } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

const Home = () => {
  const [active, setActive] = useState("login");

  return (
    <div className={styles.container}>
      <Head>
        <title>Secure note</title>
        <meta
          name="description"
          content="Secure note - Keeping your record secure"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full p-5 h-screen flex flex-col justify-center items-center bg-primary">
        <h1 className="text-[50px] text-white font-extrabold uppercase ">
          Secure Note
        </h1>
        {active === "login" ? (
          <Login setActive={setActive} />
        ) : (
          <Register setActive={setActive} />
        )}
      </main>
    </div>
  );
};

export default Home;
