//Declarations
let btnAdd = document.querySelector("#btn-add");
let txtTask = document.querySelector(".task-name");
let tasksDiv = document.querySelector(".tasks");
let tasks = [];

//Functions
function loadTasks() {
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        addElementsToPage(tasks);
    }
}
function addTask(taskValue) {
    const task = {
        id: Date.now(),
        task: taskValue,
        done: false,
    };
    tasks.push(task);
    addElementsToPage(tasks);
    addToLocalStorage(tasks);
}
function addToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function addElementsToPage(tasks) {
    tasksDiv.innerHTML = "";
    tasks.forEach((element) => {
        let div = document.createElement("div");
        div.append(document.createTextNode(element.task));
        div.style.cursor = "pointer";
        div.className = "task";
        div.setAttribute("data-index", element.id);
        let btnDelete = document.createElement("button");
        btnDelete.innerHTML = "Delete";
        btnDelete.className = "delete-task";
        div.append(btnDelete);
        tasksDiv.append(div);
    });
}
function removeTask(e) {
    if (e.target.parentElement.hasAttribute("data-index")) {
        let btn = e.target;
        let taskId = btn.parentElement.getAttribute("data-index");
        //remove from local storage
        tasks = tasks.filter((item) => item.id.toString() !== taskId);
        window.localStorage.setItem("tasks", JSON.stringify(tasks));
        //remove item from page
        btn.parentElement.remove();
    }
}
function updateTask(e) {
    if (e.target.classList.contains("task")) {
        e.target.classList.toggle("task-done");
        let taskId = e.target.getAttribute("data-index");
        tasks.forEach(function (task) {
            if (task.id.toString() === taskId) {
                task.done ? (task.done = false) : (task.done = true);
            }
        });
        addToLocalStorage(tasks);
    }
}

//Calling
loadTasks();
btnAdd.addEventListener("click", function () {
    if (txtTask.value !== "") {
        addTask(txtTask.value);
        txtTask.value = "";
    }
});
tasksDiv.addEventListener("click", function (e) {
    removeTask(e);
    updateTask(e);
});
