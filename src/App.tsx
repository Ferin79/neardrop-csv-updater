import React, { useContext } from "react";
import CSVDownloaderComponent from "./components/CSVDownloader";
import Dropzone from "./components/Dropzone";
import Loading from "./components/Loading";
import Redirect from "./components/Redirect";
import { Context, ContextType } from "./data/Context";
import styles from "./styles/App.module.css";
import { ToastProvider } from "react-toast-notifications";
import Header from "./components/Header";

const App: React.FC = () => {
  const { isFileLoading } = useContext(Context) as ContextType;

  if (isFileLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.App}>
      <ToastProvider>
        <div className={styles.content}>
          <Header />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Dropzone />
            <Redirect />
            <CSVDownloaderComponent />
          </div>
        </div>
      </ToastProvider>
    </div>
  );
};

export default App;
