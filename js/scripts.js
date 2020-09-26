let inputText = document.querySelector('.todo-add__input');
let addButton = document.querySelector('.todo-add__button');
let lists = document.querySelector('.wrapper-items');

let state = {
   todoList: [],
   maxId: 0,
   term: '',
   iconDone: '<i class="fas fa-check"></i>',
   iconCircle: '<i class="far fa-circle"></i>',
   searchTodoList: []
}

if (localStorage.getItem('todo')) {
   state.todoList = JSON.parse(localStorage.getItem('todo'));
   state.maxId = state.todoList.length;
   activeIndicator();
   doneIndicator();
   todoMassages(state.todoList);
}

addButton.addEventListener('click', function () {
   if (!inputText.value) return;

   state.todoList.push({
      todo: inputText.value,
      done: false,
      important: false,
      id: state.maxId++,
      inputClass: 'item__input',
      buttonDone: state.iconCircle,
   })
   activeIndicator();
   todoMassages(state.todoList);
   localStorageUpdate()
   inputText.value = '';
})

function todoMassages([...todos]) {
   let displayTodoBody = '';
   console.log('todos', todos);
   todos.forEach((item) => {
      displayTodoBody += `
      <li class="item" id="itemID__${item.id}">
         <div class="wrapper-itemButton">
            <button onclick="done(${item.id})" class="item__button done-color" id="button-done__${item.id}">${item.buttonDone}</button>
         </div>
         <input important="${item.important}" done="${item.done}" change_state="0" class="${item.inputClass}" id="${item.id}" type="text" value="${item.todo}" disabled="true">
         <div class="wrapper-itemButton">
            <button onclick="edit(${item.id})" class="item__button edit-color" id="button-edit__${item.id}"><i class="fas fa-edit"></i></button>
            <button onclick="important(${item.id})" class="item__button important-color" id="button-important__${item.id}"><i class="fas fa-exclamation"></i></button>
            <button onclick="remove(${item.id})" class="item__button remove-color" id="button-remove__${item.id}"><i class="far fa-trash-alt"></i></button>
         </div>
      </li>
      `;
      lists.innerHTML = displayTodoBody;
   })
}

function edit(id) {
   let inputResp = document.getElementById(`${id}`);
   let button = document.querySelector(`#button-edit__${id}`);

   if (inputResp.getAttribute('change_state') === '0') {
      inputResp.removeAttribute("disabled");
      inputResp.setAttribute('change_state', '1')
      inputResp.classList.add('input__edit');
      button.innerHTML = '<i class="fas fa-save"></i>';

   } else {
      inputResp.setAttribute("disabled", true);
      inputResp.setAttribute('change_state', '0')
      inputResp.classList.remove('input__edit');
      button.innerHTML = '<i class="fas fa-edit"></i>';

      let elementIndex = state.todoList.findIndex(item => item.id === +id);

      let element = state.todoList[elementIndex];
      element.todo = inputResp.value;

      localStorageUpdate()
   }
}

function remove(id) {
   let workLi = document.querySelector(`#itemID__${id}`);
   lists.removeChild(workLi);

   let elementIndex = state.todoList.findIndex(item => item.id === +id);
   let newArray = [
      ...state.todoList.slice(0, elementIndex),
      ...state.todoList.slice(elementIndex + 1),
   ];

   state.todoList = newArray;
   activeIndicator();
   doneIndicator();
   localStorageUpdate()
}

function done(id) {
   let inputResp = document.getElementById(`${id}`);

   let elemIndex = state.todoList.findIndex(item => item.id === id);
   let element = state.todoList[elemIndex];
   element.done = !element.done;

   activeIndicator();
   doneIndicator();

   if (element.done === true) {
      inputResp.setAttribute('done', true);
   } else {
      inputResp.setAttribute('done', false)
   }

   if (inputResp.getAttribute('done') === 'true') {
      element.inputClass += ' input__done';
      element.buttonDone = state.iconDone;
      todoMassages(state.todoList);
   } else {
      element.inputClass = 'item__input';
      element.buttonDone = state.iconCircle;
      todoMassages(state.todoList);
   }
   localStorageUpdate()
}
function important(id) {
   let inputResp = document.getElementById(`${id}`);

   let elemIndex = state.todoList.findIndex(item => item.id === id)
   let element = state.todoList[elemIndex];
   element.important = !element.important
   if (element.important === true) {
      inputResp.setAttribute('important', true)
   } else {
      inputResp.setAttribute('important', false)
   }

   if (inputResp.getAttribute('important') === 'true') {
      element.inputClass += ' input__important';
      todoMassages(state.todoList);
   } else {
      element.inputClass = 'item__input';
      todoMassages(state.todoList);
   }
   localStorageUpdate()
}

function activeIndicator() {
   let ectiveTodo = document.querySelector('.header__ectiveTodo');

   let countFilter = state.todoList.filter(item => item.done === false);
   let count = countFilter.length;
   ectiveTodo.innerText = count;
}
function doneIndicator() {
   let doneTodo = document.querySelector('.header__doneTodo');

   let countFilter = state.todoList.filter(item => item.done === true);
   let count = countFilter.length;
   doneTodo.innerText = count;
}
function localStorageUpdate() {
   localStorage.setItem('todo', JSON.stringify(state.todoList));
}

function search() {
   let searchInp = document.querySelector('.searchInput').value;
   state.term = searchInp;

   if (state.term === '') {
      renderSearchItems()
   } else {
      renderSearchItems()
   }
}

function searcFilter(items, term) {
   if (items.length === 0) {
      return items;
   }

   return items.filter(item => {
      return item.todo.toLowerCase().indexOf(term.toLowerCase()) > -1;
   })
}

function renderSearchItems() {
   state.searchTodoList = state.todoList
   let { searchTodoList, term } = state;
   let filterItems = searcFilter(searchTodoList, term)

   todoMassages(filterItems);
}
