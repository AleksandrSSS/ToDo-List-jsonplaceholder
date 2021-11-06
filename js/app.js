class Todo {
  constructor(options) { //  userId, id, title, completed
    this.userId = options.userId
    this.id = options.id
    this.title = options.title
    this.completed = options.completed
  }
  renderTodos() {
    let flag1 = this.completed ? 'done' : 'do it'
    let flag2 = this.completed ? 'checked' : ''
    let item = `
    <div class="todo" data-id-item="${this.id}">
      <label for="item-${this.id}"><input class="todo__complited" data-id-check="${this.id}" type="checkbox" id="item-${this.id}" ${flag2}> <span>${flag1}</span></label>
      <div class="todo__text-wrapper">
        <p class="todo__text" id="${this.userId}">${this.title}</p>
        <a class="todo__link" data-id-link="${this.id}">details...</a>
      </div>
      <button class="todo__delete" data-id-del="${this.id}">delete</button>
    </div> `
    return item // href="/detail.html" target="_blank"
  }
}
// 
renderPage()
document.addEventListener('click', (e) => {
  deleteTodoItem(e)
  changeComplete(e)
  setTodosLength()
})
// 
document.querySelectorAll('.todo__link').forEach(el => {
  el.addEventListener('click', renderItemTodo)
})
// renderItemTodo()
function renderItemTodo(e) {
  let obj = Object.assign(findItemTodo(e, 'data-id-link'))//console.log(obj);
  let itemString = JSON.stringify(obj)
  localStorage.setItem('todo-item', itemString) 
  window.location.href = '/detail.html';
}
// 
function findItemTodo(e, attr) {
  let arr = JSON.parse(localStorage.getItem('todo-items'))
  let index = e.target.getAttribute(attr)//console.log(flag);
  let res = arr.find( el => el.id == +index )
  return res
}
// 
function renderPage() {
  if (!localStorage.getItem('todo-items')) {
    getRequest()
  } else {
    renderTodosFromState()
    setTodosLength()
  }
}
// 
function getRequest() {
  fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(json => { 
    let todosString = JSON.stringify(json)
    localStorage.setItem('todo-items', todosString)
    return json
  })
  .then(data => { 
    data.forEach(item => {
      let todo = new Todo(item)
      document.querySelector('.todos__wrapper').innerHTML += todo.renderTodos()
    });
    setTodosLength()
  })
  .catch(err => console.log(err))
}
// 
function renderTodosFromState() {
  let arr = JSON.parse(localStorage.getItem('todo-items'))
  arr.forEach(item => {
    let todo = new Todo(item)
    if (document.querySelector('.todos__wrapper')) {
      
      document.querySelector('.todos__wrapper').innerHTML += todo.renderTodos()
    }
  })
}
// 
function changeComplete(e) {
  if (e.target.hasAttribute('data-id-check')) {
    e.target.nextElementSibling.innerText = e.target.checked ? 'done' : 'do it'
    let arrStore = JSON.parse(localStorage.getItem('todo-items'))
    arrStore[findIndex(e, 'data-id-check')].completed = (e.target.checked) ? true : false 
    setStorage(arrStore)
  }
}
// 
function deleteTodoItem(e) {
  if (e.target.hasAttribute('data-id-del')) { // console.log(e.target); console.log(e.target.parentNode);
    e.target.parentNode.remove()
    let arrStore = JSON.parse(localStorage.getItem('todo-items'))
    arrStore.splice(`${findIndex(e, 'data-id-del')}`, 1)
    setStorage(arrStore)
  }
}
// 
function findIndex(e, attr) {
  let arr = JSON.parse(localStorage.getItem('todo-items'))
  let index = e.target.getAttribute(attr)//console.log(flag);
  let res = arr.findIndex( el => el.id == +index )
  return res
}
// 
function setStorage(array) {
  let todosString = JSON.stringify(array)
  localStorage.setItem('todo-items', todosString)
}
// 
function setTodosLength() {
  let arr = JSON.parse(localStorage.getItem('todo-items'))
  document.querySelector('.todos__length-total').innerHTML = `You have ${arr.length} todos`
  let completed = 0, uncompleted = 0;
  arr.forEach(el => {
    (el.completed == true) ? completed++ : uncompleted++
  })
  document.querySelector('.todos__length-completed').innerHTML = `completed todos: ${completed}`
  document.querySelector('.todos__length-uncompleted').innerHTML = `uncompleted todos: ${uncompleted}`
}


