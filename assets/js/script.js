// select form in html object with id task-form
var formEl = document.querySelector("#task-form");
// select ul with id tasks-to-do
var tasksToDoEl = document.querySelector("#tasks-to-do");

// function to add task items
var createTaskHandler = function(event) {
    // prevent browser's default of refreshing page after event
    event.preventDefault();

    // select info provided in the task name input
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // select info provided in the task type drop down
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // create a new list item with class "task-item"
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item with class "task-info"
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    // add HTML content to div including task name and type
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    // append div into li
    listItemEl.appendChild(taskInfoEl);

    // append li to the end of the ul tasksToDoEl
    tasksToDoEl.appendChild(listItemEl);
};

// listen for "submit" event and execute createTaskHandler variable if event occurs
formEl.addEventListener("submit", createTaskHandler);