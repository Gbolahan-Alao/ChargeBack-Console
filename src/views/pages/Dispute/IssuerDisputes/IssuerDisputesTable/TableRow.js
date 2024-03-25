// import axios from 'axios';

// const TableRow = ({ row, isAdmin, selectedAction, handleActionSelect, options }) => {
//     const handleSelectChange = (e) => {
//         const action = e.target.value;
//         handleActionSelect(row.stan, row.rrn, action);
//     };

//     const handleDownloadReceipt = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             console.log('response sent')
//             // Send a request to the backend to download the receipt
//             const response = await axios.get(`https://localhost:7059/api/download-receipt/${row.merchantId}/${row.stan}/${row.rrn}`, {
//                 responseType: 'blob',
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             // Create a blob URL for the receipt file
//             const blob = new Blob([response.data]);
//             const url = window.URL.createObjectURL(blob);
//             // Create a temporary link element to trigger the download
//             const link = document.createElement('a');
//             link.href = url;
//             link.download = 'receipt.pdf'; // Adjust the filename as needed
//             // Simulate a click on the link to start the download
//             link.click();
//             // Release the object URL
//             window.URL.revokeObjectURL(url);
//         } catch (error) {
//             console.error('Error downloading receipt:', error);
//         }
//     };

//     const renderActionText = () => {
//         switch (selectedAction) {
//             case 'Accept':
//                 return <span style={{ color: 'green' }}>Accepted</span>;
//             case 'Reject':
//                 if (isAdmin()) {
//                     return <span style={{ color: 'white' }}>Rejected</span>;
//                 } else {
//                     return <span style={{ color: 'red' }}>Rejected</span>;
//                 }
//             case 'N/A':
//                 return <span style={{ color: 'blue' }}>N/A</span>;
//             default:
//                 return selectedAction ? selectedAction : "None";
//         }
//     };
    

//     return (
//         <tr>
//             <td>{row.id}</td>
//             <td>{new Date(row.dateLogged).toLocaleString()}</td>
//             <td>{row.maskedPan}</td>
//             <td>{row.stan}</td>
//             <td>{row.rrn}</td>
//             <td>{row.amount}</td>
//             <td>{row.terminalId}</td>
//             <td>{new Date(row.transactionDate).toLocaleString()}</td>
//             <td>{row.accountToBeCredited}</td>
//             <td>
//                 {isAdmin() ? (
//                     selectedAction === 'Reject' ? (
//                         <button style={{ borderRadius: "4px", color: 'white', backgroundColor: 'purple', border: 'none' }} onClick={handleDownloadReceipt}>{renderActionText()}</button>
//                     ) : (
//                         renderActionText()
//                     )
//                 ) : (
//                     selectedAction ? (
//                         renderActionText()
//                     ) : (
//                         <select
//                             style={{ backgroundColor: "#f2f2f2", borderRadius: "4px" }}
//                             value={selectedAction || ''}
//                             onChange={handleSelectChange}
//                         >
//                             {options.map((option) => (
//                                 <option key={option.value} value={option.value}>
//                                     {option.label}
//                                 </option>
//                             ))}
//                         </select>
//                     )
//                 )}
//             </td>
//         </tr>
//     );
// };

// export default TableRow;

import axios from 'axios';
import { useEffect, useState } from 'react';

const TableRow = ({ row, isAdmin, selectedAction, handleActionSelect, options }) => {
    const [isLate, setIsLate] = useState(false);

    useEffect(() => {
        const uploadTime = new Date(row.dateLogged).getTime();
        const currentTime = new Date().getTime();
        const tenMinutesInMillis =  25 * 60 * 60 * 1000;

        if (!selectedAction && currentTime - uploadTime > tenMinutesInMillis) {
            setIsLate(true);
        }
    }, [row.dateLogged, selectedAction]);

    const handleSelectChange = (e) => {
        const action = e.target.value;
        handleActionSelect(row.stan, row.rrn, action);
    };

    const handleDownloadReceipt = async () => {
        try {
            const token = localStorage.getItem('token');
          
            const response = await axios.get(`https://localhost:7059/api/download-receipt/${row.merchantId}/${row.stan}/${row.rrn}`, {
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = 'receipt.pdf';
            
            link.click();
            
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading receipt:', error);
        }
    };

    const renderActionText = () => {
                switch (selectedAction) {
                    case 'Accept':
                        return <span style={{ color: 'green' }}>Accepted</span>;
                    case 'Reject':
                        if (isAdmin()) {
                            return <span style={{ color: 'white' }}>Rejected</span>;
                        } else {
                            return <span style={{ color: 'red' }}>Rejected</span>;
                        }
                    case 'N/A':
                        return <span style={{ color: 'blue' }}>N/A</span>;
                    default:
                        return selectedAction ? selectedAction : "None";
                }
            };

    return (
        <tr style={{ backgroundColor: isLate ? 'red' : 'inherit' }}>
            <td>{row.id}</td>
            <td>{new Date(row.dateLogged).toLocaleString()}</td>
            <td>{row.maskedPan}</td>
            <td>{row.stan}</td>
            <td>{row.rrn}</td>
            <td>{row.amount}</td>
            <td>{row.terminalId}</td>
            <td>{new Date(row.transactionDate).toLocaleDateString()}</td>
            <td>{row.accountToBeCredited}</td>
            <td>
                {isAdmin() ? (
                    selectedAction === 'Reject' ? (
                        <button style={{ borderRadius: "4px", color: 'white', backgroundColor: 'purple', border: 'none' }} onClick={handleDownloadReceipt}>{renderActionText()}</button>
                    ) : (
                        renderActionText()
                    )
                ) : (
                    selectedAction ? (
                        renderActionText()
                    ) : (
                        <select
                        style={{ 
                            backgroundColor: isLate ? 'red' : "#f2f2f2", 
                            borderRadius: "4px" 
                        }}
                        value={selectedAction || ''}
                        onChange={handleSelectChange}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    
                    )
                )}
            </td>
        </tr>
    );
};

export default TableRow;
