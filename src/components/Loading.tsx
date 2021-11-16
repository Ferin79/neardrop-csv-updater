import React from "react";
import BounceLoader from "react-spinners/BounceLoader";
import styles from "../styles/Loading.module.css";

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <div className={styles.loadingWrapper}>
      <BounceLoader color="#0AF" size={100} />
      <p className={styles.loadingText}>Loading File</p>
    </div>
  );
};
export default Loading;
