import { api } from 'boot/axios'

export const getData = async ({ rootGetters, commit }, filter) => {
  try {
    const handlerPage = rootGetters['global/getPagination']
    const dynamicParams = {
      page: handlerPage.page,
      per_page: handlerPage.rowsPerPage,
      search: filter,
      // Add more parameters as needed
    };
    const res = await api.get(`/medicine/`, {
      params: dynamicParams,
    })

    if (res) {
      const { data } = res.data;
      console.log('res', res.data)
      commit('setData', data.data)
    }
    return res.data
  } catch (error) {
    console.error(error);
  }
}

export const addData = async (data) => {
  try {
    const res = await api.post(`/medicine/create`, data)
    if (res) {
      console.log('res', res.data)
    }
    return res.data
  } catch (error) {
    console.error(error);
  }
}

export const editData = async ({ rootGetters }, data) => {
  try {
    const res = await api.post(`/medicine/`, data)
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
    const res = await api.get(`/medicine/${id}`)

    if (res) {
      console.log('res', res.data)
      commit('setData', res.data)
    }
    return res.data
  } catch (error) {
    console.error(error);
  }
}

export const deleteData = async ({ rootGetters, dispatch }, id) => {
  try {
    const res = await api.delete(`/medicine/delete/${id}`);
    if (res) {
      console.log("res", res.data);
      dispatch("getData");
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
