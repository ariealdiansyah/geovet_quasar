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
    const res = await api.get(`/groomings/`, {
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

export const addData = async ({ rootGetters, commit }, data) => {
  try {
    const res = await api.post(`/groomings/create`, data)
    if (res) {
      console.log('res', res.data)
    }
    return res.data
  } catch (error) {
    console.error(error);
  }
}

export const editData = async ({ rootGetters, commit }, data) => {
  try {
    const handlerPage = rootGetters['global/getPagination']
    const res = await api.post(`/groomings/`, data)
    if (res) {
      console.log('res', res.data)
    }
    return res.data
  } catch (error) {
    console.error(error);
  }
}

export const deleteData = async ({ rootGetters, dispatch }, id) => {
  try {
    const handlerPage = rootGetters["global/getPagination"];
    const res = await api.delete(`/groomings/delete/${id}`);
    if (res) {
      console.log("res", res.data);
      dispatch("getData");
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDetail = async ({ rootGetters, commit }, id) => {
  try {
    const handlerPage = rootGetters['global/getPagination']
    const res = await api.get(`/groomings/${id}`)

    if (res) {
      console.log('res', res.data)
      commit('setData', res.data)
    }
    return res.data
  } catch (error) {
    console.error(error);
  }
}
