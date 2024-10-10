import { api } from 'boot/axios'

export const getAppointment = async ({ commit }, date) => {
  try {
    const param = {
      startDate: date.start,
      endDate: date.end
    }
    const res = await api.get('appointment', {
      params: param
    })
    if (res) {
      commit('setEvents', res)
    }
  } catch (error) {
    console.error(error);
  }
}

export const addAppointment = async ({ }, data) => {
  try {
    const res = await api.post('/appointment', data)
    return res;
  } catch (error) {
    console.error(error);
  }
}
