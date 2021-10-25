import TablePagination from '@mui/material/TablePagination';

export const Pagination = ({ currentPage, totalCount, pageSize, onPageChange, onRowsPerPageChange }) => {
  return (
    <TablePagination
      component="div"
      count={totalCount}
      page={currentPage}
      onPageChange={onPageChange}
      rowsPerPage={pageSize}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
};
