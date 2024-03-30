export const setUser = (state, payload) => {
  const [header, data, signature] = payload.token.split('.');
  const decodedPayload = JSON.parse(atob(data));

  state.userProfile.token = payload.token
  state.userProfile.username = decodedPayload.username
  state.userProfile.name = decodedPayload.name
  state.userProfile.role = decodedPayload.role
}
