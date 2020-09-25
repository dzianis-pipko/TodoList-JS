let inputText = document.querySelector('.todo-add__input');
let addButton = document.querySelector('.todo-add__button');
let lists = document.querySelector('.wrapper-items');

let todoList = [];

let maxId = 0;

let inputTarget;

if (localStorage.getItem('todo')) {
   todoList = JSON.parse(localStorage.getItem('todo'));
   maxId = todoList.length;
   todoMassages();
}

addButton.addEventListener('click', function () {
   if (!inputText.value) return;

   todoList.push({
      todo: inputText.value,
      done: true,
      important: false,
      id: maxId++
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
         <input done="0" change_state="0" class="item__input inputResponse" id="${item.id}" type="text" value="${item.todo}" disabled="true">
         <div class="wrapper-itemButton">
            <button onclick="edit(${item.id})" class="item__button edit-color" id="button-edit__${item.id}">Edit</button>
            <button onclick="done(${item.id})" class="item__button done-color" id="button-done__${item.id}">!</button>
            <button onclick="remove(${item.id})" class="item__button remove-color" id="button-remove__${item.id}">Remove</button>
         </div>
      </li>
      `;
      lists.innerHTML = displayTodoBody;
   })
}
// item__
// #item__

function edit(id) {
   let inputResp = document.getElementById(`${id}`);
   let button = document.querySelector(`#button-edit__${id}`);

   if (inputResp.getAttribute('change_state') === '0') {
      inputResp.removeAttribute("disabled");
      inputResp.setAttribute('change_state', '1')

      button.innerText = 'save';
   } else {
      inputResp.setAttribute("disabled", true);
      inputResp.setAttribute('change_state', '0')
      button.innerText = 'Edit';

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

   let elemIndex = todoList.findIndex(item => item.id === +id);
   let element = todoList[elemIndex];

   if (inputResp.getAttribute('done') === '0' && element.done === false) {
      inputResp.setAttribute('done', '1');
      inputResp.classList.add('input__done');
      button.innerText = 'Done';
      element.done = true;
      console.log(inputResp);
   } else {
      inputResp.setAttribute('done', '0');
      inputResp.classList.remove('input__done');
      button.innerText = '!';
      element.done = false;
      console.log(inputResp);
   }

   localStorage.setItem('todo', JSON.stringify(todoList));
   console.log('element', element);
   console.log('todoList', todoList);
}

// lists.addEventListener('click', function (e) {
//    inputTarget = e.target;
//    let idInputTarget = e.target.getAttribute('id');
//    doneFunction(idInputTarget);
// })

// function doneFunction(id) {
//    let elemIndex = todoList.findIndex(item => item.id === +id);

//    let element = todoList[elemIndex];
//    if (element.done) {
//       element.done = false;
//       inputTarget.classList.remove('input__done');
//    } else {
//       element.done = true;
//       inputTarget.classList.add('input__done');
//    }

//    localStorage.setItem('todo', JSON.stringify(todoList));
// }




// if () {
//    inputTarget.classList.add('input__done');
// } else {
//    inputTarget.classList.remove('input__done');
// }