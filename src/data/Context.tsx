import React, { createContext, useState } from "react";

export type FileDataI = {
  order: string;
  link: string;
  "public key": string;
};

export interface ContextType {
  fileData: FileDataI[];
  setFileData: React.Dispatch<React.SetStateAction<FileDataI[]>>;
  isFileLoading: boolean;
  setIsFileLoading: React.Dispatch<React.SetStateAction<boolean>>;
  redirectInput: string;
  setRedirectInput: React.Dispatch<React.SetStateAction<string>>;
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  uploadedFile: File | null;
  setUploadedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export const Context = createContext<ContextType | null>(null);

export const ContextProvider: React.FC = ({ children }) => {
  const [fileData, setFileData] = useState<FileDataI[]>([]);
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [redirectInput, setRedirectInput] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  return (
    <Context.Provider
      value={{
        fileData,
        setFileData,
        isFileLoading,
        setIsFileLoading,
        redirectInput,
        setRedirectInput,
        isChecked,
        setIsChecked,
        uploadedFile,
        setUploadedFile,
      }}
    >
      {children}
    </Context.Provider>
  );
};
