let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to localStorage and update UI
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Add Task
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
}

// Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
}

// Toggle Completed / Not Completed
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
}

// Render Tasks on Screen
function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    list.innerHTML += `
      <li>
        <span onclick="toggleTask(${index})"
              class="${task.completed ? 'completed' : ''}">
          ${task.text}
        </span>

        <button onclick="editTask(${index})">Edit</button>
<button onclick="deleteTask(${index})">Delete</button> 
      </li>
    `;
  });

  // ⭐ Task Counter (CORRECT PLACE)
  document.getElementById("taskCount").innerText =
    `${tasks.filter(t => !t.completed).length} tasks remaining`;
}
function editTask(index) {
  let newTask = prompt("Edit your task:", tasks[index].text);

  if (newTask !== null && newTask.trim() !== "") {
    tasks[index].text = newTask.trim();
    saveTasks();
  }
}

// Load tasks when page opens
renderTasks();