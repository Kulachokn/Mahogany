import React from "react";
import styles from "./Header/Header.module.css";

const Logo = () => {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 10V13" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M16 10V13" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M7 7L7 16" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M13 7L13 16" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M19 7L19 16" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M10 4L10 19" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
};

export default Logo;
