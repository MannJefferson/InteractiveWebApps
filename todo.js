
// Task Class: indicates a toDo
class Task {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayTasks() {
  const tasks = Store.getTasks();
  tasks.forEach((task) => UI.addTaskToList(task));
  }

  static addTaskToList(task) {
    const list = document.querySelector('#todo-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td><input type="checkbox" id="hide" > </td>  
        <td>${task.title}</td>
        <td>${task.date}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">delete</a></td>
      `;
    list.appendChild(row);
  }


  // static completeTask(el) {
  //   if (el.classList.contains('complete')) {
  //     //el.parentElement.parentElement.style.setProperty("text-decoration", "line-through");
  //     console.log()

  //   }
  // }

  static deleteTask(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#todo-form');
    container.insertBefore(div, form);

    // Alert to clear in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 2000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#date').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    return tasks;
  }

  static addTask(task) {
    const tasks = Store.getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static removeTask(date) {
    const tasks = Store.getTasks();

    tasks.forEach((task, index) => {
      if (task.date === date) {
        tasks.splice(index, 1);
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Event to display toDo tasks
document.addEventListener('DOMContentLoaded', UI.displayTasks);

// Event: to Add a task / Todo
document.querySelector('#todo-form').addEventListener('submit', (e) => {
// Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const date = document.querySelector('#date').value;


  // Validate form input
  if (title === '' || date === '') {
    UI.showAlert('Please complete all fields to add Task', 'danger');
  } else {
    // Instatiate toDo
    const task = new Task(title, date);

    // Adding toDo to UI
    UI.addTaskToList(task);

    // Adding toDo to store
    Store.addTask(task);

    // Show success message
    UI.showAlert('ToDo Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});




// Event: Remove a toDo or task
document.querySelector('#todo-list').addEventListener('click', (e) => {
  // Remove toDo from UI
  UI.deleteTask(e.target);

  // document.querySelector('#todo-list').addEventListener('click', (e) => {
  //     UI.completeTask(e.target);
  //     });

  // Remove toDO from store
  Store.removeTask(e.target.parentElement.previousElementSibling.textContent);

  // Show success message when todo  has been deleted
  UI.showAlert('toDO Removed', 'success');
});

  // document.querySelector('#todo-list').addEventListener('click', (e) => {
  //   UI.completeTask(e.target);
  //   });

