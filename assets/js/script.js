const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");
const pageContentEl = document.querySelector("#page-content");
let taskIdCounter = 0;

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
      type: taskTypeInput
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

const completeEditTask = function(taskName, taskType, taskId){
  const taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);

  taskSelected.querySelector(`h3.task-name`).textContent = taskName;
  taskSelected.querySelector(`span.task-type`).textContent = taskType;

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
};


formEl.addEventListener("submit", taskFormHandler ); 
pageContentEl.addEventListener("click", taskButtonHandler);