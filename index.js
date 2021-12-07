const TaskBtn = document.getElementById('task_btn');
const TaskInput = document.getElementById('description');
const wrapperTodo = document.querySelector('.wrapper-todo');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks')); // проверка если в локале что то есть , то в массиве таск оказываются задачи.

let TodoItemElems = [];

function Task(description){ ///масив с обьектом 
    this.description = description; // 
    this.completed = false;
} 

const createTemplate  = (task, index) => { ///если таск комплитед я ставлю отрибут ckecked
    return  `
    <div class="todo_item ${task .completed ? 'checked' : ''}">
         <div class="description">${task.description}</div>
         <div class="buttons">
         <input onclick="completeTask(${index})" class="btn_complete" type="checkbox" ${task.completed ? 'checked' :''}>
         <button onclick="deleteTask(${index})"  class="btn_delete">delete</button>
     </div>
     </div>
`
} 

const FilterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false); /// тут идет фильтрация выполненных тасков при нажатие комлитед и чекед 
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks,...completedTasks];
}

const fillHtmlList = () => {
     wrapperTodo.innerHTML  = "";
     if(tasks.length > 0) {
        FilterTasks();
         tasks.forEach((item, index) => {
             wrapperTodo.innerHTML += createTemplate(item, index);   //// перебор массива чере форич что бы добраться для каждой таски внутри массива    
         });
         TodoItemElems = document.querySelectorAll('.todo_item');
     }
}

fillHtmlList();
 
const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // localstorage лучше с json 
}

const completeTask = index => {
     tasks[index].completed = !tasks[index].completed; //показывает по какому индексу в таске нажимает
    //  if(tasks[index].completed) {
    //     TodoItemElems[index].classlist.add('checked');
    //  } else {
    //     TodoItemElems[index].classlist.remove('checked');
    //  }
     updateLocal(); 
     fillHtmlList();
}

TaskBtn.addEventListener('click', () => { /// при нажатии берем значение из импута и создаем новый объект и отправляем в таск 
    tasks.push(new Task(TaskInput.value)); /// отправляет в конец массива какое-то значение
    updateLocal(); //обновляем локал 
    fillHtmlList();
    TaskInput.value = '';
})

const deleteTask = index => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
}