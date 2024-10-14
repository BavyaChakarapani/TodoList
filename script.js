document.addEventListener('DOMContentLoaded', function() {
    var taskForm = document.getElementById('taskForm');
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');
    var tasks = [];

    // Function to render tasks in the task list
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function(task, index) {
            var li = document.createElement('li');
            
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', function() {
                toggleCompleted(index);
            });
            li.appendChild(checkbox);
            
            var span = document.createElement('span');
            span.textContent = task.text;
            if (task.completed) {
                span.style.textDecoration = 'line-through';
            }
            li.appendChild(span);

            var deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', function() {
                deleteTask(index);
            });

            var editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('edit-btn');
            editBtn.addEventListener('click', function() {
                editTask(index);
            });

            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    // Function to add a new task
    function addTask(taskText) {
        tasks.push({ text: taskText, completed: false });
        renderTasks();
    }

    // Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    // Function to edit a task
    function editTask(index) {
        var newText = prompt('Edit task:', tasks[index].text);
        if (newText !== null) {
            tasks[index].text = newText;
            renderTasks();
        }
    }

    // Function to toggle task completion
    function toggleCompleted(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    // Event listener for form submission
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        } else {
            alert('Please enter a task.');
        }
    });

    // Initialize the task list
    renderTasks();
});
