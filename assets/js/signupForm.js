import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { showMessage } from "./toastMessage.js";

const signupForm = document.querySelector(".signup-form");

console.log(signupForm);

//Cuando se envie el formulario
//async : asincronó
signupForm.addEventListener("submit", async (e) => {
  //Para que no se recargue la pagina
  e.preventDefault();
  console.log("Formulario enviado");

  //Obtener los valores del formulario como objeto
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;
  // Manejar errores
  try {
    //Crear las credenciasles
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredentials);

    showMessage("Usuario registrado", "success");
  } catch (error) {
    console.error(error);

    //Mensaje de error
    if (error.code === "auth/email-already-in-use") {
      showMessage("Email ya registrado", "error");
    } else if (error.code === "auth/invalid-email") {
      showMessage("Email inválido", "error");
    } else if (error.code === "auth/weak-password") {
      showMessage("Contraseña muy corta", "error");
    } else if (error.code === "auth/missing-password") {
      showMessage("Debes ingresar una contraseña", "error");
    } else if (error.code === "auth/missing-email") {
      showMessage("Debes ingresar un email", "error");
    } else {
      showMessage("Error desconocido", "error");
    }
  }
});
