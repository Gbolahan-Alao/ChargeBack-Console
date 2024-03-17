import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Alert from 'src/components/Alert/Alert';
import { useUserRole } from 'src/components/Context/useRoleContext';

const IssuerDisputesTable = ({ statusFilter }) => {
    const { merchantId } = useParams();
    const { isAdmin } = useUserRole();
    const itemsPerPageOptions = [50, 100, 200];
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
    const [loading, setLoading] = useState(true);
    const [fileData, setFileData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedActions, setSelectedActions] = useState({}); // State to store selected actions for each row

    const options = [
        { value: 'N/A', label: 'N/A' },
        { value: 'Accept', label: 'Accept' },
        { value: 'Reject', label: 'Reject' },
    ];

    useEffect(() => {
        fetchData();
        // Retrieve selected actions from localStorage
        const storedSelectedActions = localStorage.getItem('selectedActions');
        if (storedSelectedActions) {
            setSelectedActions(JSON.parse(storedSelectedActions));
        }
    }, []);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`https://localhost:7059/api/files?merchantId=${merchantId}`);
            setFileData(response.data);
            if (isAdmin()) {
                // If user is admin, fetch user actions data
                await fetchUserActions(response.data);
            }
        } catch (error) {
            console.error('Error fetching file data: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserActions = async (fileData) => {
        try {
            const token = localStorage.getItem('token');
            const actionsPromises = fileData.map(row => {
                return axios.get(`https://localhost:7059/api/getUserAction?merchantId=${merchantId}&stan=${row.stan}&rrn=${row.rrn}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            });
            const actionsResponses = await Promise.all(actionsPromises);
            const actionsData = actionsResponses.reduce((acc, response, index) => {
                const { stan, rrn } = fileData[index];
                acc[`${stan}-${rrn}`] = response.data;
                return acc;
            }, {});
            setSelectedActions(actionsData);
        } catch (error) {
            console.error('Error fetching user actions:', error);
        }
    };

    const handleActionSelect = async (stan, rrn, action) => {
        // Store selected action in localStorage
        localStorage.setItem('selectedActions', JSON.stringify({
            ...selectedActions,
            [`${stan}-${rrn}`]: action,
        }));

        setSelectedActions(prevState => ({
            ...prevState,
            [`${stan}-${rrn}`]: action, // Store selected action for the specific row
        }));

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `https://localhost:7059/api/updateUserActions?merchantId=${merchantId}&stan=${stan}&rrn=${rrn}&action=${action}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log('Response:', response);

            // Handle response as needed
        } catch (error) {
            console.error('Error updating user actions:', error);
            // Handle error as needed
        }
    };

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
        <div className="contain">
            {/* Pagination and items per page controls */}
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
            {/* Table displaying file data */}
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
                                <td style={{ textAlign: 'left' }}>
                                    {new Date(row.transactionDate).toLocaleString()}
                                </td>
                                <td style={{ textAlign: 'left' }}>{row.accountToBeCredited}</td>
                                <td style={{ textAlign: 'left' }}>
                                    {isAdmin() ? (
                                        selectedActions[`${row.stan}-${row.rrn}`] || "N/A"
                                    ) : (
                                        <select value={selectedActions[`${row.stan}-${row.rrn}`] || ''} onChange={(e) => handleActionSelect(row.stan, row.rrn, e.target.value)}>
                                            {options.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    )}
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
 