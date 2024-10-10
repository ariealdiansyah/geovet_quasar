import { api } from 'boot/axios'

export const getData = async ({ rootGetters, commit }, filter) => {
  try {
    const handlerPage = rootGetters['global/getPagination'];
    const dynamicParams = {
      page: handlerPage.page,
      rowsPerPage: handlerPage.rowsPerPage,
      filter: filter,
    };
    const res = await api.get(`/pet/`, {
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
    return res.list
  } catch (error) {
    console.error(error);
  }
}

export const addData = async ({ dispatch }, data) => {
  try {
    const res = await api.post(`/pet`, data)
    dispatch('login/getAllDataPets', null, { root: true })
    return res
  } catch (error) {
    console.error(error);
  }
}

export const editData = async ({ dispatch }, data) => {
  try {
    const res = await api.patch(`/pet/${data._id}`, data)
    if (res) {
      dispatch('login/getAllDataPets', null, { root: true })
    }
    return res
  } catch (error) {
    console.error(error);
  }
}

export const deleteData = async ({ dispatch }, id) => {
  try {
    const res = await api.delete(`/pet/${id}`);
    if (res) {
      dispatch("getData");
      dispatch('login/getAllDataPets', null, { root: true })
    }
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getDetail = async ({ commit }, id) => {
  try {
    const data = await api.get(`/pet/${id}`)
    if (data) {
      commit('setDetail', data)
    }
    return data
  } catch (error) {
    console.error(error);
  }
}

export const generateMedicalNumber = async ({ dispatch }, id) => {
  try {
    const res = await api.post(`/pet/generate-medical-number/${id}`)
    dispatch('login/getAllDataPets', null, { root: true })
    return res.medicalNumber
  } catch (error) {
    console.error(error);
  }
}
