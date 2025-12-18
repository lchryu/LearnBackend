const tasks = [
    "Make dinner",
    "Wash dishes",
    "Do laundry"
];

const taskInputEl = document.querySelector(".task-input");
const taskListEl  = document.querySelector(".task-list");
const addBtnEl    = document.querySelector("#add-btn");

function renderTasks() {
    taskListEl.innerHTML = "";

    for (const task of tasks) {
        taskListEl.insertAdjacentHTML(
            "beforeend",
            `<li>${task}</li>`
        );
    }
}

function addTask() {
    const value = taskInputEl.value.trim();
    if (!value) return;

    tasks.push(value);
    taskInputEl.value = "";
    renderTasks();
}

addBtnEl.addEventListener("click", addTask);

taskInputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

renderTasks();
