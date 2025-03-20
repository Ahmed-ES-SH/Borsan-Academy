export const handlePageChange = (
  newPage: number,
  lastPage: number,
  setCurrentPage: (page: number) => void
) => {
  if (newPage > 0 && newPage <= lastPage) {
    setCurrentPage(newPage);
  }
};
