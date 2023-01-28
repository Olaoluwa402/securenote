import React from "react";

import styles from "./Modal.module.css";

const ModalVariant_1 = ({ children, bgColor }) => {
  return (
    <div className={styles.container} style={{ backgroundColor: bgColor }}>
      {children}
    </div>
  );
};

export default ModalVariant_1;
