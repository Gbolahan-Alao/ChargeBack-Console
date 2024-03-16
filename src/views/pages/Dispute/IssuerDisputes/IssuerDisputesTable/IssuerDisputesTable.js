import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { IoEye } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import Alert from 'src/components/Alert/Alert';
const IssuerDisputesTable = ({ statusFilter }) => {
  const { merchantId } = useParams();
  const itemsPerPageOptions = [50, 100, 200];
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [loading, setLoading] = useState(true);
  const [fileData, setFileData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userRoles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      console.log(userRoles);
  
      const rolesArray = Array.isArray(userRoles) ? userRoles : [userRoles];
      const lastRole = rolesArray[rolesArray.length - 1];
  
      const response = await axios.get('https://localhost:7059/api/files', {
        params: {
          merchantId: merchantId
        }
      });
      setFileData(response.data);
    } catch (error) {
      console.error('Error fetching file data: ', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (fileData.length === 0) {
    return <Alert type="success" message="Data is empty." />;
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
              <th style={{ textAlign: 'left' }}>Stan</th>
              <th style={{ textAlign: 'left' }}>RRN</th>
              <th style={{ textAlign: 'left' }}>Amount</th>
              <th style={{ textAlign: 'left' }}>Terminal ID</th>
              <th style={{ textAlign: 'left' }}>Transaction Date</th>
              <th style={{ textAlign: 'left' }}>Account to be Credited</th>
              <th style={{ textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: 'left' }}>{row.id}</td>
                <td style={{ textAlign: 'left' }}>{row.maskedPan}</td>
                <td style={{ textAlign: 'left' }}>{row.stan}</td>
                <td style={{ textAlign: 'left' }}>{row.rrn}</td>
                <td style={{ textAlign: 'left' }}>{row.amount}</td>
                <td style={{ textAlign: 'left' }}>{row.terminalId}</td>
                <td style={{ textAlign: 'left' }}>{new Date(row.transactionDate).toLocaleString()}</td>
                <td style={{ textAlign: 'left' }}>{row.accountToBeCredited}</td>
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
