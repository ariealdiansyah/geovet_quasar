import { api } from 'boot/axios'

export const loginUser = async ({ commit }, login) => {
  try {
    const data = new FormData()
    const passwordEncode = btoa(login.password)
    const res = await api.post('auth/login', {
      username: login.username,
      password: passwordEncode
    })
    if (res) {
      console.log('res', res.data)
      const token = res.data.token
      localStorage.setItem('authUser', JSON.stringify(token))
      // router.push('/')
      commit('global/setUserActive', token, { root: true })
    }
    return res.data
  } catch (error) {
    console.error(error);
  }
}
