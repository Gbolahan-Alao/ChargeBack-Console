import { createContext, useContext, useState } from 'react';

// Create the context
export const UploadedFilesContext = createContext();

// Custom hook to use the context
export const useUploadedFiles = () => useContext(UploadedFilesContext);

// Context provider component
export const UploadedFilesProvider = ({ children }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
  
    return (
      <UploadedFilesContext.Provider value={{ uploadedFiles, setUploadedFiles }}>
        {children}
      </UploadedFilesContext.Provider>
    );
  };