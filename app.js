const setTheme = (theme) => (document.documentElement.className = theme);

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const completedCount = document.querySelector(".completedCount");
const remarks = document.querySelector(".todo-footer");
// const header = document.getElementsByTagName('header')[0]

// functionality
let todos = [];

// Load previously saved todos from local storage
if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
  renderTodos();
}

// remove the default reload
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const todo = input.value.trim();
  if (todo) {
    todos.push({ id: todos.length + 1, text: todo, done: false });
    input.value = "";
    renderTodos();
    saveTodos();
  }
});

// to-do list rendering
function renderTodos() {
  // clear the todo list
  list.innerHTML = "";
  // render each to-do items
  todos.forEach((todo) => {


    //   create checkbox

    const done = document.createElement("input");
    done.setAttribute('type', 'checkbox');
    // done.style.width = "20px";
    done.addEventListener('change', function() {
      if (this.checked) {
        item.classList.add('completed');
      } else {
        item.classList.remove('completed');
      };
      saveTodos();
    });

    // done.type = "radio";
    // done.checked = todo.done;
    // done.style.width = "20px";
    // done.addEventListener("change", () => {
    //   todo.done = done.checked;
    //   saveTodos();
    // });

    // create list item element
    const item = document.createElement("li");
    item.className = 'list';
    item.draggable = true;

    const text = document.createElement("label");
    text.innerText = todo.text;

    

    //   create edit button
    const buttons = document.createElement("div");
    buttons.style.display = 'flex';
    buttons.style.justifyContent = 'space-between';
    buttons.style.width = '20%';
    const edit = document.createElement("button");
    edit.innerText = "Edit";
    // edit.style.fontSize = "20px";
    edit.addEventListener("click", () => {
      const newTodo = prompt("Edit task:", todo.text);
      if (newTodo) {
        todo.text = newTodo;
        renderTodos();
        saveTodos();
      }
    });

    //  create delete button
    const del = document.createElement("button");
    del.innerText = "X";
    del.addEventListener("click", () => {
      todos = todos.filter((item) => item.id !== todo.id);
      renderTodos();
      saveTodos();
    });
    buttons.appendChild(edit);
    buttons.appendChild(del);
    item.appendChild(done);
    item.appendChild(text);
    item.appendChild(buttons);
    list.appendChild(item);
    // item.appendChild(taskText);
  });
  
  // Get all the draggable items
const lists = document.querySelectorAll('.list');

// Add event listeners for drag events
lists.forEach(list => {
  list.addEventListener('dragstart', dragStart);
  list.addEventListener('dragover', dragOver);
  list.addEventListener('drop', drop);
});

let draggedItem = null;

// Handle the dragstart event
function dragStart(e) {
  draggedItem = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

// Handle the dragover event
function dragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

// Handle the drop event
function drop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  if (draggedItem !== this) {
    draggedItem.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }

  return false;
}

 
}


function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}


