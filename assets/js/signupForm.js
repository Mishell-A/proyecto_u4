const signupForm = document.querySelector(".signup-form");

console.log(signupForm);

//Cuando se envie el formulario
signupForm.addEventListener("submit", (e) => {
  //Para que no se recargue la pagina
  e.preventDefault();
  console.log("Formulario enviado");

  //Obtener los valores del formulario como objeto
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  console.log(email);
  console.log(password);
});
