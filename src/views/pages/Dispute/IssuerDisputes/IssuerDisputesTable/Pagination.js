
const Pagination = ({ currentPage, pageCount, handlePageChange }) => {
    return (
        <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                Previous
            </button>
            <span>{`Page ${currentPage + 1} of ${pageCount}`}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageCount - 1}>
                Next
            </button>
        </div>
    );
};

export default Pagination
