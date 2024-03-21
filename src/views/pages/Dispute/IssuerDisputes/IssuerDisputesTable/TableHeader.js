
const TableHeader = () => {
    return (
        <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
                <th style={{ textAlign: 'left' }}>Id</th>
                <th style={{ textAlign: 'left' }}>Date Logged</th>
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
    );
};

export default TableHeader