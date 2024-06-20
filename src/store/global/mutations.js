export const setLocalPagination = (state, value) => {
  const {
    sortBy, descending, page, rowsPerPage, rowsNumber
  } = value;
  console.log('check pagination', value)
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
  console.log('value mutations', value)
  const [header, data, signature] = value.split('.');
  const decodedPayload = JSON.parse(atob(data));
  const userProfile = {
    username: decodedPayload.username,
    name: decodedPayload.name,
    role: decodedPayload.role
  }
  console.log('mutations', userProfile)
  state.userProfile = userProfile
  state.token = value
}

export const setDialogOpname = (state, value) => {
  state.dialogOpname = value
}

export const setListCustomer = (state, payload) => {
  const list = payload.map((item) => {
    return {
      ...item,
      label: `${item.name} - ${item.address}`,
      valueOptions: item.id
    }
  })
  console.log('update customer list', list)
  state.customerList = list
}

export const setListPets = (state, payload) => {
  const list = payload.map((item) => {
    return {
      ...item,
      label: `${item.name} - ${item.address}`,
      valueOptions: item.id
    }
  })
  console.log('update pet list', list)
  state.petList = list
}
