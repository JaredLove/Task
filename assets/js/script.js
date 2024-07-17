const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");
const tasksInProgressEl = document.querySelector("#tasks-in-progress");
const tasksCompletedEl = document.querySelector("#tasks-completed");
const pageContentEl = document.querySelector("#page-content");

let taskIdCounter = 0;
let tasks = [];

const createTaskEl = function(taskDataObj){
  const listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  listItemEl.setAttribute("data-task-id", taskIdCounter);

  const taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = `<h3 class='task-name'> ${taskDataObj.name} </h3>
                          <span class='task-type'> ${taskDataObj.type} </span>`;

  
  listItemEl.appendChild(taskInfoEl);
  let taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  tasksToDoEl.appendChild(listItemEl);
  taskDataObj.id = taskIdCounter;
  tasks.push(taskDataObj);
  saveTasks();
  taskIdCounter++;
}

const createTaskActions = function(taskId){
  const actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  const editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);
  const deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  const statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl);

  const statusChoices = ["To Do", "In Progress", "Completed"];
  for(let i = 0; i < statusChoices.length; i++){
    let statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusSelectEl.appendChild(statusOptionEl);
  }

  


  return actionContainerEl;
}


const taskFormHandler = function(event){
  event.preventDefault();
  const taskNameInput = document.querySelector("input[name='task-name']").value;
  const taskTypeInput = document.querySelector("select[name='task-type']").value;
  if(!taskNameInput || !taskTypeInput){
    alert("You need to fill out the task form!");
    return false;
  }

  formEl.reset();
  const isEdit = formEl.hasAttribute("data-task-id");
  if(isEdit){
    const taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }else {
    const taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do"
    };

 
    createTaskEl(taskDataObj);
  }


  
} 


const taskButtonHandler = function(event){
  const targetEl = event.target;

  if (targetEl.matches(".edit-btn")){
    const taskId = event.target.getAttribute("data-task-id");
    editTask(taskId);
  }

  else if(event.target.matches(".delete-btn")){
    const taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

const taskStatusChangeHandler = function(event){
  const taskId = event.target.getAttribute("data-task-id");
  const statusValue = event.target.value.toLowerCase();
  const taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);

  if(statusValue === "to do"){
    tasksToDoEl.appendChild(taskSelected);
  }else if(statusValue === "in progress"){
    tasksInProgressEl.appendChild(taskSelected);
  }else if (statusValue === "completed"){
    tasksCompletedEl.appendChild(taskSelected);
  }
  
  for (let i = 0; i < tasks.length; i++){
    if(tasks[i].id === parseInt(taskId)){
      tasks[i].status = statusValue;
    }
  }
  saveTasks();
}

const completeEditTask = function(taskName, taskType, taskId){
  const taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);

  taskSelected.querySelector(`h3.task-name`).textContent = taskName;
  taskSelected.querySelector(`span.task-type`).textContent = taskType;

  for (let i = 0; i < tasks.length; i++){
    if(tasks[i].id === parseInt(taskId)){
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }
  saveTasks();
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
}

const editTask = function(taskId){
  const taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
  const taskName = taskSelected.querySelector(`h3.task-name`).textContent;
  const taskType = taskSelected.querySelector(`span.task-type`).textContent;
  document.querySelector(`input[name="task-name"]`).value = taskName;
  document.querySelector(`select[name="task-type"]`).value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskId);
};

const deleteTask = function(taskId){
  const taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
  taskSelected.remove();

  let updatedTaskArr = [];
  for (let i = 0; i < tasks.length; i++){
    if(tasks[i].id !== parseInt(taskId)){
      updatedTaskArr.push(tasks[i]);
    }
  }

  tasks = updatedTaskArr;
  saveTasks();
};

const saveTasks = function(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

formEl.addEventListener("submit", taskFormHandler ); 
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);