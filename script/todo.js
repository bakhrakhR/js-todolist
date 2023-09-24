
//restore list from local ctorage
function init() {
    const fromStorage = localStorage.getItem('taskList');
    if (fromStorage) {
        document.querySelector('.toDoList').innerHTML = fromStorage;
        const taskElements = document.querySelectorAll('.line');

        taskElements.forEach(taskElement => {
            const deleteTaskIcon = taskElement.querySelector('.del');
            deleteTaskIcon.addEventListener('click', delTask);

            const editTaskIcon = taskElement.querySelector('.edit');
            editTaskIcon.addEventListener('click', () => editTask(taskElement));
        });
    }
}
init()


//save list to local ctorage
const saveListButton = document.getElementById('saveList');
saveListButton.addEventListener('click', saveList);

function saveList() {
    const saveListToStorage = document.getElementById('saveList');

    saveListToStorage.addEventListener('click', () => {
        const ul = document.querySelector('.toDoList').innerHTML;
        localStorage.setItem('taskList', ul);
    })
}
saveList()


//clear lisr
const clearListButton = document.getElementById('clearList');
clearListButton.addEventListener('click', clearList)

function clearList() {
    localStorage.removeItem('taskList')
    location.reload();
}



function addTask() {
    let taskText = document.getElementById('newTask').value;
    const ul = document.querySelector('.toDoList');

    if (taskText.length >= 1) {

        const newTask = document.createElement("div");
        newTask.classList.add('line');
        newTask.innerHTML =
            `
        <input class="checkbox-round" type="checkbox">

        <span class="list-task_text">${taskText}</span>

        <div class="icons">
            <span class="material-symbols-outlined del">delete</span>
            <span class="material-symbols-outlined edit show-modal ">edit_note</span>
        </div>

        <div class="modal hidden">
            <button class="close-modal">&times;</button>
            <h2 class="modal_text">i want to edit task</h2>
            <div class="edit_area">
            <textarea class="task-editor" autofocus></textarea>
            <button class="save-edited-task material-symbols-outlined">edit</button></div>
        </div>
      <div class="overlay hidden"></div>
    `;
        ul.appendChild(newTask)

        //clear input line
        document.getElementById('newTask').value = "";


        const deleteTaskIcon = newTask.querySelector('.del');
        deleteTaskIcon.addEventListener('click', delTask);

        const editTaskIcon = newTask.querySelector('.edit');
        editTaskIcon.addEventListener('click', () => editTask(newTask));
    }
}

function delTask(e) {
    e.target.closest('.line').remove();
}

function editTask(taskElement) {
    const modal = taskElement.querySelector('.modal');
    const overlay = taskElement.querySelector('.overlay');
    const btnCloseModal = taskElement.querySelector('.close-modal');
    const changingText = taskElement.querySelector('.list-task_text');
    const textarea = taskElement.querySelector('.task-editor');

    const closeModal = function () {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    };

    const openModal = function () {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    };

    btnCloseModal.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
        if (e.code === "Escape" || (e.code === "Enter" && !modal.classList.contains('hidden'))) {
            closeModal();
        }
    });

    openModal();

    const saveBtn = taskElement.querySelector('.save-edited-task');
    saveBtn.addEventListener('click', () => {
        changingText.textContent = textarea.value;
        closeModal();
    });
}

// adding task with Enter
document.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') addTask();
})

