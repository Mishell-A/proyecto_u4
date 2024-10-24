import { signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { auth } from "./firebase.js";
import { showMessage } from "./toastMessage.js";

const signOutButton = document.querySelector("#Logout");

signOutButton.addEventListener("click", async () => {
  try {
    await signOut(auth);
    showMessage("Sesión cerrada", "success");
    // Guardar el usuario en el localstorage
    localStorage.removeItem("user");
    //Redireccionar al home
    window.location.href = "./index.html";
  } catch (error) {
    console.error("Error:", error.message);
  }
});
