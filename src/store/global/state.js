export default function () {
  return {
    localPagination: {
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 0,
      rowsNumber: 5
    },
    userProfile: {
      username: '',
      role: '',
      fullname: ''
    },
    dialogOpname: false,
    customerList: [],
    petList: [],
    petshopList: [],
    medicineList: [],
  }
}
