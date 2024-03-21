// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useUserRole } from 'src/components/Context/useRoleContext';
// import UploadReceiptModal from 'src/components/Modal/Modal';
// import ItemsPerPage from './ItemsPerPage';
// import Pagination from './Pagination';
// import TableHeader from './TableHeader';
// import TableRow from './TableRow';

// const IssuerDisputesTable = ({ statusFilter }) => {
//     const { merchantId } = useParams();
//     const { isAdmin } = useUserRole();
//     const itemsPerPageOptions = [50, 100, 200];
//     const [currentPage, setCurrentPage] = useState(0);
//     const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
//     const [loading, setLoading] = useState(true);
//     const [fileData, setFileData] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [selectedActions, setSelectedActions] = useState({});
//     const [showUploadModal, setShowUploadModal] = useState(false);
//     const [modalStan, setModalStan] = useState('');
//     const [modalRrn, setModalRrn] = useState('');

//     const options = [
//         { value: 'None', label: 'None' },
//         { value: 'N/A', label: 'N/A' },
//         { value: 'Accept', label: 'Accept' },
//         { value: 'Reject', label: 'Reject' },
//     ];

//     useEffect(() => {
//         fetchData();
//         const storedSelectedActions = localStorage.getItem('selectedActions');
//         if (storedSelectedActions) {
//             setSelectedActions(JSON.parse(storedSelectedActions));
//         }
//     }, []);

//     const fetchData = async () => {
//         try {
//             setIsLoading(true);
//             const response = await axios.get(`https://localhost:7059/api/files?merchantId=${merchantId}`);
//             setFileData(response.data);
//             if (isAdmin()) {
//                 await fetchUserActions(response.data);
//             }
//         } catch (error) {
//             console.error('Error fetching file data: ', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const fetchUserActions = async (fileData) => {
//         try {
//             const token = localStorage.getItem('token');
//             const actionsPromises = fileData.map(row => {
//                 return axios.get(`https://localhost:7059/api/getUserAction?merchantId=${merchantId}&stan=${row.stan}&rrn=${row.rrn}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//             });
//             const actionsResponses = await Promise.all(actionsPromises);
//             const actionsData = actionsResponses.reduce((acc, response, index) => {
//                 const { stan, rrn } = fileData[index];
//                 acc[`${stan}-${rrn}`] = response.data;
//                 return acc;
//             }, {});
//             setSelectedActions(actionsData);
//         } catch (error) {
//             console.error('Error fetching user actions:', error);
//         }
//     };

//     const handleActionSelect = async (stan, rrn, action) => {
//         const token = localStorage.getItem('token');
//         console.log("Action selected:", action);

//         if (action === 'Reject') {
//             console.log('Reject action selected');
//             setModalStan(stan);
//             setModalRrn(rrn);
//             setShowUploadModal(true);
//             return;
//         }

//         localStorage.setItem('selectedActions', JSON.stringify({
//             ...selectedActions,
//             [`${stan}-${rrn}`]: action,
//         }));

//         setSelectedActions(prevState => ({
//             ...prevState,
//             [`${stan}-${rrn}`]: action,
//         }));

//         try {
//             const response = await axios.post(
//                 `https://localhost:7059/api/updateUserActions?merchantId=${merchantId}&stan=${stan}&rrn=${rrn}&action=${action}`,
//                 null,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 },
//             );
//             console.log('Response:', response);
//         } catch (error) {
//             console.error('Error updating user actions:', error);
//         }
//     };

//     const handleOpenModal = () => {
//         setShowUploadModal(true);
//         console.log('Opening modal')
//     };

//     const handleModalClose = () => {
//         console.log("Closing modal");
//         setShowUploadModal(false);
//     };

//     const handleUploadSuccess = async () => {
//         try {
//             const token = localStorage.getItem('token');

//             setSelectedActions(prevState => ({
//                 ...prevState,
//                 [`${modalStan}-${modalRrn}`]: 'Reject',
//             }));

//             const response = await axios.post(
//                 `https://localhost:7059/api/updateUserActions?merchantId=${merchantId}&stan=${modalStan}&rrn=${modalRrn}&action=Reject`,
//                 null,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             console.log('Response from backend:', response.data);
//         } catch (error) {
//             console.error('Error updating user actions:', error);
//         } finally {
//             setShowUploadModal(false);
//         }
//     };

//     const pageCount = Math.ceil(fileData.length / itemsPerPage);
//     const startIndex = currentPage * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const currentPageData = fileData.slice(startIndex, endIndex);

//     const handlePageChange = (newPage) => {
//         setCurrentPage(newPage);
//     };

//     const handleItemsPerPageChange = (e) => {
//         setItemsPerPage(parseInt(e.target.value, 10));
//         setCurrentPage(0);
//     };

