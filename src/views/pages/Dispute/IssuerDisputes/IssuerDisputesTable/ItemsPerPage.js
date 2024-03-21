
const ItemsPerPage = ({ itemsPerPage, handleItemsPerPageChange, itemsPerPageOptions }) => {
    return (
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
    );
};


export default ItemsPerPage