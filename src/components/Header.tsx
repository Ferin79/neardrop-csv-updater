import React from "react";
import styles from "../styles/Header.module.css";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className={styles.HeaderWrapper}>
      <p style={{ fontSize: 20, color: "white", fontWeight: 600 }}>
        Add Redirects to a NearDrop CSV
      </p>
      <p style={{ color: "rgba(255, 255, 255, 1)", fontSize: 12 }}>
        Upload your neardrop CSV
      </p>
    </div>
  );
};
export default Header;
