import { api } from 'boot/axios'

export const getData = async ({ rootGetters, commit }, filter) => {
  console.log('masuk data', filter)
  try {
    const handlerPage = rootGetters['global/getPagination']
    console.log('handlerPage', handlerPage)

    const res = await api.get(`/customer/?page=${handlerPage.page}&per_page=${handlerPage.rowsPerPage}&search=${filter}`)

    if (res) {
      console.log('res', res.data)
      commit('setData', res.data)
    }
    return res.data
  } catch (error) {
    console.error(error);
  }
}

export const addData = async ({ rootGetters, commit }, data) => {
  console.log('masuk data', data)
  try {
    const handlerPage = rootGetters['global/getPagination']
    console.log('handlerPage', handlerPage)
    const res = await api.post(`/customer/`, data)
    if (res) {
      console.log('res', res.data)
    }
    return res.data
  } catch (error) {
    console.error(error);
  }
}

export const editData = async ({ rootGetters, commit }, data) => {
  console.log('masuk data', data)
  try {
    const handlerPage = rootGetters['global/getPagination']
    console.log('handlerPage', handlerPage)
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
  console.log('masuk data', filter)
  try {
    const handlerPage = rootGetters['global/getPagination']
    console.log('handlerPage', handlerPage)

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
