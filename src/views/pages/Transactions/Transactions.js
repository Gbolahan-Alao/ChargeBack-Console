import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { IoIosCloudDownload } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { useUserRole } from 'src/components/Context/useRoleContext';
import FileUpload from 'src/components/FileUpload/FileUpload';
import WidgetsDropdown from 'src/views/widgets/WidgetsDropdown';
import './TransactionsTable.css';
import TableFilter from './TransactionsTableFilter/TransactionsTableFilter';

const Transactions = () => {
  const { merchantId } = useParams();
  const { isAdmin } = useUserRole();
  const itemsPerPageOptions = [100, 200, 500, 1000];
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [fileData, setFileData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`https://localhost:7059/api/merchant-dashboard-data?merchantId=${merchantId}`);
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data: ', error);
    }
  };

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
  
      const response = await axios.get('https://localhost:7059/api/files-info', {
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
  
  const pageCount = Math.ceil(fileData.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPageData = fileData.slice(startIndex, endIndex)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10))
    setCurrentPage(0)
  }

  const handleDownload = async (fileName) => {
    try {
      const response = await axios.post(
        `https://localhost:7059/api/download/${fileName}`,
        {},
        { responseType: 'blob' },
      )
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
    } catch (error) {
      console.error('Error downloading file: ', error)
    }
  }

  return (
    <div className="contain">
    {dashboardData && (
      <WidgetsDropdown
        className="mb-4"
        all={dashboardData.totalCount}
        approved={dashboardData.acceptedCount}
        pending={dashboardData.pendingCount}
        rejected={dashboardData.rejectedCount}
      />
    )}
      {isAdmin() && <FileUpload />}
      <TableFilter />
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
      {isLoading ? (
        <div className="spinner-border" role="status"></div>
      ) : (
        <table className="table table-borderless border-0">
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th className="col-3" style={{ textAlign: 'left' }}>
                File Name
              </th>
              <th style={{ textAlign: 'left' }}>Total Items</th>
              <th style={{ textAlign: 'left' }}>Upload Date</th>
              <th style={{ textAlign: 'left' }}>Total Successful</th>
              <th style={{ textAlign: 'left' }}>Total Failed</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData
              .slice()
              .reverse()
              .map((row) => (
                <tr key={row.id}>
                  <td className="col-3" style={{ textAlign: 'left' }}>
                    {row.fileName}
                  </td>
                  <td style={{ textAlign: 'left' }}>{row.totalItems}</td>
                  <td style={{ textAlign: 'left' }}>{new Date(row.uploadDate).toLocaleString()}</td>
                  <td style={{ textAlign: 'left' }}>{row.totalSuccessful}</td>
                  <td style={{ textAlign: 'left' }}>{row.totalFailed}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => handleDownload(row.fileName)}
                      style={{
                        backgroundColor: '#F2F2F2',
                        color: 'black',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        border: 'none',
                        padding: '4px 16px',
                      }}
                    >
                      <IoIosCloudDownload /> Download Enriched
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Transactions;



