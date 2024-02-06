import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoEye } from 'react-icons/io5';

const IssuerDisputesTable = ({ statusFilter }) => {
  const itemsPerPageOptions = [50, 100, 200];
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [loading, setLoading] = useState(true); 
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []); 

  const fetchData = () => {
    setLoading(true); 
    axios.get('https://localhost:7027/File/files')
      .then((response) => {
        setFileData(response.data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching file data: ", error);
        setLoading(false); // Ensure loading state is set to false even if there's an error
      });
  };

  // Render loading indicator if files are still loading or if data is empty
  if (loading || fileData.length === 0) {
    return <div>Loading...</div>;
  }

  const pageCount = Math.ceil(fileData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = fileData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <div className='contain'>
      <div className="paginationContainer">
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
            Previous
          </button>
          <span>{`Page ${currentPage + 1} of ${pageCount}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageCount - 1}
          >
            Next
          </button>
        </div>
        <div className="itemsPerPage">
          <label>Items per page:</label>
          <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="contain">
        <table className="table table-borderless border-0">
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th style={{ textAlign: 'left' }}>Id</th>
              <th style={{ textAlign: 'left' }}>Masked PAN</th>
              <th style={{ textAlign: 'left' }}>RRN</th>
              <th style={{ textAlign: 'left' }}>Amount</th>
              <th style={{ textAlign: 'left' }}>Terminal ID</th>
              <th style={{ textAlign: 'left' }}>Transaction Date</th>
              <th style={{ textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.slice().reverse().map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: 'center' }}>{row.id}</td>
                <td style={{ textAlign: 'left' }}>{row.maskedPan}</td>
                <td style={{ textAlign: 'left' }}>{row.rrn}</td>
                <td style={{ textAlign: 'left' }}>{row.amount}</td>
                <td style={{ textAlign: 'left' }}>{row.terminalId}</td>
                <td style={{ textAlign: 'left' }}>{new Date(row.transactionDate).toLocaleString()}</td>
                <td style={{ textAlign: 'center' }}>
                  <IoEye />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssuerDisputesTable;








// import { useState } from 'react';
// import { IoEye } from 'react-icons/io5';
// import { issuerDisputeDummyData } from 'src/data/IssuerDisputeDummyData';

// const IssuerDisputesTable = ({ statusFilter }) => {
//   const allData = issuerDisputeDummyData;
//   const itemsPerPageOptions = [ 10, 20,50,100];
//   const [currentPage, setCurrentPage] = useState(0);
//   const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

//   const filteredData = statusFilter
//   ? allData.filter((row) => row.status.toLowerCase() === statusFilter.toLowerCase())
//   : allData;

//   const pageCount = Math.ceil(filteredData.length / itemsPerPage);
//   const startIndex = currentPage * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentPageData = filteredData.slice(startIndex, endIndex);

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'pending':
//         return { borderColor: 'blue', color: 'blue', backgroundColor: '#f0f8ff' };
//       case 'accepted':
//         return { borderColor: 'green', color: 'green', backgroundColor: '#f0fff0' };
//       case 'declined':
//         return { borderColor: 'red', color: 'red', backgroundColor: '#fff5f5' };
//       default:
//         return {};
//     }
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleItemsPerPageChange = (e) => {
//     setItemsPerPage(parseInt(e.target.value, 10));
//     setCurrentPage(0);
//   };

//   return (
//     <div className='contain'>
//       <div className="paginationContainer">
//         <div className="pagination">
//           <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
//             Previous
//           </button>
//           <span>{`Page ${currentPage + 1} of ${pageCount}`}</span>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === pageCount - 1}
//           >
//             Next
//           </button>
//         </div>
//         <div className="itemsPerPage">
//           <label>Items per page:</label>
//           <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
//             {itemsPerPageOptions.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="contain">
//         <table className="table table-borderless border-0">
//           <thead style={{ backgroundColor: '#f2f2f2' }}>
//             <tr>
//               <th style={{ textAlign: 'left' }}>Id</th>
//               <th colSpan="2" style={{ textAlign: 'left' }}>
//                 Date Logged
//               </th>
//               <th style={{ textAlign: 'left' }}>Logged By</th>
//               <th style={{ textAlign: 'left' }}>Log Code</th>
//               <th style={{ textAlign: 'left' }}>Status</th>
//               <th style={{ textAlign: 'left' }}>Resolved By</th>
//               <th style={{ textAlign: 'left' }}>Resolved On</th>
//               <th style={{ textAlign: 'left' }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentPageData.map((row) => (
//               <tr key={row.id}>
//                 <td style={{ textAlign: 'center' }}>{row.id}</td>

//                 <td style={{ textAlign: 'left' }}>{new Date(row.dateLogged).toLocaleString()}</td>
//                 <td colSpan="2" style={{ textAlign: 'left' }}>
//                   {row.loggedBy}
//                 </td>
//                 <td style={{ textAlign: 'left' }}>{row.logCode}</td>

//                 <td style={{ textAlign: 'left' }}>
//                   <span
//                     className={`status-cell ${row.progressStatus}`}
//                     style={{
//                       border: `1px solid ${getStatusStyle(row.status).borderColor}`,
//                       color: getStatusStyle(row.status).color,
//                       backgroundColor: getStatusStyle(row.status).backgroundColor,
//                       padding: '2px 4px',
//                       textAlign: 'left',
//                       display: 'inline-block',
//                       borderRadius: '2px',
//                       fontSize: '8px',
//                     }}
//                   >
//                     {row.status.toUpperCase()}
//                   </span>
//                 </td>

//                 <td style={{ textAlign: 'left' }}>{row.resolvedBy}</td>
//                 <td style={{ textAlign: 'left' }}>{new Date(row.resolvedOn).toLocaleString()}</td>
//                 <td style={{ textAlign: 'center' }}>
//                   <IoEye />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default IssuerDisputesTable
