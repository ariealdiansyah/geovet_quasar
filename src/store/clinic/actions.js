import { api } from "boot/axios";

export const getDataClinic = async ({ rootGetters, commit }, filter) => {
  try {
    const handlerPage = rootGetters["global/getPagination"];
    const dynamicParams = {
      page: handlerPage.page,
      rowsPerPage: handlerPage.rowsPerPage,
      filter: filter,
    };
    const res = await api.get(`/medical-record`, {
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
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const addData = async ({ rootGetters, commit }, data) => {
  try {
    const res = await api.post(`/medical-record/`, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const editData = async ({ rootGetters, commit }, payload) => {
  try {
    const res = await api.patch(`/clinic/update/${payload.id}`, {
      ...payload.value
    })
    return res
  } catch (error) {
    console.error(error);
  }
};

export const deleteData = async ({ rootGetters, dispatch }, id) => {
  try {
    const res = await api.delete(`/clinic/delete/${id}`);
    if (res) {
      dispatch("getData");
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDetail = async ({ rootGetters, commit }, id) => {
  try {
    const handlerPage = rootGetters["global/getPagination"];
    const res = await api.get(`/clinic/detail/${id}`);

    if (res) {
      const { data } = res.data;
      commit("setDataDetail", data);
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
