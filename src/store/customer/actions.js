import { api } from 'boot/axios'

export const getData = async ({ rootGetters, commit }, filter) => {
  try {
    const handlerPage = rootGetters['global/getPagination'];
    const dynamicParams = {
      page: handlerPage.page,
      rowsPerPage: handlerPage.rowsPerPage,
      filter: filter,
    };
    const res = await api.get(`/customers`, {
      params: dynamicParams,
    })
    if (res) {
      commit('setData', res.list)
      commit(
        "global/setLocalPagination",
        {
          sortBy: "asc",
          descending: false,
          page: res.pagination.page,
          rowsPerPage: res.pagination.rowsPerPage,
          rowsNumber: res.pagination.total,
        },
        { root: true }
      );
    }
    return res;
  } catch (error) {
    console.error(error);
  }
}

export const addData = async ({ dispatch }, data) => {
  try {
    const res = await api.post(`/customers/`, data)
    if (res) {
      console.log('res', res)
    }
    dispatch('login/getAllDataCustomer', null, { root: true })
    return res
  } catch (error) {
    console.error(error);
  }
}

export const editData = async ({ dispatch }, data) => {
  try {
    const res = await api.patch(`/customers/${data._id}`, data)
    if (res) {
      console.log('res', res)
      dispatch('login/getAllDataCustomer', null, { root: true })
    }
    return res
  } catch (error) {
    console.error(error);
  }
}

export const getDetail = async ({ commit }, id) => {
  try {
    const data = await api.get(`/customers/${id}`)
    if (data) {
      commit('setDetail', data)
    }
    return data
  } catch (error) {
    console.error(error);
  }
}

export const deleteData = async ({ dispatch }, id) => {
  try {
    const res = await api.delete(`/customers/${id}`);
    if (res) {
      dispatch("getData");
      dispatch('login/getAllDataCustomer', null, { root: true })
    }
    return res;
  } catch (error) {
    console.error(error);
  }
};
