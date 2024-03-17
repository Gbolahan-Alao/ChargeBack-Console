import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMerchant } from 'src/components/Context/MerchantContext';
import { useUserRole } from 'src/components/Context/useRoleContext';
import '../../Merchants/Merchants.css';

const MerchantsTable = () => {
    const { selectMerchant } = useMerchant();
    const { isAdmin, merchantId: adminMerchantId } = useUserRole();
    const [merchants, setMerchants] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();
    const { merchantId: urlMerchantId } = useParams();

    useEffect(() => {
        if (!isAdmin()) {
            // If user is not admin, redirect to disputes page with user's merchant id
            navigate(`/merchants/${adminMerchantId}/disputes`);
        } else {
            fetchMerchants();
        }
    }, []);

    const fetchMerchants = () => {
        fetch('https://localhost:7059/api/merchants') 
            .then(response => response.json())
            .then(data => setMerchants(data))
            .catch(error => console.error('Error fetching merchants:', error));
    };

    const optionsClickHandler = (merchantId, action) => {
        selectMerchant(merchantId);
        if (action === 'transactions') {
            navigate(`/merchants/${merchantId}/disputes`);
        }
    };

    return (
        <div className='merchant-container'>
            <table className="table table-borderless border-0">
                <thead>
                    <tr style={{ border: 'none' }}>
                        <th scope="col"></th>
                        <th scope="col">Merchants</th>
                    </tr>
                </thead>
                <tbody>
                    {merchants.map((row) => (
                        <tr key={row.id}>
                            <th scope="row">{row.serialNumber}</th>
                            <td colSpan="2" className="col-6">
                                {row.name}
                            </td>
                            <td className="td">
                                {isAdmin() ? (
                                    <button
                                        className="action-button"
                                        onClick={() => optionsClickHandler(row.id, 'transactions')}
                                    >
                                        View
                                    </button>
                                ) : (
                                    <span>N/A</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Alert */}
            {alertMessage && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '50%',
                    transform: 'translateX(50%)',
                    backgroundColor: '#4CAF50', // Green background
                    color: '#fff', // White text
                    padding: '10px 20px',
                    borderRadius: '4px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Shadow for depth
                    zIndex: 1000, // Ensure it's above other elements
                    opacity: 1,
                    visibility: 'visible',
                    transition: 'opacity 0.3s, visibility 0.3s'
                }}>
                    {alertMessage}
                </div>
            )}
        </div>
    );
};

export default MerchantsTable;
