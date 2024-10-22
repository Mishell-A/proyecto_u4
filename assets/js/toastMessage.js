export const showMessage = (mensaje, type) => {
  Toastify({
    text: mensaje,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background:
        //condicional dentro de un objeto
        type === "error"
          ? "radial-gradient(circle, rgba(191,112,147,1) 0%, rgba(208,43,61,1) 100%)"
          : "radial-gradient(circle, rgba(67,209,37,1) 0%, rgba(198,221,107,1) 100%)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};