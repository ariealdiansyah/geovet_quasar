export const LocalPrint = async (base64String, onDone) => {
  const { default: printJS } = await import('print-js');
  printJS({
    printable: base64String,
    type: 'pdf',
    base64: true,
    showModal: true,
    modalMessage: 'Dalam Proses'
  });

  // https://github.com/crabbly/Print.js/blob/5ac5a649301331ccb6f3311f5b6054d4f7f396f9/src/js/functions.js#L83
  const handler = () => {
    // Make sure the event only happens once.
    window.removeEventListener('mousemove', handler);

    if (onDone) {
      onDone();
    }

    // Remove iframe from the DOM
    const iframe = document.getElementById('printJS');

    if (iframe) {
      iframe.remove();
    }
  };

  // arbitrary 1.5s untuk menunggu print dialog
  setTimeout(() => { window.addEventListener('mousemove', handler); }, 1500);
};
