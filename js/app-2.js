
window.addEventListener("load", () => {
  let objStore = JSON.parse(localStorage.getItem('todo-item'))

  document.querySelector('.todo__item').innerHTML = `
    <p class="todo__item-check" id="${objStore.completed}"> 
      <span>${objStore.id}. </span>
      <span>${objStore.completed ? 'done' : "let's do it"}</span>
    </p>
    <p class="todo__item-text" id="${objStore.userId}">${objStore.title}</p>
    <p class="todo__item-details">  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos alias architecto laboriosam animi voluptatem temporibus unde nihil eaque enim modi.</p>
  `
});