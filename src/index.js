import {
  createTodo,
  handleCreateButton,
  createNote,
  createProject,
} from "./todo";
import {
  handleRendering,
  renderNotes,
  createTodoForm,
  createNoteForm,
  createProjectForm,
  handleProjects,
} from "./rendering";

let todoList = [];
let notesList = [];
let projectsList = [];

function updateLocalStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
function getFromLocalStorage() {
  const gottenList = localStorage.getItem("todoList");
  if (gottenList) {
    todoList = JSON.parse(gottenList);
  }
  const gottenNotes = localStorage.getItem("notesList");
  if (gottenNotes) {
    notesList = JSON.parse(gottenNotes);
  }
  const gottenProjects = localStorage.getItem("projectsList");
  if (gottenProjects) {
    projectsList = JSON.parse(gottenProjects);
  }
}

function resetButtonBorders() {
  todayBtn.style.border = "none";
  homeBtn.style.border = "none";
  weekBtn.style.border = "none";
}

const main = document.getElementById("main");
let createWhat = "todo";
let chosenProject = "home";
getFromLocalStorage();

handleProjects();

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (createWhat == "todo") {
    const title = document.getElementById("textarea-title").value;
    const details = document.getElementById("textarea-details").value;
    const date = document.getElementById("modal-date").value;
    const done = false;
    const selectedP = document.getElementById("priority").value;
    const newTodo = createTodo(
      title,
      details,
      date,
      selectedP,
      done,
      chosenProject,
    );
    chosenProject = "";
    console.log(newTodo);
    todoList.push(newTodo);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  } else if (createWhat == "note") {
    const title = document.getElementById("textarea-title").value;
    const details = document.getElementById("textarea-details").value;
    const newNote = createNote(title, details);
    console.log(newNote);
    console.log(notesList);
    notesList.push(newNote);
    localStorage.setItem("notesList", JSON.stringify(notesList));
  } else if (createWhat == "project") {
    const title = document.getElementById("textarea-title").value;
    const newProject = createProject(title);
    projectsList.push(newProject);
    localStorage.setItem("projectsList", JSON.stringify(projectsList));
  }
  main.style.filter = "blur(0px)";
  document.getElementById("modal").style.visibility = document.getElementById("modal").style.visibility == "visible"
    ? "hidden"
    : "visible";
  window.location.reload();
});

handleRendering("home");
handleCreateButton();

const projectBtns = document.getElementsByClassName("whichProject");
[...projectBtns].forEach((btn) => btn.addEventListener("click", (e) => {
  chosenProject = e.currentTarget.value;
  handleRendering(chosenProject);
}));

const todoBtn = document.getElementById("Btntodo");
todoBtn.addEventListener("click", () => {
  createWhat = "todo";
  createTodoForm();
});
const projectBtn = document.getElementById("Btnproject");
projectBtn.addEventListener("click", () => {
  createWhat = "project";
  createProjectForm();
});
const noteBtn = document.getElementById("Btnnote");
noteBtn.addEventListener("click", () => {
  createWhat = "note";
  createNoteForm();
});
const todayBtn = document.getElementById("today");
todayBtn.addEventListener("click", () => {
  resetButtonBorders();
  todayBtn.style.border = "1px solid #3A3A3A";
  handleRendering("today");
});

const homeBtn = document.getElementById("home");
homeBtn.addEventListener("click", () => {
  resetButtonBorders();
  homeBtn.style.border = "1px solid #3A3A3A";
  handleRendering("home");
});

const weekBtn = document.getElementById("week");
weekBtn.addEventListener("click", () => {
  resetButtonBorders();
  weekBtn.style.border = "1px solid #3A3A3A";
  handleRendering("week");
});

const notesBtn = document.getElementById("notes");
notesBtn.addEventListener("click", () => {
  renderNotes();
});

const closeBtn = document.getElementById("modal-top-close");
closeBtn.addEventListener("click", () => {
  main.style.filter = "blur(0px)";
  document.getElementById("modal").style.visibility = document.getElementById("modal").style.visibility == "visible"
    ? "hidden"
    : "visible";
});
const closeDetailsBtn = document.getElementById("detailsModal-top-close");
closeDetailsBtn.addEventListener("click", () => {
  main.style.filter = "blur(0px)";
  document.getElementById("detailsModal").style.visibility = "hidden";
});
const closeEditBtn = document.getElementById("editModal-top-close");
closeEditBtn.addEventListener("click", () => {
  main.style.filter = "blur(0px)";
  document.getElementById("editModal").style.visibility = "hidden";
});
