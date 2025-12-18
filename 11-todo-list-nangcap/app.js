const inputEl = document.querySelector(".task-input");
const addBtn = document.querySelector("#add-btn");
const listEl = document.querySelector(".task-list");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    listEl.innerHTML = tasks.map((task, index) => `
        <li class="${task.done ? "done" : ""}" data-index="${index}">
            <input type="checkbox" data-index="${index}" ${task.done ? "checked" : ""} />
            <span class="task-text" data-index="${index}">${task.text}</span>
            <button class="btn-edit" data-action="edit" data-index="${index}">✏️</button>
            <button class="btn-delete" data-action="delete" data-index="${index}">❌</button>
        </li>
    `).join("");
}

function addTask() {
    const text = inputEl.value.trim();
    if (!text) return;
    
    tasks.push({ text, done: false });
    saveTasks();
    renderTasks();
    inputEl.value = "";
}

renderTasks();

addBtn.addEventListener("click", addTask);
inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});

listEl.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (index === undefined) return;
    
    if (e.target.type === "checkbox") {
        tasks[index].done = e.target.checked;
        saveTasks();
        renderTasks();
    }
    
    if (e.target.dataset.action === "delete") {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
    
    if (e.target.dataset.action === "edit") {
        const li = e.target.closest("li");
        const span = li.querySelector(".task-text");
        const input = document.createElement("input");
        input.type = "text";
        input.value = tasks[index].text;
        input.className = "task-edit-input";
        
        span.replaceWith(input);
        input.focus();
        input.select();
        
        const saveEdit = () => {
            tasks[index].text = input.value.trim() || tasks[index].text;
            saveTasks();
            renderTasks();
        };
        
        const cancelEdit = () => {
            renderTasks();
        };
        
        input.addEventListener("blur", saveEdit);
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                saveEdit();
            }
            if (e.key === "Escape") {
                e.preventDefault();
                cancelEdit();
            }
        });
    }
});
