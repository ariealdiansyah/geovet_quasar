export const checkUser = ({ commit }) => {
  if (!sessionStorage.getItem('authUser')) {
    this.$router.push("/")
  } else {
    commit('setUserActive', sessionStorage.getItem('authUser'))
  }
}
