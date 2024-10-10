import { dateToday } from "src/utils/date"

export const setEvents = (state, payload) => {
  const event = payload.map((x) => dateToday(x.date))
  state.events = event
  state.detailEvent = payload
}
