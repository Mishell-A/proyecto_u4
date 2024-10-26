import {
  createTask,
  onGetTask,
  deleteTask,
  updateTask,
  getTask,
  toggleLike,
  addComment,
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

  const generateCommentsHtml = (comments) => {
    let commentsHtml = "";
    if (comments && comments.length > 0) {
      comments.forEach((comment) => {
        commentsHtml += `
          <div class="comment">
            <img src="${comment.userImage}" alt="${comment.userName}" class="foto-perfil" />
            <p><strong>${comment.userName}</strong><span>${comment.timestamp}: </span> ${comment.comment}</</p>
          
          </div>
        `;
      });
    }
    return commentsHtml;
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
      const hasLiked = data.likes && data.likes.includes(user.email);
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
            <h5>
             ${data.description}
            </h5>
          </div>
      <div class="interaction-buttons d-flex justify-content-start align-items-center">
  <button class="btn-like d-flex align-items-center me-3 ${
    hasLiked ? "liked" : ""
  }" data-id="${doc.id}"
  ">
    <i class="bi bi-hand-thumbs-up"></i>
    <h4 class= mb-0 ms-1">likes</h4>
    <span class="like-counter ms-2">${
      data.likes ? data.likes.length : 0
    }</ span>
  </button>
  <button class="btn-comment d-flex align-items-center" data-id="${doc.id}">
    <i class="bi bi-chat-dots-fill"></i>
    <h4 class="mb-0 ms-1">Comentar</h4>
  </button>
</div>


      <!-- Sección de Comentarios -->
<div class="comments-section" style="display: none;">
   
  <input type="text" class="comment-input" placeholder="Escribe un comentario" data-id="${
    doc.id
  }">
  <button class="btn-submit-comment" data-id="${doc.id}">Enviar</button>
  <div class="comments-list">
 ${generateCommentsHtml(data.comments)}</div> 
</div>
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

    const btnsLike = document.querySelectorAll(".btn-like");
    btnsLike.forEach((btn) => {
      btn.addEventListener("click", async ({ target }) => {
        const taskId = target.closest("button").dataset.id;
        await toggleLike(taskId, user.email);

        // Alternar la clase 'liked' para cambiar el color del icono
        target.classList.toggle("liked");
      });
    });

    const btnsComment = document.querySelectorAll(".btn-comment");
    btnsComment.forEach((btn) => {
      btn.addEventListener("click", ({ target }) => {
        const commentsSection = target
          .closest("article")
          .querySelector(".comments-section");
        commentsSection.style.display =
          commentsSection.style.display === "none" ? "block" : "none"; // Alternar la visibilidad
      });
    });

    // Manejo de eventos para el botón de enviar comentario
    const btnsSubmitComment = document.querySelectorAll(".btn-submit-comment");
    btnsSubmitComment.forEach((btn) => {
      btn.addEventListener("click", async ({ target }) => {
        const taskId = target.dataset.id;
        const commentInput = target.previousElementSibling; // Obtener el input
        const comment = commentInput.value;

        if (comment.trim()) {
          await addComment(
            taskId,
            comment,
            user.displayName,
            user.photoURL || "./assets/img/defaultProfile.png",
            user.email
          );
          commentInput.value = ""; // Limpiar el input
        }
      });
    });
  });
};
