export const getPagination = (state) => state.localPagination;

export const requestPagination = (state) => {
  const {
    page, rowsPerPage, rowsNumber
  } = state.localPagination;
  return {
    index: page === 1 ? 1 : rowsPerPage * (page - 1) + 1,
    limit: rowsPerPage === 0 ? rowsNumber : rowsPerPage
  };
};

export const getUser = (state) => state.userProfile

export const dialogOpname = (state) => state.dialogOpname
