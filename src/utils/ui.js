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
