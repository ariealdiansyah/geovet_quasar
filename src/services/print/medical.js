import { iconVet } from '../logo';
import { LocalPrint } from '../utils';

export default async ({
  data,
  onDone,
  isDownload
}) => {
  const { default: JSPDF } = await import('jspdf');
  await import('jspdf-autotable');
  const doc = new JSPDF({ orientation: 'p', unit: 'mm', format: 'a4', compress: true, });

  const bodyId = []
  const bodyData = []

  const getTypePet = (val) => {
    switch (val) {
      case "KC":
        return "Kucing";
      case "AY":
        return "Ayam";
      case "EX":
        return "Exotic Pet";
      case "FM":
        return "Hewan Ternak";
    }
  };

  const getSexPet = (val) => {
    switch (val) {
      case "P":
        return "Betina";
      case "L":
        return "Jantan";
    }
  };

  doc.autoTable({
    didDrawPage() {
      doc.addImage(iconVet, 'PNG', 90, 3, 31.17, 20);
    },
  });

  const availableFonts = doc.getFontList();
  console.log('available', availableFonts)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text(data.pet.medicalNumber, 210, 5, 'right')
  doc.setFontSize(14)
  doc.text('Rekam Medis Pasien', 105, 30, 'center')

  // bodyId.push([
  //   {
  //     content: 'Data Pemilik',
  //     colspan: 2,
  //     styles: {
  //       halign: 'center',
  //       border: 0
  //     }
  //   },
  //   {
  //     content: 'Data Hewan',
  //     styles: {
  //       halign: 'center',
  //       border: 0
  //     },
  //     colspan: 2,
  //   }
  // ]);

  bodyId.push([
    {
      content: 'Nama',
      styles: {
        halign: 'left',
        border: 0
      }
    },
    {
      content: data.customer.name,
      styles: {
        halign: 'left',
        border: 0
      }
    },
    {
      content: 'Nama',
      styles: {
        halign: 'left',
        border: 0
      }
    },
    {
      content: data.pet.name,
      styles: {
        halign: 'left',
        border: 0
      }
    }
  ]);

  bodyId.push([
    {
      content: 'Alamat',
      styles: {
        halign: 'left',
        border: 0
      }
    },
    {
      content: data.customer.address,
      styles: {
        halign: 'left',
        border: 0
      }
    },
    {
      content: 'Jenis Hewan',
      styles: {
        halign: 'left',
        border: 0
      }
    },
    {
      content: getTypePet(data.pet.type),
      styles: {
        halign: 'left',
        border: 0
      }
    }
  ]);

  bodyId.push([
    {
      content: 'No. Tlp',
      styles: {
        halign: 'left',
        border: 0
      }
    },
    {
      content: data.customer.phone,
      styles: {
        halign: 'left',
        border: 0
      }
    },
    {
      content: 'Jenis Kelamin',
      styles: {
        halign: 'left',
        border: 0
      }
    },
    {
      content: getSexPet(data.pet.sex),
      styles: {
        halign: 'left',
        border: 0
      }
    }
  ]);

  console.log('body', bodyId)

  doc.autoTable({
    startY: 40,
    head: [
      [
        {
          content: 'Data Pemilik',
          colSpan: 2,
          border: 1,
          styles: { halign: 'center', fillColor: [22, 160, 133], lineWidth: 0.5 },
        },
        {
          content: 'Data Hewan',
          colSpan: 2,
          border: 1,
          styles: { halign: 'center', fillColor: [22, 160, 133], lineWidth: 0.5 },
        },
      ],
    ],
    body: bodyId,
    theme: 'grid',
    styles: { fontSize: 10, border: 0, fontStyle: 'bold' },
  });

  bodyData.push([
    {
      content: 'Anamnesa :',
      styles: {
        halign: 'left',
        border: 0
      }
    },
  ]);

  bodyData.push([
    {
      content: data.anamnesis,
      styles: {
        halign: 'left',
        border: 0
      }
    },
  ])

  bodyData.push([
    {
      content: 'Diagnosa :',
      styles: {
        halign: 'left',
        border: 0
      }
    },
  ]);

  bodyData.push([
    {
      content: data.diagnosis,
      styles: {
        halign: 'left',
        border: 0
      }
    },
  ])

  bodyData.push([
    {
      content: 'Tindakan :',
      styles: {
        halign: 'left',
        border: 0
      }
    },
  ]);

  bodyData.push([
    {
      content: data.action,
      styles: {
        halign: 'left',
        border: 0
      }
    },
  ])

  bodyData.push([
    {
      content: 'Obat :',
      styles: {
        halign: 'left',
        border: 0
      }
    },
  ]);

  bodyData.push([
    {
      content: data.medicalPrescription,
      styles: {
        halign: 'left',
        border: 0
      }
    },
  ])

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [],
    body: bodyData,
    theme: 'grid',
    styles: { fontSize: 10, border: 0, fontStyle: 'normal' },
    didParseCell: function (data) {
      if (data.row.index % 2 === 0) {
        data.cell.styles.fillColor = [40, 170, 100]
      }
    },
  })

  // Output the document
  if (isDownload) {
    return doc.output('save', `rekam_medis_${data.pet.name}.pdf`);
  }

  const base64String = doc.output('datauristring').split('data:application/pdf;filename=generated.pdf;base64,')[1];
  await LocalPrint(base64String, onDone);
}
