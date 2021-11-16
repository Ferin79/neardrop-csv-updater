import React, { useContext } from "react";
import { CSVDownloader } from "react-papaparse";
import { Context, ContextType } from "../data/Context";
import styles from "../styles/Download.module.css";
import { getFormattedUrl } from "./Redirect";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";

interface CSVDownloaderProps {}

const CSVDownloaderComponent: React.FC<CSVDownloaderProps> = () => {
  const {
    fileData,
    redirectInput,
    isChecked,
    uploadedFile,
    setFileData,
    setRedirectInput,
    setIsChecked,
    setUploadedFile,
  } = useContext(Context) as ContextType;

  const getDownloadFileData = () => {
    let data = [...fileData];
    if (isChecked) {
      data.shift();
    }

    data = data.filter((item) => {
      item.link = getFormattedUrl(item.link, redirectInput);
      return item;
    });

    return data;
  };

  return (
    <div className={styles.downloadWrapper}>
      {redirectInput.trim().length && uploadedFile ? (
        <CSVDownloader
          className={styles.form__button}
          data={getDownloadFileData}
          type="button"
          filename={`${uploadedFile.name.split(".")[0] || "file"}_updated`}
        >
          Download
        </CSVDownloader>
      ) : (
        <button className={styles.form__button2} onClick={() => {}}>
          {<AiOutlineCloudDownload color={"white"} size={25} />}
          <span style={{ marginLeft: 5 }}>Download</span>
        </button>
      )}
      <button
        className={styles.form__button3}
        onClick={() => {
          setFileData([]);
          setIsChecked(true);
          setRedirectInput("");
          setUploadedFile(null);
        }}
      >
        {<BiHistory color={"red"} size={18} />}
        <span style={{ marginLeft: 5, fontSize: 16 }}>Reset</span>
      </button>
    </div>
  );
};
export default CSVDownloaderComponent;
