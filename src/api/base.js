export default {
  headers() {
    const token = JSON.parse(sessionStorage.getItem('authUser'));
    const headers = {
      'x-access-token': `${token}`
    }
    return headers
  }
}
