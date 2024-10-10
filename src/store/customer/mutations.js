export const setData = (state, payload) => {
  console.log('payload', payload)
  state.data = payload
}

export const setDetail = (state, payload) => {
  state.detail = payload
}
