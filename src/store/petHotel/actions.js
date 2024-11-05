import { api } from 'boot/axios'

export const getPetHotel = async ({ commit }, filter) => {
  try {
    const handlerPage = rootGetters["global/getPagination"];
    const dynamicParams = {
      page: handlerPage.page,
      rowsPerPage: handlerPage.rowsPerPage,
      filter: filter,
    };
    const res = await api.get(`/petHotel`, {
      params: dynamicParams,
    });

    if (res) {
      const { list } = res;
      commit('setList', list)
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
}
