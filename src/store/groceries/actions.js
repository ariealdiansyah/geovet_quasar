import { api } from "boot/axios";

export const getData = async ({ rootGetters, commit }, filter) => {
  try {
    const handlerPage = rootGetters["global/getPagination"];
    const dynamicParams = {
      page: handlerPage.page,
      per_page: handlerPage.rowsPerPage,
      search: filter,
      // Add more parameters as needed
    };

    // const res = await api.get(`/groceries/?page=${handlerPage.page}&per_page=${handlerPage.rowsPerPage}&search=${filter}`)
    const res = await api.get(`/groceries`, {
      params: dynamicParams,
    });
    console.log(res)
    const { data } = res.data;

    if (data) {
      commit("setData", data.data);
      commit(
        "global/setLocalPagination",
        {
          sortBy: "asc",
          descending: false,
          page: data.current_page,
          rowsPerPage: data.per_page,
          rowsNumber: data.total,
        },
        { root: true }
      );
    }
    return data;
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
      console.log('res', res.data)
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
    const handlerPage = rootGetters["global/getPagination"];
    const res = await api.get(`/groceries/detail/${id}`);

    if (res) {
      console.log("res", res.data);
      const { data } = res.data;
      commit("setDataDetail", data);
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
