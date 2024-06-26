import { api } from 'boot/axios'

export const getData = async ({ rootGetters, commit }, filter) => {
  try {
    const handlerPage = rootGetters['global/getPagination'];
    const dynamicParams = {
      page: handlerPage.page,
      per_page: handlerPage.rowsPerPage,
      search: filter,
      // Add more parameters as needed
    };
    const res = await api.get(`/customer`, {
      params: dynamicParams,
    })
    if (res) {
      const { data } = res.data
      commit('setData', data.data)
    }
    return;
  } catch (error) {
    console.error(error);
  }
}

export const addData = async ({ rootGetters, commit, dispatch }, data) => {
  try {
    const handlerPage = rootGetters['global/getPagination']
    const res = await api.post(`/customer/`, data)
    if (res) {
      console.log('res', res.data)
    }
    dispatch('login/getAllDataCustomer', null, { root: true })
    return res.data
  } catch (error) {
    console.error(error);
  }
}

export const editData = async ({ rootGetters, commit }, data) => {
  try {
    const handlerPage = rootGetters['global/getPagination']
    const res = await api.post(`/customer/`, data)
    if (res) {
      console.log('res', res.data)
    }
    return res.data
  } catch (error) {
    console.error(error);
  }
}

export const getDetail = async ({ rootGetters, commit }, id) => {
  try {
    const handlerPage = rootGetters['global/getPagination']
    const res = await api.get(`/customer/${id}`)

    if (res) {
      console.log('res', res.data)
      commit('setData', res.data)
    }
    return res.data
  } catch (error) {
    console.error(error);
  }
}
