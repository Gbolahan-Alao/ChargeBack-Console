import axios from 'axios';
import { useState } from 'react';
import styles from './Modal.module.css';

const UploadReceiptModal = ({ merchantId, stan, rrn, token, onClose, onUploadSuccess, showUploadModal }) => {
    console.log('showUploadModal:', showUploadModal);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }
    
        setIsLoading(true);
    
        try {
            // Check if the dispute has been rejected
            if (showUploadModal) {
                const formData = new FormData();
                formData.append('receipt', file);
    
                const response = await axios.post(
                    `https://localhost:7059/api/uploadReceipt?merchantId=${merchantId}&stan=${stan}&rrn=${rrn}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log('Receipt uploaded successfully:', response.data);
                onUploadSuccess();
            } else {
                alert('You can only upload receipts for rejected disputes.');
            }
        } catch (error) {
            console.error('Error uploading receipt:', error);
        } finally {
            setIsLoading(false);
            onClose();
        }
    };
    

    return (
        <div className={`${styles.modal} ${showUploadModal ? styles.open : ''}`}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <h2>Upload Receipt for Rejected Dispute</h2>
                <input type="file" accept=".pdf,.jpg,.png" onChange={handleFileChange} />
                <button onClick={handleUpload} disabled={isLoading}>
                    {isLoading ? 'Uploading...' : 'Upload Receipt'}
                </button>
            </div>
        </div>
    );
};

export default UploadReceiptModal;
