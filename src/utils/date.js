import { date } from "quasar";

export const getISOString = (date) => {
  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const [datePart, timePart] = date.split(" ");
  const [day, month, year] = datePart.split("-");
  const [hours, minutes] = timePart.split(":");

  const formattedDate = `${year}-${months[month]}-${day}T${hours}:${minutes}`;
  return new Date(formattedDate).toISOString();
}

export const getTextDate = (dates) => {
  return date.formatDate(new Date(dates), "DD-MMM-YYYY HH:mm")
}

export const textDateWithtoutTime = (dates) => {
  return date.formatDate(new Date(dates), "DD MMM YYYY")
}

export const dateToday = (dates) => {
  return date.formatDate(new Date(dates), "YYYY/MM/DD")
}
