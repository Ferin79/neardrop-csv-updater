import React, { useContext, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import csvtojson from "csvtojson";
import styles from "../styles/Dropzone.module.css";
import { Context, ContextType } from "../data/Context";
import { useToasts } from "react-toast-notifications";

interface DropzoneProps {}

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: "100%",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const Dropzone: React.FC<DropzoneProps> = () => {
  const {
    setFileData,
    setIsFileLoading,
    setUploadedFile,
    uploadedFile,
    fileData,
    isFileLoading,
  } = useContext(Context) as ContextType;

  const { addToast } = useToasts();

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({
    accept: "text/csv, .csv, application/vnd.ms-excel",
    maxFiles: 1,
    multiple: false,
    onDropAccepted: (e) => {
      setIsFileLoading(true);
      const reader = new FileReader();
      reader.onload = () => {
        csvtojson()
          .fromString(reader.result as string)
          .then((data) => {
            setFileData(data);
            setIsFileLoading(false);
          });
      };

      setUploadedFile(e[0]);
      reader.readAsBinaryString(e[0]);
    },
  });

  useEffect(() => {
    if (fileData && uploadedFile && !isFileLoading) {
      addToast("CSV uploaded successfully.", {
        autoDismiss: true,
        appearance: "success",
      });
    }
  }, [fileData, addToast, uploadedFile, isFileLoading]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  ) as any;

  return (
    <>
      {!uploadedFile ? (
        <div className={styles.dropzoneStyle}>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some file here, or click to select file</p>
            <button className={styles.chooseFile}>Choose File</button>
            {/* <em>(Only *.csv file will be accepted)</em> */}
          </div>
        </div>
      ) : (
        <div className={styles.fileName}>
          <p style={{ fontWeight: 600 }}>File Name:</p>
          <p
            style={{
              marginLeft: 10,
              color: "rgba(76, 198, 34, 1)",
              fontWeight: 600,
            }}
          >
            {uploadedFile.name} ({fileData.length} rows uploaded)
          </p>
        </div>
      )}
    </>
  );
};
export default Dropzone;
