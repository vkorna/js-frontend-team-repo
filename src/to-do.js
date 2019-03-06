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
  
  const list = document
    .getElementById(id + '-content')
    .appendChild(getTask(newTask));

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

const removeList = (listId) => {
  console.log(`Id to be removed: ${listId}`);

  data = data.filter(item => item.id !== listId);

  console.log(data);

  document.getElementById(listId).remove();
}


const getList = list => {
  const result = new DOMParser().parseFromString(
    `
    <div class="list" id="${list.id}">
      <div class="header">
          <h3 class="title">${list.title}</h3>
          <img class="icon" alt="Delete" onclick="removeList(${list.id})" src="../resources/trash.png">
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

document.getElementById("plus-button")
  .addEventListener(
    'click',
    () => { 
      getSider();
      document.getElementById("popup-close").addEventListener(
        'click',
        () => { console.log("close"); document.getElementById("sider").remove(); }
      );
    
    }
  )

const getSider = () => {
  const result = new DOMParser().parseFromString(
    `
    <div id="sider" class="overlay">
      <div class="popup">
        <a class="close" id="popup-close" href="#">&times;</a>
        <div class="content">
          Thank to pop me out of that button, but now i'm done so you can close this window.
        </div>
        <div class="sider-add">Add</div>
      </div>
    </div>
    `,
   "text/html" 
  ).body.firstChild;

  
  document.querySelector("body").appendChild(result);
  
  return result;
}