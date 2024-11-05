import { Loading, Notify } from "quasar";

export const hideLoading = () => {
  if (Loading.isActive) {
    Loading.hide();
  }
};

export const showNotification = ({ message, color = "blue", icon }) => {
  hideLoading();
  Notify.create({
    message,
    color,
    icon,
    position: "top",
    progress: true,
    html: true,
    actions: [{ icon: "close", color: "white", handler: () => { } }],
  });
};

export const currencyFormatter = (val) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
}

export const commaAmount2 = (value, withoutCommaSeparator = false) => {
  const a = value.toString();
  let b = a.split('.')[0];

  b = b === '' ? '0' : b.replace(/[,.]/g, '').toString();
  if (!withoutCommaSeparator) {
    b = b.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  return `${b}`;
}
