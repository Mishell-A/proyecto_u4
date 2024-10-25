import {
  createTask,
  onGetTask,
  deleteTask,
  updateTask,
  getTask,
} from "./firebase.js";

const taskForm = document.querySelector("#task-form");
const tasksContainer = document.querySelector("#tasks-container");

let editStatus = false;
let editId = "";
export const setupTasks = (user) => {
  console.log("Hola");
  console.log("Usuario:", user);
  //CREATE
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = taskForm["title"].value;
    const description = taskForm["description"].value;

    try {
      if (!editStatus) {
        await createTask(
          title,
          description,
          user.displayName,
          user.photoURL || "./assets/img/defaultProfile.png",
          user.email
        );
        //showMessage("tarea creada", "success");
      } else {
        await updateTask(editId, { title, description });
        //showMessage("tarea actualizada", "success");

        editStatus = false;
        editId = "";

        document.getElementById("form-publicacion").innerHTML =
          "Agregar publicación";
        taskForm["btn-agregar"].innerHTML = "Publicar";
      }
      taskForm.reset();
    } catch (error) {
      //showMessage(error.code, "error");
      console.log(error);
    }
  });

  // Referencias al elemento de imagen de perfil
  const avatar = document.getElementById("avatar");

  // Cargar imagen guardada o predeterminada al cargar la página
  window.onload = async function () {
    if (user.photoURL) {
      avatar.src = user.photoURL; // Cargar la imagen guardada en Firebase
    } else {
      avatar.src = "./assets/img/defaultProfile.png"; // Usar la imagen predeterminada
    }
  };

  //READ
  onGetTask((querySnapshot) => {
    let tasksHtml = "";
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      let formattedCreationTime = "";
      if (data.userFecha) {
        formattedCreationTime = data.userFecha;
      }
      tasksHtml += `
            <article class="my-4" id ="tasks-container">
        <div class = "card publicaciones" >
          <div class = "card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <img
                  src="${data.userImage}"
                      
                  class="foto-perfil"
                  alt="${data.userName}"
                />
                <div>
                  <h5 class="titulo-card mb-0">${data.userName}</h5>
                  <p class="fecha-publicacion">
                    Publicado el :  ${data.userFecha}
                  </p>
                </div>
              </div>
                ${
                  user.email === data.userEmail
                    ? `
              <div class="dropdown">
                <button class="boton-opciones" type="button" id="opcionesMenu">
                  <i class="bi bi-three-dots"></i>
                </button>
                <ul class="opciones-menu">
                  <li><button class="opcion btn-editar" data-id="${doc.id}">Editar</button></li>
                  <li><button class="opcion eliminar  btn-eliminar" data-id="${doc.id}">Eliminar</button></li>
                </ul>
               </div>`
                    : `<div></div>`
                }
            </div>
            <h4 class="contenido-publicacion">
             ${data.title}
            </h4>
            <hr />
            <p>
             ${data.description}
            </p>
          </div>
        </div>
      </article>
      `;
    });
    tasksContainer.innerHTML = tasksHtml;

    //UPDATE
    const btnsEditar = document.querySelectorAll(".btn-editar");
    btnsEditar.forEach((btn) => {
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        const doc = await getTask(dataset.id);

        const task = doc.data();

        // llenamos los datos del formulario
        taskForm["title"].value = task.title;
        taskForm["description"].value = task.description;

        editStatus = true;
        editId = doc.id;

        document.getElementById("form-publicacion").innerHTML =
          "Editar Publicación";
        taskForm["btn-agregar"].innerHTML = "Guardar Cambios";
      });
    });

    // DELETE
    const btnsEliminar = document.querySelectorAll(".btn-eliminar");

    btnsEliminar.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteTask(dataset.id);
        console.log("tarea eliminada", "success");
      });
    });
  });
};
