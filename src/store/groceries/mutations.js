export const setData = (state, payload) => {
  console.log('payload', payload)
  state.data = payload
}

export const setDataDetail = (state, payload) => {
  console.log('payload', payload)
  state.dataDetail = payload
}

export const setDataTempEdit = (state, payload) => {
  console.log('payload', payload)
  state.dataDetail[payload.type] = payload.value
}
