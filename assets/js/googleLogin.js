import {
    signInWithPopup,
    GoogleAuthProvider,
  } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
  
  import { auth } from "./firebase.js";
  import { showMessage } from "./toastMessage.js";
  
  const googleButton = document.querySelector("#google-btn");
  
  googleButton.addEventListener("click", async () => {
    event.preventDefault()
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: "select_account",
    });
  
    try {
      const credentials = await signInWithPopup(auth, provider);
  

      showMessage("Sesión iniciada", "success");
    } catch (error) {
      console.log(error);
    }
  });