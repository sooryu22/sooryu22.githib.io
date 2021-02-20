// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  finishedList = document.querySelector(".js-finishedList");

const TODOS_LS = "toDos";
const FINISHED_LS = "finished";

let toDos = [];
let finished = [];

function deleteFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanFinished = finished.filter(function (finish) {
    return finish.id !== Number(li.id);
  });
  finished = cleanFinished; //replace it with a new array (updated after deletion)

  saveFinished();
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== Number(li.id);
  });
  toDos = cleanToDos; //replace it with a new array (updated after deletion)

  saveToDos();
}

function saveFinished() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function loadFinished() {
  const loadedFinished = localStorage.getItem(FINISHED_LS);
  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function (finished) {
      paintFinished(finished.text);
    });
  }
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function paintFinished(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  delBtn.classList.add("button");
  const backBtn = document.createElement("button");
  backBtn.classList.add("button");
  const newId = finished.length + 1;
  span.innerText = text;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteFinished);
  backBtn.innerText = "⏪";
  backBtn.addEventListener("click", handleBackward);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  li.id = newId; //<li id="1">
  finishedList.appendChild(li);
  const finishedObj = {
    text: text,
    id: newId
  };
  finished.push(finishedObj);
  saveFinished();
}

function paintToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  delBtn.classList.add("button");
  const checkBtn = document.createElement("button");
  checkBtn.classList.add("button");
  const newId = toDos.length + 1;
  span.innerText = text;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  checkBtn.innerText = "✅";

  checkBtn.addEventListener("click", handleCheckToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  li.id = newId; //<li id="1">
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleBackward(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.querySelector("span").innerText;
  paintToDo(span);
  deleteFinished(event);
}

function handleCheckToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.querySelector("span").innerText;
  paintFinished(span);
  deleteToDo(event);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; //submit
}

function init() {
  loadToDos();
  loadFinished();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
