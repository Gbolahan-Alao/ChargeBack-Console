import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Merchants.css';
const data = [
  { id: 1, serialNumber: 1, merchant: 'Team APT' },
  { id: 2, serialNumber: 2, merchant: 'Fair Money' },
  { id: 3, serialNumber: 3, merchant: 'Palmpay' },
]; 

const MerchantsTable = () => {
  const navigate = useNavigate();

  const optionsClickHandler = (merchant, action) => {
    navigate(`/merchants/${merchant.replace(/\s/g, '').toLowerCase()}/${action.toLowerCase()}`);
  };

  useEffect(() => {
    return () => {
      console.log('Cleanup code');
    };
  }, []);

  return (
    <div className='merchant-container'>
    <div className='add-merchant-container'>
    <button >Add Merchant</button>
    </div>
      <table className="table table-borderless border-0">
        <thead>
          <tr style={{ border: 'none' }}>
            <th scope="col"></th>
            <th scope="col">Merchants</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} >
              <th scope="row">{row.serialNumber}</th>
              <td colSpan="2" className="col-6">
                {row.merchant}
              </td>
              <td className="td">
                <button
                  className="action-button"
                  onClick={() => optionsClickHandler(row.merchant, 'transactions')}
                >
                  Transactions
                </button>
              </td>
              <td className="td">
                <button
                  className="action-button"
                  onClick={() => optionsClickHandler(row.merchant, 'add-user')}
                >
                  Add user
                </button>
              </td>
              <td className="td">
                <button
                  className="border-button"
                  onClick={() => optionsClickHandler(row.merchant, 'settings')}
                >
                  Settings
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MerchantsTable;
