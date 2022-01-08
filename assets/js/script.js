// select form in html object with id task-form
var formEl = document.querySelector("#task-form");
// select ul with id tasks-to-do
var tasksToDoEl = document.querySelector("#tasks-to-do");

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

    // create div to hold task info and add to list item with class "task-info"
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    // add HTML content to div including task name and type
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    // append div into li
    listItemEl.appendChild(taskInfoEl);

    // append li to the end of the ul tasksToDoEl
    tasksToDoEl.appendChild(listItemEl);
}

// listen for "submit" event and execute taskFormHandler variable if event occurs
formEl.addEventListener("submit", taskFormHandler);