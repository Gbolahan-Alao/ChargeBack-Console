import { useState } from 'react';
import { issuerDisputeDummyData } from 'src/data/IssuerDisputeDummyData';
import IssuerDisputesFilter from '../IssuerDisputesFilter/IssuerDisputesFilter';
import IssuerDisputesTable from './IssuerDisputesTable/IssuerDisputesTable';

const IssuerDisputes = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleFilterChange = (selectedStatus) => {
    setSelectedStatus(selectedStatus);
    const updatedFilteredData = filterData(issuerDisputeDummyData, selectedStatus);
    setFilteredData(updatedFilteredData);
  };

  const filterData = (data, status) => {
    const lowerCaseStatus = status.toLowerCase();
    return data.filter((item) => item.status.toLowerCase() === lowerCaseStatus);
  };

  return (
    <>
      <IssuerDisputesFilter onFilterChange={handleFilterChange} />
      <IssuerDisputesTable data={filteredData} statusFilter={selectedStatus} />
    </>
  );
}

export default IssuerDisputes;
