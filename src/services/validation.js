import { Platform } from 'quasar';

export const isMobile = () => Platform.is.mobile
  || !Platform.is.desktop
  || Platform.is.android
  || Platform.is.iphone
  || Platform.is.ipad
  || Platform.is.ios;
