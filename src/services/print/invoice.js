import { isMobile } from '../validation';
import { iconBRI } from '../logo';
import { LocalPrint } from '../utils';
import { commaAmount2 } from 'src/utils/ui';
// import PlusSansJakarta from "../../assets/fonts/PSJ/PlusJakartaSans-VariableFont_wght.ttf";

// #region- Baru
export default async ({
  data,
  onDone,
  isDownload
}) => {
  const { default: JSPDF } = await import('jspdf');
  await import('jspdf-autotable');
  const doc = new JSPDF({
    orientation: 'p',
    unit: 'mm',
    format: [50, 3276], // Set custom paper size here for 58mm x 210mm
    compress: true,
  });

  const body = []

  // Add text at the top

  const title = "Geo Pet Care";

  const address = 'Jalan Raya Terisi, Samping Indomaret'
  const address2 = 'Ds Rajasinga, Kec. Trisi'
  // const address3 = 'Indramayu, Jawa barat'

  // const availableFonts = doc.getFontList();
  // console.log('available', availableFonts)
  data.transactionDetails.forEach((item) => {
    body.push([
      item.groceriesId,
      item.totalPrice
    ]);
  });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(title, 25, 3, 'center');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5);
  doc.text(address, 25, 6, 'center');
  doc.text(address2, 25, 9, 'center');
  // doc.text(address3, 25, 12, 'center');
  doc.setFontSize(8);
  doc.text('Item', 11, 15, 'center');
  doc.text('Harga', 42, 15, 'right');

  let lastY = 19;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  data.transactionDetails.forEach((item) => {
    doc.text(`${item.amount}x - ${item.name}`, 2, lastY, 'left');
    doc.text(`${commaAmount2(item.totalPrice)}`, 44.3, lastY, 'right');
    lastY = lastY + 3
  })
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7)
  doc.text('Total Pesanan', 2, lastY + 1, 'left');
  doc.text(`${new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(data.totalPrice || 0)}`, 45, lastY + 1, 'right');
  doc.text('Diskon', 2, lastY + 4, 'left');
  doc.text(`${new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(data.discount || 0)}`, 45, lastY + 4, 'right');
  doc.text('Total', 2, lastY + 7, 'left');
  doc.text(`${new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(data.totalAmount || 0)}`, 45, lastY + 7, 'right');
  doc.text('Bayar', 2, lastY + 10, 'left');
  doc.text(`${new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(data.pay || 0)}`, 45, lastY + 10, 'right');
  doc.text('Kembali', 2, lastY + 13, 'left');
  doc.text(`${new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(data.change || 0)}`, 45, lastY + 13, 'right');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(4)
  doc.text(`Terima kasih telah memilih`, 25, lastY + 18, 'center');
  doc.text(`Geo Pet Care`, 25, lastY + 21, 'center');

  // Output the document
  if (isDownload) {
    return doc.output('save', `test_print.pdf`);
  }

  const base64String = doc.output('datauristring').split('data:application/pdf;filename=generated.pdf;base64,')[1];
  await LocalPrint(base64String, onDone);
};
