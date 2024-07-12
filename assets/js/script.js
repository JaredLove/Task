const formEl = document.querySelector("#task-form");
const taskToDoEl = document.querySelector("#task-to-do")

const createTaskHandler = function(event){
  event.preventDefault();
  const taskItemEl = document.createElement("li");  
  taskItemEl.className = "task-item";
  taskItemEl.textContent="hello";
  taskToDoEl.appendChild(taskItemEl);
}

formEl.addEventListener("submit", createTaskHandler); 