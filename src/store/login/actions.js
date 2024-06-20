import { api } from 'boot/axios'
import { root } from 'postcss';

export const loginUser = async ({ commit, dispatch }, login) => {
  try {
    // const data = new FormData()
    const passwordEncode = btoa(login.password)
    const res = await api.post('auth/login', {
      username: login.username,
      password: passwordEncode
    })
    if (res) {
      console.log('res', res.data.token)
      const token = res.data.token;
      localStorage.setItem('authUser', JSON.stringify(token))
      // router.push('/')0
      const CACHE_DURATION = 1000;
      const savedOn = Date.now()
      const cutoff = Date.now() - CACHE_DURATION;
      dispatch('getAllDataCustomer');
      dispatch('getAllDataPets');
      setTimeout(() => {
        console.log('check', savedOn < cutoff, savedOn, cutoff)
      }, 10000);
      commit('global/setUserActive', token, { root: true })
    }
    return res.data
  } catch (error) {
    console.error(error);
  }
}

export const getAllDataCustomer = async ({ rootGetters, commit }) => {
  console.log('masuk get list customer')
  try {
    const res = await api.get(`/customer/`)
    if (res) {
      const { data } = res.data
      console.log('data yg akan diinput ke list customer', data)
      commit('global/setListCustomer', data, { root: true })
    }
    return res.data
  } catch (error) {
    console.error(error);
  }
}

export const getAllDataPets = async ({ rootGetters, commit }) => {
  console.log('masuk get list pets')
  try {
    const res = await api.get(`/pets/`)
    if (res) {
      const { data } = res.data
      console.log('data yg akan diinput ke list pets', data)
      commit('global/setListPets', data, { root: true })
    }
    return res.data
  } catch (error) {
    console.error(error);
  }
}
