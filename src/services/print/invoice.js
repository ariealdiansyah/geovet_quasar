import { isMobile } from '../validation';
import { iconBRI } from '../logo';
import { LocalPrint } from '../utils';
// import PlusSansJakarta from "../../assets/fonts/PSJ/PlusJakartaSans-VariableFont_wght.ttf";

// #region- Baru
export default async ({
  data,
  onDone,
  isDownload
}) => {
  console.log('masuk service print', isDownload);
  const { default: JSPDF } = await import('jspdf');
  await import('jspdf-autotable');
  console.log('on service print', data);
  const doc = new JSPDF({
    orientation: 'p',
    unit: 'mm',
    format: [50, 3276], // Set custom paper size here for 58mm x 210mm
    compress: true,
  });

  const body = []

  // Add text at the top

  const title = "Geo Pet Care";

  const address = 'Jl. Raya Terisi, samping Indomaret'
  const address2 = 'Ds Rajasinga, Kec. Trisi'
  // const address3 = 'Indramayu, Jawa barat'

  const availableFonts = doc.getFontList();
  console.log('available', availableFonts)
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
    doc.text(`${item.totalPrice}`, 45, lastY, 'right');
    lastY = lastY + 3
  })
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7)
  doc.text('Total Pesanan', 2, lastY + 1, 'left');
  doc.text(`${data.totalPrice}`, 45, lastY + 1, 'right');
  doc.text('Diskon', 2, lastY + 4, 'left');
  doc.text(`${data.discount}`, 45, lastY + 4, 'right');
  doc.text('Total', 2, lastY + 7, 'left');
  doc.text(`${new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(data.totalAmount || 0)}`, 45.5, lastY + 7, 'right');
  doc.text('Bayar', 2, lastY + 10, 'left');
  doc.text(`${data.pay}`, 45, lastY + 10, 'right');
  doc.text('Kembali', 2, lastY + 13, 'left');
  doc.text(`${data.change}`, 45, lastY + 13, 'right');

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


// #region - Lama
// export default async ({
//   data,
//   onDone,
//   isDownload
// }) => {
//   console.log('masuk service print', isDownload)
//   const { default: JSPDF } = await import('jspdf');
//   await import('jspdf-autotable');
//   const doc = new JSPDF({
//     orientation: 'p',
//     unit: 'mm',
//     // format: [58, 210]
//     // format: 'b5'
//   });
//   const body = [];
//   const fontSizeTitle = 10;

//   // const drawCell = function (data) {
//   //   const doc = data.doc;
//   //   const rows = data.row;
//   //   if (data.column.index === data.table.columns.length - 1) {
//   //     data.cell.styles.halign = 'left';
//   //   }
//   //   if (rows.raw.length === 2) {
//   //     doc.setFillColor(255, 243, 224);
//   //     doc.setFontStyle('bold');
//   //   }
//   //   if (rows.raw[1] == 'D') {
//   //     doc.setFillColor(255, 226, 226);
//   //   }
//   //   if (rows.raw[1] == 'K') {
//   //     doc.setFillColor(228, 242, 253);
//   //   }
//   // };

//   const availableFonts = doc.getFontList();
//   console.log('available', availableFonts)
//   doc.autoTable({
//     didDrawPage(data) {
//       doc.setFontSize(fontSizeTitle);
//       const pageWidth = doc.internal.pageSize.getWidth();
//       const maxWidth = 58; // max width in mm
//       const title = "Geo Pet Care";
//       let textWidth = doc.getTextWidth(title);
//       if (textWidth > maxWidth) {
//         const scale = maxWidth / textWidth;
//         doc.setFontSize(fontSizeTitle * scale); // scale font size down to fit max width
//         textWidth = maxWidth; // new text width is max width
//       }

//       const x = (pageWidth - textWidth) / 2;
//       console.log('x', x)
//       doc.text(title, 5, 2); // 20 is the y-coordinate
//       // doc.text('Jalan Raya Sumur Watu No.42', 63, 14);
//       // doc.text('Desa Rajasinga', 75, 18);
//       // doc.text('Kec. Trisi, Indramayu', 71, 22);
//       // doc.addImage(iconBRI, 'PNG', 25, 10, 90, 30);
//     },
//     // margin: { top: 30 }
//     margin: { left: 2, right: 2 },
//     tableWidth: 'wrap',
//     // styles: { fontSize: 8, border: '1px solid black' },
//   });

//   // doc.autoTable({
//   //   // head: [
//   //   //   getHeader(),
//   //   //   [...headersPaper, ...headersCoin]
//   //   // ],
//   //   body,
//   //   theme: 'grid',
//   //   bodyStyles: {
//   //     lineColor: [0, 0, 0],
//   //     halign: 'right'
//   //   },
//   //   headStyles: {
//   //     fillColor: 255,
//   //     textColor: 0,
//   //     lineWidth: 0.12,
//   //     lineColor: [0, 0, 0],
//   //     halign: 'right'
//   //   },
//   //   columnStyles: {
//   //     0: { halign: 'center' },
//   //     1: { halign: 'center' }
//   //   },
//   //   styles: { fontSize: 6.3, border: 0.12 },
//   //   margin: {
//   //     top: 40, bottom: 10, left: 10, right: 10
//   //   },
//   //   willDrawCell: drawCell
//   // });

//   // const pageNumber = doc.internal.getNumberOfPages();
//   // const isMobileDevice = isMobile();
//   const base64String = doc
//     .output('datauristring')
//     .split('data:application/pdf;filename=generated.pdf;base64,')[1];

//   // if (isMobileDevice) {
//   //   onDone && onDone(base64String, isMobileDevice, pageNumber);
//   // } else {
//   if (isDownload) {
//     return doc.output('save', `test_print.pdf`);
//   }
//   await LocalPrint(base64String, onDone);
//   // }
// };
