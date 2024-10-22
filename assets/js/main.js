document.getElementById("checkAll").addEventListener("click", function () {
  const allTodos = document.querySelectorAll("#todosList li span");
  allTodos.forEach((todo) => {
    todo.style.textDecoration = "line-through";
  });
});

function addTodo() {
  const todoInput = document.getElementById("todoInput");
  const todoList = document.getElementById("todoList");
  if (todoInput.value.trim() === "") {
    alert("Veuillez entrer une tâche!");
    return;
  }

  const todoText = todoInput.value;
  if (todoText) {
    //FIXME : Elever les espace de la valeur du champs
    const todoEl = document.createElement("li");

    const todoTextEl = document.createElement("span");
    todoTextEl.innerText = todoText;
    todoTextEl.onclick = function () {
      toggleCompleted(todoTextEl);
    };
    todoEl.appendChild(todoTextEl); // NOTE: à ne pas supprimer

    const editBtn = document.createElement("button");
    editBtn.classList = "edit";
    editBtn.innerText = "Modifier";
    editBtn.onclick = function () {
      editTodo(todoEl);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Supprimer";
    deleteBtn.onclick = function () {
      deleteTodo(todoList, todoEl);
    };
    todoEl.appendChild(deleteBtn);
    todoEl.appendChild(editBtn);
    todoList.appendChild(todoEl);
    todoInput.value = "";
  }
}

function editTodo(todoEl) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = todoEl.innerText;

  todoEl.innerHTML = "";
  todoEl.appendChild(input);
  input.focus();

  input.onblur = finishEditing;
  input.onkeydown = function (e) {
    if (e.key === "Enter") {
      finishEditing.call(input);
    }
  };
  function finishEditing() {
    const newText = this.value;
    todoEl.innerHTML = newText;
    // Ajouter à nouveau le bouton de modification
    const editBtn = document.createElement("button");
    editBtn.innerText = "Modifier";
    editBtn.classList = "edit";
    editBtn.onclick = function () {
      editTodo(todoEl);
    };
    todoEl.appendChild(editBtn);
  }
}

function deleteTodo(todoList, todoEl) {
  todoList.removeChild(todoEl);
}

function toggleCompleted(todoTextEl) {
  if (todoTextEl.style.textDecoration === "line-through") {
    todoTextEl.style.textDecoration = "none";
  } else {
    todoTextEl.style.textDecoration = "line-through";
  }
}
