let inputText = document.querySelector('.todo-add__input');
let addButton = document.querySelector('.todo-add__button');
let lists = document.querySelector('.wrapper-items');

let todoList = [];

let maxId = 0;

let iconDone = '<i class="fas fa-check"></i>';
let iconCircle = '<i class="far fa-circle"></i>';

if (localStorage.getItem('todo')) {
   todoList = JSON.parse(localStorage.getItem('todo'));
   maxId = todoList.length;
   todoMassages();
}

addButton.addEventListener('click', function () {
   if (!inputText.value) return;

   todoList.push({
      todo: inputText.value,
      done: false,
      important: false,
      id: maxId++,
      inputClass: 'item__input',
      buttonDone: iconCircle,
   })

   todoMassages();
   localStorage.setItem('todo', JSON.stringify(todoList));
   inputText.value = '';
})

function todoMassages() {
   let displayTodoBody = '';
   todoList.forEach((item) => {
      displayTodoBody += `
      <li class="item" id="itemID__${item.id}">
         <div class="wrapper-itemButton">
            <button onclick="done(${item.id})" class="item__button done-color" id="button-done__${item.id}">${item.buttonDone}</button>
         </div>
         <input done="${item.done}" change_state="0" class="${item.inputClass}" id="${item.id}" type="text" value="${item.todo}" disabled="true">
         <div class="wrapper-itemButton">
            <button onclick="edit(${item.id})" class="item__button edit-color" id="button-edit__${item.id}"><i class="fas fa-edit"></i></button>
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
      button.innerHTML = '<i class="fas fa-save"></i>';

   } else {
      inputResp.setAttribute("disabled", true);
      inputResp.setAttribute('change_state', '0')
      button.innerHTML = '<i class="fas fa-edit"></i>';

      let elementIndex = todoList.findIndex(item => item.id === +id);

      let element = todoList[elementIndex];
      element.todo = inputResp.value;

      localStorage.setItem('todo', JSON.stringify(todoList));
   }
}

function remove(id) {
   let workLi = document.querySelector(`#itemID__${id}`);
   lists.removeChild(workLi);

   let elementIndex = todoList.findIndex(item => item.id === +id);
   let newArray = [
      ...todoList.slice(0, elementIndex),
      ...todoList.slice(elementIndex + 1),
   ];

   todoList = newArray;
   console.log(todoList);

   localStorage.setItem('todo', JSON.stringify(todoList));
}

function done(id) {
   let inputResp = document.getElementById(`${id}`);
   let button = document.querySelector(`#button-done__${id}`);

   let elemIndex = todoList.findIndex(item => item.id === id);
   let element = todoList[elemIndex];
   element.done = !element.done;
   if (element.done === true) {
      inputResp.setAttribute('done', true);
   } else {
      inputResp.setAttribute('done', false)
   }

   if (inputResp.getAttribute('done') === 'true') {
      element.inputClass += ' input__done';
      element.buttonDone = iconDone;
      todoMassages();
   } else {
      element.inputClass = 'item__input';
      element.buttonDone = iconCircle;
      todoMassages();
   }

   localStorage.setItem('todo', JSON.stringify(todoList));

   console.log('element', element);
   console.log('ID', id);
   console.log('todoList', todoList);
   console.log('inputResp', inputResp);
   console.log('inputResp', inputResp.getAttribute('done'));

}