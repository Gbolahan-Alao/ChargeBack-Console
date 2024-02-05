import axios from 'axios';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    fetchFileData();
  }, []); // Fetch file data on component mount

  const fetchFileData = () => {
    axios.get('https://localhost:7027/File/files')
      .then((response) => {
        setFilteredData(response.data); // Update the state with the fetched files
        console.log("Files obtained from context:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching file data: ", error);
      });
  };

  return (
    <>
      <IssuerDisputesFilter onFilterChange={handleFilterChange} />
      <IssuerDisputesTable data={filteredData} statusFilter={selectedStatus} />
    </>
  );
}

export default IssuerDisputes;
