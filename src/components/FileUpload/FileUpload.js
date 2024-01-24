
import { useState } from 'react';
import { FaFile } from 'react-icons/fa';

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    // Perform file upload logic here
    // You can use FormData and send files to your server or perform any other desired action
    console.log('Selected files:', selectedFiles);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}> <FaFile /> Upload</button>
    </div>
  );
};

export default FileUpload;

