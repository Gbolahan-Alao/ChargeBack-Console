// Modal.js
import React from 'react';
import styles from './Modal.module.css';

const ReceiptUploadModal = ({ isOpen, onClose, onUpload }) => {
    const [file, setFile] = React.useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (file) {
            onUpload(file);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles['modal-content']}> 
                <h2>Upload Receipt</h2>
                <form onSubmit={handleSubmit}>
                    <input type="file" accept=".pdf,.jpg,.png" onChange={handleFileChange} />
                    <button type="submit">Upload</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default ReceiptUploadModal;
