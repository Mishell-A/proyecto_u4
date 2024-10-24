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
export const setupTasks = () => {
  console.log("Hola");

  //CREATE
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = taskForm["title"].value;
    const description = taskForm["description"].value;

    // Crear la tarea
    try {
      await createTask(title, description);
      taskForm.reset();
    } catch (error) {
      // showMessage(error.code, "error");
      console.log(error.code);
    }
  });
  //READ
  onGetTask((querySnapshot) => {
    let tasksHtml = "";
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      tasksHtml += `
            <article class="my-4" id ="tasks-container">
        <div class = "card publicaciones" >
          <div class = "card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <img
                  src="https://via.placeholder.com/50"
                  class="foto-perfil"
                  alt="Foto de perfil"
                />
                <div>
                  <h5 class="titulo-card mb-0">Nombre de Usuario</h5>
                  <p class="fecha-publicacion">
                    Publicado el 11 de octubre de 2024
                  </p>
                </div>
              </div>
              <div class="dropdown">
                <button class="boton-opciones" type="button" id="opcionesMenu">
                  <i class="bi bi-three-dots"></i>
                </button>
                <ul class="opciones-menu">
                  <li><button class="opcion btn-editar" data-id="${doc.id}">Editar</button></li>
                  <li><button class="opcion eliminar  btn-eliminar" data-id="${doc.id}">Eliminar</button></li>
                </ul>
              </div>
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

    // DELETE
    const btnsEliminar = document.querySelectorAll(".btn-eliminar");
    console.log(btnsEliminar);
    btnsEliminar.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteTask(dataset.id);
        console.log("tarea eliminada", "success");
      });
    });
  });
};

setupTasks();
