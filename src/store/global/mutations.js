export const setLocalPagination = (state, value) => {
  const {
    sortBy, descending, page, rowsPerPage, rowsNumber
  } = value;
  state.localPagination = {
    sortBy,
    descending,
    page,
    rowsPerPage,
    rowsNumber
  };
};

export const setDefaultGlobalPagination = (state, value) => {
  state.localPagination = {
    sortBy: 'asc',
    descending: false,
    page: 1,
    rowsPerPage: 5,
    rowsNumber: 5
  };
}

export const setUserActive = (state, value) => {
  console.log(state, value)
  const [header, data, signature] = value.split('.');
  const decodedPayload = JSON.parse(atob(data));
  console.log('user mutations', decodedPayload)
  state.userProfile.username = decodedPayload.username
  state.userProfile.name = decodedPayload.name
  state.userProfile.role = decodedPayload.role
  state.token = value
  console.log('get', state.userProfile)
}

export const setDialogOpname = (state, value) => {
  state.dialogOpname = value
}
