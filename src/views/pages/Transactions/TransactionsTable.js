import React from 'react';
import { useTable } from 'react-table';
import './TransactionsTable.css';

const TransactionsTable = ({ data }) => {
   
  const columns = React.useMemo(
    () => [
      {
        Header: 'File Name',
        accessor: 'fileName',
      },
      {
        Header: 'Progress Status',
        accessor: 'progressStatus',
        Cell: ({ value }) => (
          <div
            style={{
              borderColor: getStatusColor(value).borderColor,
              color: getStatusColor(value).color,
            }}
          >
            {value}
          </div>
        ),
      },
      {
        Header: 'Date Created',
        accessor: 'dateCreated',
      },
      {
        Header: 'Total Successful',
        accessor: 'totalSuccessful',
      },
      {
        Header: 'Total Failed',
        accessor: 'totalFailed',
      },
      {
        Header: 'Actions',
        accessor: 'actions', // Use file name as a unique identifier for buttons
        Cell: ({ value, row }) => (
          <button
            onClick={() => handleDownloadClick(value)}
            disabled={row.original.progressStatus !== 'completed'}
            style={{
              backgroundColor:
                row.original.progressStatus === 'completed' ? 'green' : 'gray',
              color: 'white',
              cursor:
                row.original.progressStatus === 'completed'
                  ? 'pointer'
                  : 'not-allowed',
            }}
          >
            Download
          </button>
        ),
      },
    ],
    []
  );

  const getStatusColor = status => {
    switch (status) {
      case 'completed':
        return { borderColor: 'green', color: 'green' };
      case 'pending':
        return { borderColor: 'yellow', color: 'yellow' };
      case 'failed':
        return { borderColor: 'red', color: 'red' };
      default:
        return {};
    }
  };

  const handleDownloadClick = fileName => {
    // Implement your download logic here
    console.log(`Downloading ${fileName}`);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table style={{border:'none'}}{...getTableProps()}>
      <thead >
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TransactionsTable;

