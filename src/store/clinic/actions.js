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

export const addData = async ({ }, data) => {
  try {
    const res = await api.post(`/medical-record/`, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const editData = async ({ }, payload) => {
  try {
    const res = await api.patch(`/medical-record/${payload._id}`, payload)
    return res
  } catch (error) {
    console.error(error);
  }
};

export const getDetail = async ({ commit }, id) => {
  try {
    const res = await api.get(`/medical-record/${id}`);

    if (res) {
      commit("setDataDetail", res);
    }
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const printMedicalRecord = async ({ dispatch, rootGetters }, { data }) => {
  const { default: PrintService } = await import(
    'src/services/print/medical'
  );
  const res = await new Promise((resolve) => {
    PrintService({
      data,
      onDone: async (base64String, isMobileDevice, pageNumber) => {
        resolve({ base64String, isMobileDevice, pageNumber });
      },
      isDownload: false
    });
  });
  return res;
};
