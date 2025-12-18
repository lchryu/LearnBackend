const tasks = [
    "Make dinner",
    "Wash dishes",
    "Do laundry"
]

const inputTaskElement = document.querySelector(".input-task")
const taskListElement = document.querySelector(".task-list")
const btnAdd = document.querySelector("#btn-add")

let renderTasks = () => {
    taskListElement.innerHTML = "";
    tasks.forEach((task, index) => {
        taskListElement.innerHTML += `
            <li>
                ${task} 
                <button class="btn-delete" data-index="${index}">Delete</button>
            </li>
        `;
    });
    attachDeleteEvent();

}

addTask = () => {
    const newTask = inputTaskElement.value;
    if (!newTask) return;
    tasks.push(newTask);
    inputTaskElement.value = "";
    renderTasks();
}
btnAdd.addEventListener("click", addTask);
inputTaskElement.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// delete task
let attachDeleteEvent = () => {
    const deleteButtons = document.querySelectorAll(".btn-delete");
    deleteButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            tasks.splice(index, 1);
            renderTasks();
        }
        );
    }
    );
}
renderTasks();