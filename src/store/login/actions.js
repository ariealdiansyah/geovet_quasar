import { api } from 'boot/axios'
import { Router as router } from 'src/router';

export const loginUser = async ({ commit, dispatch }, login) => {
  try {
    const passwordEncode = btoa(login.password)
    const res = await api.post('auth/login', {
      username: login.username,
      password: passwordEncode
    })
    if (res) {
      const token = res.access_token;
      localStorage.setItem('authUser', JSON.stringify(token))
      dispatch('getAllDataCustomer');
      dispatch('getAllDataPets');
      dispatch('getAllDataPetshop');
      dispatch('getAllDataMedicine');
      const datauser = {
        username: res.username,
        fullname: res.fullname,
        role: res.role
      }
      commit('global/setUserActive', datauser, { root: true })
    }
    return {
      ...res,
      access_token: ''
    };
  } catch (error) {
    console.error(error);
  }
}

export const getAllDataCustomer = async ({ rootGetters, commit }) => {
  try {
    const res = await api.get(`/customers/all`)
    commit('global/setListCustomer', res, { root: true })
    return res
  } catch (error) {
    console.error(error);
  }
}

export const getAllDataPets = async ({ rootGetters, commit }) => {
  try {
    const res = await api.get(`/pet/all`)
    commit('global/setListPets', res, { root: true })
    return res
  } catch (error) {
    console.error(error);
  }
}

export const getAllDataPetshop = async ({ rootGetters, commit }) => {
  try {
    const res = await api.get(`/groceries/all`)
    commit('global/setListPetshop', res, { root: true })
    return res
  } catch (error) {
    console.error(error);
  }
}

export const getAllDataMedicine = async ({ rootGetters, commit }) => {
  try {
    const res = await api.get(`/medicine/all`)
    commit('global/setListMedicine', res, { root: true })
    return res
  } catch (error) {
    console.error(error);
  }
}

export const logout = () => {
  localStorage.removeItem("authUser");
  localStorage.clear();
  router.push('/login');
};
