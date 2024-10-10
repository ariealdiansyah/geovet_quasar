export const setData = (state, payload) => {
  state.data = payload;
};

export const setDetail = (state, payload) => {
  const data = {
    ...payload,
    // type: getType(payload.type),
    // sex: getSex(payload.sex)
  }
  state.detail = data
}
