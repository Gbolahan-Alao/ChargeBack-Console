
import { useState } from 'react';
import { IoIosCloudDownload } from 'react-icons/io';
import { dummyData } from 'src/data/dummyTransactionsData';
import WidgetsDropdown from 'src/views/widgets/WidgetsDropdown';
import './TransactionsTable.css';
import TableFilter from './TransactionsTableFilter/TransactionsTableFilter';

const Transactions = () => {
  const data = dummyData;
  const itemsPerPageOptions = [5, 10, 15, 20]; 
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

  const pageCount = Math.ceil(data.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return { borderColor: 'orange', color: 'orange', backgroundColor: '#fffaf0' };
      case 'completed':
        return { borderColor: 'green', color: 'green', backgroundColor: '#f0fff0' };
      case 'failed':
        return { borderColor: 'red', color: 'red', backgroundColor: '#fff5f5' };
      default:
        return {};
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(0); 
  };

  return (
    <div className="contain">
      <WidgetsDropdown className="mb-4" all={400} approved={350} pending={35} rejected={15} />
      <TableFilter />
      <div className="paginationContainer">
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
          Previous
        </button>
        <span>{`Page ${currentPage + 1} of ${pageCount}`}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageCount - 1}>
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
      <table className="table table-borderless border-0">
      <thead style={{ backgroundColor: '#f2f2f2' }}>
      <tr>
        <th colSpan="2" className="col-3" style={{textAlign:'left'}}>File Name</th>
        <th style={{textAlign:"left"}} >Progress Status</th>
        <th style={{textAlign:"left"}}>Date Created</th>
        <th >#Total Successful</th>
        <th >#Total Failed</th>
        <th className="col-2" >Actions</th>
      </tr>
    </thead>
        <tbody>
          {currentPageData.map((row) => (
            <tr key={row.id}>
              <td colSpan="2" className="col-3"  style={{textAlign:'left'}}>{row.fileName}</td>
              <td style={{textAlign:"left"}}>
                <span
                  className={`status-cell ${row.progressStatus}`}
                  style={{
                    border: `1px solid ${getStatusStyle(row.progressStatus).borderColor}`,
                    color: getStatusStyle(row.progressStatus).color,
                    backgroundColor: getStatusStyle(row.progressStatus).backgroundColor,
                    padding: '2px 4px', 
                    textAlign: 'right',
                    display: 'inline-block',
                    borderRadius: '2px',
                    fontSize:'8px'
  
                  }}
                >
                  {row.progressStatus.toUpperCase()}
                </span>
              </td>
              <td style={{textAlign:"left"}}>{new Date(row.dateCreated).toLocaleString()}</td>
              <td style={{color:'green', textAlign:'center'}}>{row.totalSuccessful}</td>
              <td style={{color:'red',textAlign:'center'}}>{row.totalFailed}</td>
              <td className="col-2">
                <button
                  onClick={() => console.log(`Download ${row.fileName}`)}
                  disabled={!row.fileAvailable}
                  style={{
                    backgroundColor: row.fileAvailable ? '#F2F2F2' : 'white',
                    color: 'white',
                    cursor: row.fileAvailable ? 'pointer' : 'not-allowed',
                    borderRadius:'5px',
                    border:row.fileAvailable ? 'none': "2px solid #f2f2f2",
                    color:row.fileAvailable ? 'black': "#D3D3D3",
                    padding:'4px 16px',
                  }}
                >
                <IoIosCloudDownload /> Download Enriched
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
    </div>
  );
};

export default Transactions;
