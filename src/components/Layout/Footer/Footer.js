import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  const company =
    new Date().getFullYear() > 2021 && ` ${new Date().getFullYear()}`;
  return (
    <div className="w-full h-[80px] flex items-center justify-center bg-primary">
      <h2 className="text-white">&copy; {company}, Olaoluwa IBUKUN</h2>
    </div>
  );
};

export default Footer;
