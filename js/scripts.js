let inputText = document.querySelector('.todo-add__input');
let addButton = document.querySelector('.todo-add__button');
let lists = document.querySelector('.wrapper-items');


let todoList = [];

let maxId = 0;

if (localStorage.getItem('todo')) {
   todoList = JSON.parse(localStorage.getItem('todo'));
   todoMassages();
}

addButton.addEventListener('click', function () {
   if (!inputText.value) return;

   todoList.push({
      todo: inputText.value,
      done: false,
      important: false,
      id: maxId++
   })

   todoMassages();
   localStorage.setItem('todo', JSON.stringify(todoList));
   inputText.value = '';
})

function todoMassages() {
   let displayTodoBody = '';
   todoList.forEach((item, index) => {
      displayTodoBody += `
      <li class="item" id="itemID__${index}">
         <input class="item__input" id="item__${index}" type="text" value="${item.todo}" disabled="true">
         <div class="wrapper-itemButton">
            <button onclick="edit()" class="item__button edit-color" id="button-edit__${index}">Edit</button>
            <button onclick="remove()" class="item__button remove-color" id="button-remove__${index}">Remove</button>
         </div>
      </li>
      `;
      lists.innerHTML = displayTodoBody;
   })

}
function edit() {
   console.log('edit');
}
function remove(li) {
   console.log('remove');
   lists.removeChild(li);
}

