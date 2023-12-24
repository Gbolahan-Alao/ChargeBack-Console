import WidgetsDropdown from 'src/views/widgets/WidgetsDropdown';
import TransactionsTable from './TransactionsTable';

export const Transactions = () => {
  const transactionData = [
        {fileName:'dhdjeje.gd',progressStatus:'pending',dateCreated:'2023-03-21', totalSuccessful:1223,totalFailed:33443},
        {fileName:'dhdjeje.gd',progressStatus:'completed',dateCreated:'2023-03-21', totalSuccessful:1223,totalFailed:33443},
        {fileName:'dhdjeje.gd',progressStatus:'failed',dateCreated:'2023-03-21', totalSuccessful:1223,totalFailed:33443},
        {fileName:'dhdjeje.gd',progressStatus:'Pending',dateCreated:'2023-03-21', totalSuccessful:1223,totalFailed:33443},
        {fileName:'dhdjeje.gd',progressStatus:'Pending',dateCreated:'2023-03-21', totalSuccessful:1223,totalFailed:33443},
    ]
  return (
    <div>
      <WidgetsDropdown className="mb-4" all={400} approved={350} pending={35} rejected={15} />
      <TransactionsTable data={transactionData}/>
    </div>
  )
}

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const TransactionsPage = () => {
//   const { merchant } = useParams();
//   const [merchantData, setMerchantData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`/api/merchants/${merchant}/transactions`);
//         const data = await response.json();
//         setMerchantData(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [merchant]);

//   return (
//     <div>
//       <h1>{merchant} Transactions</h1>
//       {merchantData ? (
//         <ul>
//           {merchantData.transactions.map((transaction) => (
//             <li key={transaction.id}>{transaction.description}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default TransactionsPage;