//     return (
//         <div className="contain">
//             <div className="paginationContainer">
//                 <Pagination
//                     currentPage={currentPage}
//                     pageCount={pageCount}
//                     handlePageChange={handlePageChange}
//                 />
//                 <ItemsPerPage
//                     itemsPerPageOptions={itemsPerPageOptions}
//                     itemsPerPage={itemsPerPage}
//                     handleItemsPerPageChange={handleItemsPerPageChange}
//                 />
//             </div>
//             <div className="contain">
//                 <table className="table table-borderless border-0">
//                     <TableHeader />
//                     <tbody>
//                         {currentPageData.map((row) => (
//                             <TableRow
//                                 key={row.id}
//                                 row={row}
//                                 isAdmin={isAdmin}
//                                 selectedAction={selectedActions[`${row.stan}-${row.rrn}`]}
//                                 handleActionSelect={handleActionSelect}
//                                 options={options}
//                             />
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             {showUploadModal && (
//                 <UploadReceiptModal
//                     merchantId={merchantId}
//                     stan={modalStan}
//                     rrn={modalRrn}
//                     token={localStorage.getItem('token')}
//                     onClose={handleModalClose}
//                     onUploadSuccess={handleUploadSuccess}
//                     showUploadModal={showUploadModal}
//                 />
//             )}

//         </div>
//     );
// };

// export default IssuerDisputesTable;

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUserRole } from 'src/components/Context/useRoleContext'
import UploadReceiptModal from 'src/components/Modal/Modal'
import ItemsPerPage from './ItemsPerPage'
import Pagination from './Pagination'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

const IssuerDisputesTable = ({ statusFilter }) => {
  const { merchantId } = useParams()
  const { isAdmin } = useUserRole()
  const itemsPerPageOptions = [50, 100, 200]
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0])
  const [loading, setLoading] = useState(true)
  const [fileData, setFileData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedActions, setSelectedActions] = useState({})
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [modalStan, setModalStan] = useState('')
  const [modalRrn, setModalRrn] = useState('')

  const options = [
    { value: 'None', label: 'None' },
    { value: 'N/A', label: 'N/A' },
    { value: 'Accept', label: 'Accept' },
    { value: 'Reject', label: 'Reject' },
  ]

  useEffect(() => {
    fetchData()
    const storedSelectedActions = localStorage.getItem('selectedActions')
    if (storedSelectedActions) {
      setSelectedActions(JSON.parse(storedSelectedActions))
    }
  }, [])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`https://localhost:7059/api/files?merchantId=${merchantId}`)
      setFileData(response.data)
      if (isAdmin()) {
        await fetchUserActions(response.data)
      }
    } catch (error) {
      console.error('Error fetching file data: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUserActions = async (fileData) => {
    try {
      const token = localStorage.getItem('token')
      const actionsPromises = fileData.map((row) => {
        return axios.get(
          `https://localhost:7059/api/getUserAction?merchantId=${merchantId}&stan=${row.stan}&rrn=${row.rrn}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
      })
      const actionsResponses = await Promise.all(actionsPromises)
      const actionsData = actionsResponses.reduce((acc, response, index) => {
        const { stan, rrn } = fileData[index]
        acc[`${stan}-${rrn}`] = response.data
        return acc
      }, {})
      setSelectedActions(actionsData)
    } catch (error) {
      console.error('Error fetching user actions:', error)
    }
  }

  const handleActionSelect = async (stan, rrn, action) => {
    const token = localStorage.getItem('token')
    console.log('Action selected:', action)

    if (action === 'Reject') {
      console.log('Reject action selected')
      setModalStan(stan)
      setModalRrn(rrn)
      setShowUploadModal(true)
      return
    }

    localStorage.setItem(
      'selectedActions',
      JSON.stringify({
        ...selectedActions,
        [`${stan}-${rrn}`]: action,
      }),
    )

    setSelectedActions((prevState) => ({
      ...prevState,
      [`${stan}-${rrn}`]: action,
    }))

    try {
      const response = await axios.post(
        `https://localhost:7059/api/updateUserActions?merchantId=${merchantId}&stan=${stan}&rrn=${rrn}&action=${action}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      console.log('Response:', response)
    } catch (error) {
      console.error('Error updating user actions:', error)
    }
  }

  const handleOpenModal = () => {
    setShowUploadModal(true)
    console.log('Opening modal')
  }

  const handleModalClose = () => {
    console.log('Closing modal')
    setShowUploadModal(false)
  }

  const handleUploadSuccess = async () => {
    try {
      const token = localStorage.getItem('token')

      setSelectedActions((prevState) => ({
        ...prevState,
        [`${modalStan}-${modalRrn}`]: 'Reject',
      }))

      const response = await axios.post(
        `https://localhost:7059/api/updateUserActions?merchantId=${merchantId}&stan=${modalStan}&rrn=${modalRrn}&action=Reject`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      console.log('Response from backend:', response.data)
    } catch (error) {
      console.error('Error updating user actions:', error)
    } finally {
      setShowUploadModal(false)
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

  return (
    <div className="contain">
      {isLoading ? (
        <div className="loading-spinner">Loading...</div>
      ) : fileData.length === 0 ? (
        <div className="no-files-container">
          <div className="no-files-message">No data found</div>
        </div>
      ) : (
        <>
          <div className="paginationContainer">
            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              handlePageChange={handlePageChange}
            />
            <ItemsPerPage
              itemsPerPageOptions={itemsPerPageOptions}
              itemsPerPage={itemsPerPage}
              handleItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
          <div className="contain">
            <table className="table table-borderless border-0">
              <TableHeader />
              <tbody>
                {currentPageData.map((row) => (
                  <TableRow
                    key={row.id}
                    row={row}
                    isAdmin={isAdmin}
                    selectedAction={selectedActions[`${row.stan}-${row.rrn}`]}
                    handleActionSelect={handleActionSelect}
                    options={options}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {showUploadModal && (
            <UploadReceiptModal
              merchantId={merchantId}
              stan={modalStan}
              rrn={modalRrn}
              token={localStorage.getItem('token')}
              onClose={handleModalClose}
              onUploadSuccess={handleUploadSuccess}
              showUploadModal={showUploadModal}
            />
          )}
        </>
      )}
    </div>
  )
}

export default IssuerDisputesTable
