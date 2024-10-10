import { api } from "boot/axios";

export const getDataClinic = async ({ rootGetters, commit }, filter) => {
  // console.log('masuk data', filter)
  try {
    const handlerPage = rootGetters["global/getPagination"];
    console.log("handlerPage", handlerPage);

    const dynamicParams = {
      page: handlerPage.page,
      per_page: handlerPage.rowsPerPage,
      filter: filter,
      // Add more parameters as needed
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
    if (res) {
      console.log('res', res)
    }
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const editData = async ({ rootGetters, commit }, payload) => {
  try {
    const handlerPage = rootGetters['global/getPagination']
    const res = await api.patch(`/clinic/update/${payload.id}`, {
      ...payload.value
    })
    if (res) {
      // console.log('res', res.data)
    }
    return res.data
  } catch (error) {
    console.error(error);
  }
};

export const deleteData = async ({ rootGetters, dispatch }, id) => {
  try {
    const handlerPage = rootGetters["global/getPagination"];
    const res = await api.delete(`/clinic/delete/${id}`);
    if (res) {
      // console.log("res", res.data);
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
