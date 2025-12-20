// Khởi tạo tasks từ localStorage hoặc mặc định
function loadTasks() {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
        try {
            return JSON.parse(savedTasks);
        } catch (e) {
            console.error('Error loading tasks from localStorage:', e);
            return getDefaultTasks();
        }
    }
    return getDefaultTasks();
}

function getDefaultTasks() {
    return [
        { text: "Make dinner", done: false },
        { text: "Do home work", done: false },
        { text: "From the bottom of my ❤️", done: false }
    ];
}

function saveTasks() {
    try {
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
    } catch (e) {
        console.error('Error saving tasks to localStorage:', e);
    }
}

const tasks = loadTasks();
const taskListElement = document.querySelector("#task-list");

function renderTasks() {
    let htmlStr = tasks
        .map((task, index) => {
            return `
            <li data-index="${index}">
                <input type="checkbox" class="task-checkbox" ${task.done ? 'checked' : ''}>
                <span class="task-text ${task.done ? 'done' : ''}">${task.text}</span>
                <button class="edit-btn">edit</button>
                <button class="remove-btn">Remove</button>
            </li>
            `
        })
        .join("\n");

    taskListElement.innerHTML = htmlStr;
    saveTasks(); // Lưu vào localStorage sau mỗi lần render
}

function editTask(index) {
    const li = taskListElement.children[index];
    const currentText = tasks[index].text;

    // Thêm class editing để style trên mobile
    li.classList.add('editing');

    // Tạo input để chỉnh sửa
    li.innerHTML = `
        <input type="text" value="${currentText}" class="edit-input">
        <div class="edit-buttons">
            <button class="save-btn">Save</button>
            <button class="cancel-btn">Cancel</button>
        </div>
    `;

    const input = li.querySelector('.edit-input');
    const saveBtn = li.querySelector('.save-btn');
    const cancelBtn = li.querySelector('.cancel-btn');

    input.focus();

    saveBtn.addEventListener('click', () => {
        tasks[index].text = input.value.trim();
        renderTasks();
    });

    cancelBtn.addEventListener('click', () => {
        renderTasks();
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            tasks[index].text = input.value.trim();
            renderTasks();
        }
    });
}

function addTask() {
    const text = newTaskInput.value.trim();
    if (text) {
        tasks.push({ text, done: false });
        newTaskInput.value = '';
        renderTasks();
    }
}

const addBtn = document.querySelector('#add-btn');
const newTaskInput = document.querySelector('#new-task-input');

addBtn.addEventListener('click', addTask);
newTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Event delegation cho edit và remove buttons
taskListElement.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    const index = parseInt(li.dataset.index);

    if (e.target.classList.contains('edit-btn')) {
        editTask(index);
    } else if (e.target.classList.contains('remove-btn')) {
        tasks.splice(index, 1);
        renderTasks();
    }
});

// Event delegation for checkbox
taskListElement.addEventListener('change', (e) => {
    if (e.target.classList.contains('task-checkbox')) {
        const li = e.target.closest('li');
        const index = parseInt(li.dataset.index);
        tasks[index].done = e.target.checked;
        renderTasks();
    }
});
renderTasks();
