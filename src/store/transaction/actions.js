import { api } from 'boot/axios'

export const printInvoice = async ({ dispatch, rootGetters }, { data }) => {
  const { default: PrintService } = await import(
    'src/services/print/invoice'
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
  // const { base64String, isMobileDevice, pageNumber } = res;

  // if (isMobileDevice) {
  //   const selectedAgent = await showRemoteAgent({ rootGetters }, pageNumber);
  //   await dispatch(
  //     'remotePrint/remotePrint',
  //     {
  //       typePrint: PRINT_TYPE.REGISTER_OU,
  //       accountNo: { debit: '', credit: '' },
  //       base64String,
  //       agent: selectedAgent.value,
  //       formatFile: FORMAT_FILE.PDF,
  //       printerType: PRINTER_TYPE.OLIPRT2
  //     },
  //     { root: true }
  //   );
  // }
};

export const addTransaction = async ({ }, data) => {
  try {
    const res = await api.post('/transaction', data)
    return res;
  } catch (error) {
    console.error(error);
  }
}

export const getSummary = async ({ commit }, rangeDate) => {
  try {
    const param = {
      startDate: rangeDate.startDate,
      endDate: rangeDate.endDate
    }
    const res = await api.get('/transaction/summary', {
      params: param
    })

    if (res) {
      commit('setSummary', res)
    }
    return res;
  } catch (error) {
    console.error(error);
  }
}

export const getDataTransaction = async ({ rootGetters, commit }, filter) => {
  try {
    const handlerPage = rootGetters["global/getPagination"];
    const dynamicParams = {
      page: handlerPage.page,
      per_page: handlerPage.rowsPerPage,
      filter: filter,
    };
    const res = await api.get(`/transaction`, {
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

export const getDetail = async ({ commit }, id) => {
  try {
    const data = await api.get(`/transaction/${id}`)
    if (data) {
      commit('setDetail', data)
    }
    return data
  } catch (error) {
    console.error(error);
  }
}
