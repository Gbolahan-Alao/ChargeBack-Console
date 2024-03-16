import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMerchant } from 'src/components/Context/MerchantContext';
import { useUserRole } from 'src/components/Context/useRoleContext';
import '../../Merchants/Merchants.css';


const MerchantsTable = () => {
  const { selectMerchant } = useMerchant();
  const { isAdmin, merchantId } = useUserRole();
  const [merchants, setMerchants] = useState([]);
  const [showAddMerchantModal, setShowAddMerchantModal] = useState(false);
  const [newMerchantName, setNewMerchantName] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMerchants();
  }, []);

  useEffect(() => {
    if (!isAdmin()) {
      navigate(`/merchants/${merchantId}/disputes`);
    }
 }, [isAdmin, merchantId, navigate]);

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
   

  const toggleAddMerchantModal = () => {
    setShowAddMerchantModal(prevState => !prevState);
  };

  const handleInputChange = event => {
    setNewMerchantName(event.target.value);
  };

  const addMerchantHandler = async () => {
    try {
      const response = await fetch('https://localhost:7059/api/merchants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newMerchantName })
      });
      if (response.ok) {
        const createdMerchant = await response.json();
        setMerchants(prevMerchants => [...prevMerchants, createdMerchant]);
        setNewMerchantName('');
        setAlertMessage('New merchant added successfully');
        setTimeout(() => {
          setAlertMessage('');
          setShowAddMerchantModal(false);
        }, 1500); 
      } else {
        const errorData = await response.json();
        setAlertMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding merchant:', error);
      setAlertMessage('Error adding merchant');
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
              <button
              className="action-button"
              onClick={() => optionsClickHandler(row.id, 'transactions')}
             >
              View
             </button>
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>

      {showAddMerchantModal && (
        <div style={{
           position: 'fixed',
           top: 0,
           left: 0,
           width: '100%',
           height: '100%',
           backgroundColor: 'rgba(0, 0, 0, 0.5)',
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           zIndex: 9999,
           transition: 'opacity 0.3s ease'
        }}>
           <div style={{
             backgroundColor: '#f9f9f9', 
             padding: '20px',
             borderRadius: '8px',
             boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', 
             width: '400px', 
             maxWidth: '90%', 
             margin: '0 auto', 
             transition: 'transform 0.3s ease'
           }}>
             <h2>Add Merchant</h2>
             <input 
               type="text" 
               placeholder="Merchant Name" 
               value={newMerchantName} 
               onChange={handleInputChange} 
               style={{ marginBottom: '10px', padding: '8px', width: '100%', boxSizing: 'border-box' }}
             />
             <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
               <button onClick={addMerchantHandler} style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: 'purple', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }}>Add Merchant</button>
               <button onClick={toggleAddMerchantModal} style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }}>Cancel</button>
             </div>
           </div>
        </div>
       )}
       

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
