import { api } from "boot/axios";

export const getData = async ({ rootGetters, commit }, filter) => {
  try {
    const handlerPage = rootGetters["global/getPagination"];
    const dynamicParams = {
      page: handlerPage.page,
      rowsPerPage: handlerPage.rowsPerPage,
      filter: filter,
    };

    const res = await api.get(`/groceries`, {
      params: dynamicParams,
    });

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
    return res.list;
  } catch (error) {
    console.error(error);
  }
};

export const addData = async ({ dispatch }, data) => {
  try {
    const res = await api.post(`/groceries/`, data);
    if (res) {
      dispatch('login/getAllDataPetshop', null, { root: true })
    }
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const editData = async ({ dispatch }, payload) => {
  try {
    const res = await api.patch(`/groceries/${payload._id}`, payload)
    if (res) {
      dispatch('login/getAllDataPetshop', null, { root: true })
    }
    return res
  } catch (error) {
    console.error(error);
  }
};

export const deleteData = async ({ rootGetters, dispatch }, id) => {
  try {
    const res = await api.delete(`/groceries/${id}`);
    if (res) {
      dispatch("getData");
      dispatch('login/getAllDataPetshop', null, { root: true })
    }
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getDetail = async ({ rootGetters, commit }, id) => {
  try {
    const data = await api.get(`/groceries/${id}`)
    if (data) {
      commit('setDetail', data)
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};
