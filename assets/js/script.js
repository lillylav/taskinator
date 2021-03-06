// select main element in html object with id page-content
var pageContentEl = document.querySelector("#page-content");

// select form in html object with id task-form
var formEl = document.querySelector("#task-form");

// select ul in html object with id tasks-to-do
var tasksToDoEl = document.querySelector("#tasks-to-do");

// select "tasks-in-progress" column
var tasksInProgressEl = document.querySelector("#tasks-in-progress");

// select "completed" column
var tasksCompletedEl = document.querySelector("#tasks-completed");

// tasks array
var tasks = [];

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

    // identifies if form submission is an original or edit submission
    var isEdit = formEl.hasAttribute("data-task-id");

    // package data as object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // if it has the attribute(edit is true)
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    //if it doesn't have the attribute(edit is false, original is true)
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        createTaskEl(taskDataObj);
    }
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

    // push data id to taskDataObj
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    // update local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

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
    // get target element from event
    var targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    // delete button was clicked
    if (targetEl.matches(".delete-btn")) {
        // get element's task id
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

// open edit task function
var editTask = function(taskId) {
    // select task list element item (further narrows selection of click to element with "task-item" class AND(no space) a "data-task-id" data id attribute with a value equal to the one provided by the argument that was passed)
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    // update the form
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    // change submit button content to say "save task" rather than "add task"
    document.querySelector("#save-task").textContent = "Save Task";

    // give the form a "data-task-id" attribute
    formEl.setAttribute("data-task-id", taskId);
};

// submit edit task function
var completeEditTask = function(taskName, taskType, taskId) {
    // find matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for(var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    alert("Task updated!");

    // update local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // reset from and button content
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

// delete task function
var deleteTask = function(taskId) {
    // select task list element item (further narrows selection of click to element with "task-item" class AND(no space) a "data-task-id" data id attribute with a value equal to the one provided by the argument that was passed)
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        // if tasks [i]id doesn't match value of taskId, let's keep that task and push it to the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;

    // update local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

var taskStatusChangeHandler = function(event) {
    // get the task item's data-task-id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // move columns
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    // update tasks in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }

    // update local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// save to local storage
var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// retrieve tasks upon loading page
var loadTasks = function() {
    // gets task items from localStorage
    var savedTasks = localStorage.getItem("tasks");

    // if nothing in local storage then initialize empty array
    if (!savedTasks) {
        return false;
    }

    // update contents of localStorage tasks from string back to array data
    savedTasks = JSON.parse(savedTasks);

    for (var i = 0; i < savedTasks.length; i++) {
        // pass each task object into the "createTaskEl" function
        createTaskEl(savedTasks[i]);
    }
};

// listens for clicks in main element of html object and calls taskButtonHandler function
pageContentEl.addEventListener("click", taskButtonHandler);

// listens for changes in task type
pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();