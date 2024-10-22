import { app } from "./firebase.js";
import "./signupForm.js";
//Mostrar el objeto que se importó
console.log(app);

document
  .getElementById("register-button")
  .addEventListener("click", function () {
    const form = document.getElementById("signin-form");
    form.innerHTML = `
    <form class="signup-form">
        <div class="mb-2 px-4">
            <label for="signup-name" class="form-label">Nombre completo</label>
            <input
              type="text"
              class="form-control"
              id="signup-name"
              placeholder="Ingresa tu nombre completo"
            />
          </div>
          <div class="mb-2 px-4">
            <label for="signup-email" class="form-label">Correo</label>
            <input
              type="email"
              class="form-control"
              id="signup-email"
              placeholder="correo@ejemplo.com"
            />
          </div>
          <div class="mb-2 px-4">
            <label for="signup-password" class="form-label">Contraseña</label>
            <input
              type="password"
              class="form-control"
              id="signup-password"
              placeholder="Debe tener más de 6 caracteres"
            />
          </div>
          <div class="d-flex justify-content-center mt-4 mb-4">
            <button type="submit" class="btn-custom rounded-5 p-2">
              Registrarse
            </button>
          </div>
          <div class="d-flex justify-content-center gap-2 mt-3 pb-4">
              <p>¿Ya tienes una cuenta?</p>
              <a href="./index.html">Inicia Sesión</a>
          </div>
    </form>`;
  });
