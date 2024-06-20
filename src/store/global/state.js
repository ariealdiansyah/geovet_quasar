export default function () {
  return {
    localPagination: {
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 5,
      rowsNumber: 5
    },
    userProfile: {
      username: '',
      role: '',
      name: ''
    },
    dialogOpname: false,
    customerList: [],
    petList: [],
  }
}
