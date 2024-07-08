const buttonEl = document.querySelector("#save-task");
const taskToDoEl = document.querySelector("#task-to-do")

const createTaskHandler = function(){
  alert("This was started");
  const taskItemEl = document.createElement("li");  
  taskItemEl.className = "task-item";
  taskItemEl.textContent="hello";
  taskToDoEl.appendChild(taskItemEl);
}

buttonEl.addEventListener("click", createTaskHandler); 