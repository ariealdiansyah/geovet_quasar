import { api } from "boot/axios";

export const getDataClinic = async ({ rootGetters, commit }, filter) => {
  // console.log('masuk data', filter)
  try {
    const handlerPage = rootGetters["global/getPagination"];
    console.log("handlerPage", handlerPage);

    const dynamicParams = {
      page: handlerPage.page,
      per_page: handlerPage.rowsPerPage,
      search: filter,
      // Add more parameters as needed
    };

    // const res = await api.get(`/groceries/?page=${handlerPage.page}&per_page=${handlerPage.rowsPerPage}&search=${filter}`)
    const res = await api.get(`/groceries/`, {
      params: dynamicParams,
    });

    const { data } = res;

    if (data) {
      // console.log('res', data.data)
      // console.log('res 2', data.data.data)
      commit("setData", data.data.data);
      commit(
        "global/setLocalPagination",
        {
          sortBy: "asc",
          descending: false,
          page: data.data.current_page,
          rowsPerPage: data.data.per_page,
          rowsNumber: data.data.total,
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
    const handlerPage = rootGetters["global/getPagination"];
    const res = await api.post(`/groceries/`, data);
    if (res) {
      // console.log("res", res.data);
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const editData = async ({ rootGetters, commit }, payload) => {
  try {
    const handlerPage = rootGetters['global/getPagination']
    const res = await api.patch(`/groceries/update/${payload.id}`, {
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
    const res = await api.delete(`/groceries/delete/${id}`);
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
    const res = await api.get(`/groceries/detail/${id}`);

    if (res) {
      const { data } = res.data;
      commit("setDataDetail", data);
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
