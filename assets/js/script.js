// select main element in html object with id page-content
var pageContentEl = document.querySelector("#page-content");

// select form in html object with id task-form
var formEl = document.querySelector("#task-form");

// select ul in html object with id tasks-to-do
var tasksToDoEl = document.querySelector("#tasks-to-do");

// used to create unique ID for each task
var taskIdCounter = 0;

// function to add task items
var taskFormHandler = function(event) {
    // prevent browser's default of refreshing page after event
    event.preventDefault();

    // select info provided in the task name input
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // select info provided in the task type drop down
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    };

    // reset the form (AKA make the form blank again)
    formEl.reset();

    // package data as object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
    // create a new list item with class "task-item"
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as custom data attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item with class "task-info"
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    // add HTML content to div including task name and type
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    // append div into li
    listItemEl.appendChild(taskInfoEl);

    // append createTaskActions (the buttons) via the unique id assigner to each task item
    var taskActionEl = createTaskActions(taskIdCounter);
    // append taskActionsEl(buttons assigned to unique ids) to listItemEl(its corresponding li)
    listItemEl.appendChild(taskActionEl);

    // append li to the end of the ul tasksToDoEl
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;
};

var createTaskActions = function(taskId) {
    // create div to hold buttons with class "task-actions"
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button with textContent, className, and Attribute
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    // append button to actionContainerEl div
    actionContainerEl.appendChild(editButtonEl);

    // create delete button with textContent, className, and Attribute
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    // append button to actionContainerEl div
    actionContainerEl.appendChild(deleteButtonEl);

    // create status drop down selector
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    // array for status options
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to statusSelectEl
        statusSelectEl.appendChild(statusOptionEl);
    };

    // append drop down selector to actionContainerEl div
    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
}

// listen for "submit" event and execute taskFormHandler variable if event occurs
formEl.addEventListener("submit", taskFormHandler);

// function to identify where a "click" event is occuring and isolate the html element by id
var taskButtonHandler = function(event) {
    console.log(event.target);

    if (event.target.matches(".delete-btn")) {
        // get element's task id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    };
};

// delete task function
var deleteTask = function(taskId) {
    // further narrows selection of click to element with "task-item" class AND(no space) a "data-task-id" data id attribute with a value equal to the one provided by the argument that was passed
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

// listens for clicks in main element of html object and calls taskButtonHandler function
pageContentEl.addEventListener("click", taskButtonHandler);