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
    rowsPerPage: 0,
    rowsNumber: 5
  };
}

export const setUserActive = (state, value) => {
  const userProfile = value
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
      value: item._id
    }
  })
  state.customerList = list
}

export const setListPets = (state, payload) => {
  const list = payload.map((item) => {
    return {
      ...item,
      label: `${item.name} - ${getPetType(item.type)} ${item.medicalNumber ? `- ${item.medicalNumber}` : ''}`,
      value: item._id
    }
  })
  state.petList = list
}

export const setListPetshop = (state, payload) => {
  const list = payload.map((item) => {
    return {
      ...item,
      label: item.name,
      value: item._id,
    }
  })
  state.petshopList = list.filter((x) => x.stock > 0)
}

export const setListMedicine = (state, payload) => {
  const list = payload.map((item) => {
    return {
      ...item,
      label: item.name,
      value: item._id
    }
  })
  state.medicineList = list
}

const getPetType = (value) => {
  switch (value) {
    case "KCG":
      return "Kucing";
    case "AYM":
      return "AYAM";
    case "EXO":
      return "Exotic Pet";
    case "FRM":
      return "Ternak";
  }
}

const getPetSex = (value) => {
  switch (value) {
    case "L":
      return "Laki - Laki";
    case "P":
      return "Perempuan";
  }
}

