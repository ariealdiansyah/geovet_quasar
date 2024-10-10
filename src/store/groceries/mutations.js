export const setData = (state, payload) => {
  state.data = payload
}

export const setDetail = (state, payload) => {
  state.dataDetail = payload
}

export const setDataTempEdit = (state, payload) => {
  state.dataDetail[payload.type] = payload.value
}
