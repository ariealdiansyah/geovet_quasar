export const setData = (state, payload) => {
  console.log('payload groceries', payload)
  state.data = payload
}

export const setDetail = (state, payload) => {
  state.dataDetail = payload
}

export const setDataTempEdit = (state, payload) => {
  state.dataDetail[payload.type] = payload.value
}
