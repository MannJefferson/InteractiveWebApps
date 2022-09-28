// Task Class: Represents a Task
class Task {
    constructor(title, date) { // a method that runs when creating a Task
        this.title = title;
        this.date = date;
        
    }
}
//UI Class: Handle UI Tasks
class UI {
    static displayTasks() {
        const StoredTasks = [
            {
                title: 'Check Emails',
                date: '25-08-2022',
                
            },
            {
                title: 'Return Calls',
                date: '30-09-2022',
                },

        ];
        const tasks = StoredTasks;
        // to add task/to do to the table list
        tasks.forEach((task) => UI.addTaskToList(task));

    }
    static addTaskToList(task) {
        const list = document.querySelector('#todo-list');

        const row = document.createElement('tr');
        row.innerHTML = `
        
        <td>${task.title}</td>
        <td>${task.date}</td>
        <td><a href="#" class="btn btn-primary btn-sm complete">complete</a></td>
        <td><a href="#" class="btn btn-warning btn-sm delete">delete</a></td>
       `;
        list.appendChild(row);
    }
    static deleteTask(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
    //  to add completion function on Task and to change button from complete to done.
    static completeTask(el) {
        if (el.classList.contains('complete')) {
            el.parentElement.parentElement.style.setProperty("text-decoration", "line-through");
            //  document.querySelectorAll('complete')
            //.textContent='redo';
        }
           }
static buttonupdate(el){
  if (el.classList.contains('complete')) {
    document.querySelector('#btn btn-primary btn-sm complete').innertext="done";
 }
}

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#date').value = '';
            }
}
//Store Class: Handles Storages
// Event: Display Tasks
document.addEventListener('DOMContentLoaded', UI.displayTasks);
// Event: Add a Task
document.querySelector('#todo-form').addEventListener('submit', (e) => {
    //prevent actual submit
    e.preventDefault();

    //Get form Values
    const title = document.querySelector('#title').value;
    const date = document.querySelector('#date').value;
    
    //Instantiate Task
    const task = new Task(title, date);
    console.log(task);

    //Add Task to UI
    UI.addTaskToList(task);
    //Clear Fields
    UI.clearFields();
});

//Events:Remove a Task
document.querySelector('#todo-list').addEventListener('click', (e) => {
    UI.deleteTask(e.target)
});
document.querySelector('#todo-list').addEventListener('click', (e) => {
    UI.completeTask(e.target)
});

// to change the button once task has been completed
document.querySelector('#todo-list').addEventListener('click', (e) => {
    UI.buttonupdate(e.target)
});