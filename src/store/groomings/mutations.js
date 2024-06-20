export const setData = (state, payload) => {
  console.log("payload pets", payload);
  state.data = payload;
};
