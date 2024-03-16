import { createContext, useContext, useState } from 'react';

export const UploadedFilesContext = createContext();

export const useUploadedFiles = () => useContext(UploadedFilesContext);

export const UploadedFilesProvider = ({ children }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
  
    return (
      <UploadedFilesContext.Provider value={{ uploadedFiles, setUploadedFiles }}>
        {children}
      </UploadedFilesContext.Provider>
    );
  };