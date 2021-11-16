import React, { useContext, useRef } from "react";
import { CSVReader } from "react-papaparse";
import { Context, ContextType } from "../data/Context";
import styles from "../styles/Dropzone.module.css";

const CSVReaderCompoment: React.FC = () => {
  const buttonRef = useRef(null);

  const { setFileData } = useContext(Context) as ContextType;

  const handleOnFileLoad = (data: any) => {
    console.log(data);
    setFileData(data);
  };

  const handleOnError = (err: any) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data: any) => {
    console.log(data);
  };

  return (
    <div className={styles.dropzoneStyle}>
      <p className={styles.dropHeader}>Basic Upload</p>
      <CSVReader
        ref={buttonRef as any}
        onFileLoad={handleOnFileLoad}
        onError={handleOnError}
        onRemoveFile={handleOnRemoveFile}
        addRemoveButton
        accept=".csv"
        style={{
          dropArea: {
            borderColor: "#0AF",
            borderRadius: 25,
            width: "75%",
            height: 125,
            padding: 10,
          },
          dropAreaActive: {
            borderColor: "red",
          },
          dropFile: {
            width: "auto",
            height: 125,
            background: "#0AF",
          },
          fileSizeInfo: {
            color: "#fff",
            backgroundColor: "#000",
            borderRadius: 3,
            lineHeight: 1,
            marginBottom: "0.5em",
            padding: "0 0.4em",
          },
          fileNameInfo: {
            color: "#fff",
            borderRadius: 3,
            fontSize: 14,
            lineHeight: 1,
            padding: "0 0.4em",
          },
          removeButton: {
            color: "red",
          },
          progressBar: {
            backgroundColor: "pink",
          },
        }}
      >
        <span style={{ fontSize: 20, margin: "10px 0" }}>
          Drag a file or click to upload.
        </span>
        <p style={{ fontSize: 16 }}>Only .csv file are accpected</p>
      </CSVReader>
    </div>
  );
};

export default CSVReaderCompoment;
