import { api } from 'boot/axios'
import { root } from 'postcss';

export const getData = async ({ rootGetters, commit }, filter) => {
  try {
    const handlerPage = rootGetters['global/getPagination']
    const dynamicParams = {
      page: handlerPage.page,
      rowsPerPage: handlerPage.rowsPerPage,
      filter: filter,
    };
    const res = await api.get(`/medicine/`, {
      params: dynamicParams,
    })

    if (res) {
      const { list } = res;
      commit('setData', list)
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
    return res.data
  } catch (error) {
    console.error(error);
  }
}

export const addData = async ({ dispatch }, data) => {
  console.log('data obat', data)
  try {
    const res = await api.post(`/medicine`, data)
    if (res) {
      console.log('res', res)
      dispatch("login/getAllDataMedicine", null, { root: true })
    }
    return res
  } catch (error) {
    console.error(error);
  }
}

export const editData = async ({ dispatch }, data) => {
  try {
    const res = await api.post(`/medicine/`, data)
    if (res) {
      console.log('res', res)
      dispatch("login/getAllDataMedicine", null, { root: true })
    }
    return res
  } catch (error) {
    console.error(error);
  }
}

export const getDetail = async ({ rootGetters, commit }, id) => {
  try {
    const res = await api.get(`/medicine/${id}`)

    if (res) {
      console.log('res', res)
      commit('setDetail', res)
    }
    return res
  } catch (error) {
    console.error(error);
  }
}

export const deleteData = async ({ rootGetters, dispatch }, id) => {
  try {
    const res = await api.delete(`/medicine/${id}`);
    if (res) {
      console.log("res", res);
      dispatch("getData");
      dispatch("login/getAllDataMedicine", null, { root: true })
    }
    return res;
  } catch (error) {
    console.error(error);
  }
};
