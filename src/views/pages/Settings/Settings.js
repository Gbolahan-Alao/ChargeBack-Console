
const merchantsData = [
  { serialNumber: 1, merchantName: 'Fair Money' },
  { serialNumber: 2, merchantName: 'OPay' },
  { serialNumber: 3, merchantName: 'PalmPay' },
];

const MerchantsTable = () => {
  const handleButtonClick = (merchantName, action) => {
    console.log(`Clicked ${action} for ${merchantName}`);
    // You can add your logic for each button action here
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Serial Number</th>
          <th>Merchants</th>
        </tr>
      </thead>
      <tbody>
        {merchantsData.map((merchant) => (
          <tr key={merchant.serialNumber}>
            <td>{merchant.serialNumber}</td>
            <td>
              {merchant.merchantName}
              <div className="button-group">
                <button onClick={() => handleButtonClick(merchant.merchantName, 'Settings')}>Settings</button>
                <button onClick={() => handleButtonClick(merchant.merchantName, 'Transaction')}>Transaction</button>
                <button onClick={() => handleButtonClick(merchant.merchantName, 'Add User')}>Add User</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MerchantsTable;