import React, { useEffect } from "react";
import Head from "next/head";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Layout.module.css";
import { useRouter } from "next/router";

const Layout = ({
  title = "secure note",
  description = "secure note description",
  keywords = "secure note",
  url = "",
  image = "",
  children,
}) => {
  const router = useRouter();
  // logged in user
  const { user, userStored } = useSelector((store) => store.authLogin);
  const loggedInUser = user ? user : userStored ? userStored : null;

  useEffect(() => {
    if (!loggedInUser) {
      router.push("/");
    }
  }, [router, loggedInUser]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={url}></link>
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="secure note"></meta>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={image ? image : "defaultImaageurl"}
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:site" content="secure note"></meta>
        <link rel="icon" href="/sample.ico" />
      </Head>
      <Header user={loggedInUser} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <main className={`${styles.main}`}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
