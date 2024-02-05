import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { FaFile } from 'react-icons/fa';
import { UploadedFilesContext } from '../Context/UploadedFilesContext';
import styles from './FileUpload.module.css';

const FileUpload = () => {
  const { uploadedFiles, setUploadedFiles } = useContext(UploadedFilesContext);
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
      formData.append('fileName', file.name);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          "Access-Control-Allow-Origin": "*",
        },
      };

      await axios.post('https://localhost:7027/File/upload', formData, config);
      console.log("File upload process completed.");
      setUploadStatus("success");
      fetchFileData();
    } catch (error) {
      console.error("Error handling file: ", error);
      setUploadStatus("error");
    }
  };

  useEffect(() => {
    fetchFileData();
  }, []); 

  const fetchFileData = () => {
    axios.get('https://localhost:7027/File/files')
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
      {uploadStatus === "success" && <p>File uploaded successfully!</p>}
      {uploadStatus === "error" && <p>Error uploading file. Please try again.</p>}
    </div>
  );
}

export default FileUpload;













// import axios from "axios";
// import { useRef } from "react";
// import { FaFile } from 'react-icons/fa';
// import styles from "./FileUpload.module.css";

// const FileUpload = () => {
//   const fileInput = useRef();

//   const handleClick = () => {
//     fileInput.current.click();
//   };
 
//   const handleChange = (event) => {
//     try {
//       const file = event.target.files[0];
//       const formData = new FormData();
//       formData.append('files', file);
//       formData.append('fileName', file.name);
//       const config = {
//         headers: {
//           'content-type': 'multipart/form-data',
//           "Access-Control-Allow-Origin": "*",
//         },
//       };
     
//       axios.post('https://localhost:7027/File/upload', formData, config)
//         .then((response) => {
//           console.log("response:",response.data);
//         })
//         .catch((error) => {
//           console.error("Error uploading file: ", error);
//         });
//     } catch (error) {
//       console.error("Error handling file: ", error);
//     }
//   };
 
//   return (
//     <div className={styles.fileUploadContainer}>
//       <input 
//         type="file" 
//         ref={fileInput} 
//         className={styles.fileInput}
//         onChange={handleChange} 
//       />
//       <button 
//         className={styles.uploadButton}
//         onClick={handleClick}
//       > 
//         <FaFile/> Select bulk files to Upload
//       </button>
//     </div>
//   );
// }

// export default FileUpload;
