import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { FaFile } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Alert from '../Alert/Alert';
import { UploadedFilesContext } from '../Context/UploadedFilesContext';
import styles from './FileUpload.module.css';

const FileUpload = () => {
  const { uploadedFiles, setUploadedFiles } = useContext(UploadedFilesContext);
  const { merchantId } = useParams();
  const fileInput = useRef();
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleClick = () => {
    fileInput.current.click();
  };

  
  const handleChange = async (event) => {
    try {
      console.log("File upload process started...");
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      const url = `https://localhost:7059/api/upload?merchantId=${merchantId}`;
  
      await axios.post(url, formData);
      console.log("File upload process completed.");
      setUploadStatus("success");
      fetchFileData();
      setTimeout(() => {
        setUploadStatus(null);
      }, 2000);
    } catch (error) {
      console.error("Error handling file: ", error);
      setUploadStatus("error");
    }
  };

   
   

  useEffect(() => {
    fetchFileData();
  }, []); 

  const fetchFileData = () => {
    axios.get(`https://localhost:7059/api/files?merchantId=${merchantId}`)
      .then((response) => {
        setUploadedFiles(response.data);
        console.log("Files obtained from context:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching file data: ", error);
      });
  };

  return (
    <div className={styles.fileUploadContainer}>
      <input
        type="file"
        ref={fileInput}
        className={styles.fileInput}
        onChange={handleChange}
      />
      <button
        className={styles.uploadButton}
        onClick={handleClick}
      >
        <FaFile /> Select bulk files to Upload
      </button>
      {uploadStatus === "success" && <Alert type="success" message="File uploaded successfully!" />}
      {uploadStatus === "error" && <Alert type="error" message="Error uploading file. Please try again." />}
    </div>
  );
}

export default FileUpload;
