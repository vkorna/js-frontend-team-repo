const generateId = () => {
  return Math.floor(Math.random() * 100000);
};

let data = [
  {
    id: generateId(),
    title: 'List 1',
    tasks: [
      {
        id: '1',
        body: 'Task 1'
      }
    ]
  },
  {
    id: generateId(),
    title: 'List 2',
    tasks: [
      {
        id: '1',
        body: 'Task 2'
      },
      {
        id: '2',
        body: 'Task 3'
      }
    ]
  }
]


const getTask = task => {
  return new DOMParser().parseFromString(
    `
    <div class="row">
      <input class="checkbox" type="checkbox" id="task_1" name="task_1" checked>
      <label for="task_1">${task.body}</label>
    </div>
    `,
    "text/html"
  ).body.firstChild;
}

const handleAddTask = id => {
  const newTask = {id: generateId(), body: 'New Task'}

  data = data
  .map(list => list.id === id ? { ...list, tasks: list.tasks.concat(newTask) } : list);
  
  const list = document.getElementById(id + '-content').appendChild(getTask(newTask));

  console.log(data);
}

const getListContent = (listId, tasks) => {
  const result = new DOMParser().parseFromString(
    `
    <div class="list-content" id="${listId}-content"></div>
    `,
    "text/html"
  ).body.firstChild;
  
  tasks.forEach(element => {
    result.appendChild(getTask(element))
  });

  return result;
}


const getList = list => {
  const result = new DOMParser().parseFromString(
    `
    <div class="list" id="${list.id}">
      <div class="header">
          <h3 class="title">${list.title}</h3>
          <img class="icon" alt="Delete" src="../resources/trash.png">
      </div>
    </div>
    `,
    "text/html"
  ).body.firstChild;

   
  result.appendChild(getListContent(list.id, list.tasks));

  const addButton = new DOMParser().parseFromString(
    `
    <div class="add">Add to-do</div>
    `,
    "text/html"
  ).body.firstChild;
  
  addButton.addEventListener(
    'click',
    () => handleAddTask(list.id)
  )

  result.appendChild(addButton);

  return result;
}

data.forEach(elm => document.querySelector('.content').appendChild(getList(elm)));