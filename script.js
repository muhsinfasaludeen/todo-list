let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();

  if (taskText === "") return;

  tasks.push({
    text: taskText,
    completed: false
  });

  input.value = "";
  saveTasks();
  displayTasks();
}

function displayTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.className = "task-item";

    li.innerHTML = `
      <span onclick="toggleTask(${index})" class="task-text ${task.completed ? 'completed' : ''}">
        ${task.text}
      </span>
      <button class="delete-btn" onclick="deleteTask(${index})">✕</button>
    `;

    list.appendChild(li);
  });

  document.getElementById("totalTasks").innerText = tasks.length;
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

// Load tasks on page load
displayTasks();
