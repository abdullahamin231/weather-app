const main = document.getElementsByClassName("current-project")[0];
console.log(main);
let todoList = [];
let notesList = [];
let projectsList = [];
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

getFromLocalStorage();
export function handleRendering(filterBy) {
  main.innerHTML = "";
  console.log("handle rendering was ran.");
  for (let i = 0; i < todoList.length; i++) {
    const item = todoList[i];
    const bigDiv = document.createElement("div");
    bigDiv.dataset.index = i;
    bigDiv.id = "todoBox";
    const div1 = document.createElement("div");
    div1.classList.add("todo-tick");

    const div2 = document.createElement("div");
    div2.classList.add("todo-title");
    div2.textContent = item.title;
    const div3 = document.createElement("div");
    div3.classList.add("todo-details");
    const button3 = document.createElement("button");
    button3.id = "todo-details-btn";
    button3.dataset.index = i;
    button3.onclick = function (e) {
      const {index} = e.currentTarget.dataset;
      console.log("details was ran");
      showDetails(index);
    };
    button3.textContent = "details";
    div3.appendChild(button3);
    const div4 = document.createElement("div");
    const dateInput = item.dueDate;
    const selectedDate = new Date(dateInput);
    const month = selectedDate.toLocaleString("default", { month: "long" });
    const day = selectedDate.getDate();
    const dayWithSuffix = getDayWithSuffix(day);
    const formattedDate = `${month  } ${  dayWithSuffix}`;
    div4.textContent = formattedDate;
    div4.classList.add("todo-date");
    const div5 = document.createElement("div");
    div5.classList.add("todo-edit");
    div5.onclick = function (e) {
      const {index} = e.currentTarget.dataset;
      console.log("edit button aws ran");
      handleEditing(index);
    };
    div5.dataset.index = i;
    const image2 = document.createElement("img");
    image2.src = "../src/images/square-edit-outline.svg";
    div5.appendChild(image2);
    div5.dataset.index = i;
    const div6 = document.createElement("div");
    div6.classList.add("todo-delete");
    const image = document.createElement("img");
    image.src = "../src/images/trash-can.svg";
    div6.appendChild(image);
    div6.dataset.index = i;
    div6.onclick = function (e) {
      const {index} = e.currentTarget.dataset;
      todoList.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      window.location.reload();
    };

    if (item.priority == "low") {
      div4.style.color = "#00e70b";
      button3.style.border = "1px solid #00e70b";
      button3.style.color = "#00e70b";
      bigDiv.style.borderLeft = "8px solid #00e70b";
    } else if (item.priority == "medium") {
      div4.style.color = "orange";
      button3.style.border = "1px solid orange";
      button3.style.color = "orange";
      bigDiv.style.borderLeft = "8px solid orange";
    } else if (item.priority == "high") {
      div4.style.color = "#FE2A23";
      button3.style.border = "1px solid #FE2A23";
      button3.style.color = "#FE2A23";
      bigDiv.style.borderLeft = "8px solid #FE2A23";
    }
    div1.onclick = function () {
      item.done = !item.done;
      if (item.done == true) {
        div1.style.background = "url(../src/images/checkbox-marked.svg)";
        div2.style.textDecoration = "line-through";
        div2.style.opacity = "0.6";
        div2.style.transition = "opacity 250ms ease-in-out";
        div3.style.opacity = "0.6";
        div3.style.transition = "opacity 250ms ease-in-out";
        div4.style.opacity = "0.6";
        div4.style.transition = "opacity 250ms ease-in-out";
        div5.style.opacity = "0.6";
        div5.style.transition = "opacity 250ms ease-in-out";
        div6.style.opacity = "0.6";
        div6.style.transition = "opacity 250ms ease-in-out";
      } else {
        div1.style.background = "url(../src/images/checkbox-blank-outline.svg)";
        div2.style.textDecoration = "none";
        div2.style.opacity = "1";
        div2.style.transition = "opacity 250ms ease-in-out";
        div3.style.opacity = "1";
        div3.style.transition = "opacity 250ms ease-in-out";
        div4.style.opacity = "1";
        div4.style.transition = "opacity 250ms ease-in-out";
        div5.style.opacity = "1";
        div5.style.transition = "opacity 250ms ease-in-out";
        div6.style.opacity = "1";
        div6.style.transition = "opacity 250ms ease-in-out";
      }
    };
    bigDiv.appendChild(div1);
    bigDiv.appendChild(div2);
    bigDiv.appendChild(div3);
    bigDiv.appendChild(div4);
    bigDiv.appendChild(div5);
    bigDiv.appendChild(div6);
    main.appendChild(bigDiv);
    if (
      (filterBy == "today" && !isDueToday(item)) ||
      (filterBy == "week" && !isDueWeek(item))
    ) {
      bigDiv.style.display = "none";
    } else if (filterBy == "home") {
      bigDiv.style.display = "flex";
    } else {
      for (let j = 0; j < projectsList.length; j++) {
        if (
          filterBy == projectsList[j].title &&
          item.project === projectsList[j].title
        ) {
          bigDiv.style.display = "flex";
        } else {
          bigDiv.style.display = "none";
        }
      }
    }
  }
}

export function createTodoForm() {
  const form = document.getElementById("form");
  const top = document.getElementsByClassName("modal-current-project-todo")[0];
  top.innerHTML = "";
  // Create and append the title textarea with its attributes
  const titleTextarea = document.createElement("textarea");
  titleTextarea.setAttribute("name", "title");
  titleTextarea.setAttribute("id", "textarea-title");
  titleTextarea.setAttribute("cols", "30");
  titleTextarea.setAttribute("rows", "1");
  titleTextarea.setAttribute("placeholder", "Title: Pay bills...");
  titleTextarea.setAttribute("required", "");

  top.appendChild(titleTextarea);

  // Create and append the details textarea with its attributes
  const detailsTextarea = document.createElement("textarea");
  detailsTextarea.setAttribute("name", "details");
  detailsTextarea.setAttribute("id", "textarea-details");
  detailsTextarea.setAttribute("cols", "30");
  detailsTextarea.setAttribute("rows", "10");
  detailsTextarea.setAttribute("placeholder", "Details: e.g internet, gas...");

  top.appendChild(detailsTextarea);

  // Create and append the Due Date div with its elements
  const dueDateDiv = document.createElement("div");
  dueDateDiv.classList.add("dueDate");

  const dueDateParagraph = document.createElement("p");
  dueDateParagraph.textContent = "Due Date: ";

  const dateInput = document.createElement("input");
  dateInput.setAttribute("type", "date");
  dateInput.setAttribute("id", "modal-date");
  dateInput.setAttribute("required", "");

  dueDateDiv.appendChild(dueDateParagraph);
  dueDateDiv.appendChild(dateInput);

  top.appendChild(dueDateDiv);

  // Create and append the Priority div with its elements
  const priorityDiv = document.createElement("div");
  priorityDiv.classList.add("priority");

  const priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("for", "priority");
  priorityLabel.textContent = "Priority: ";

  const prioritySelect = document.createElement("select");
  prioritySelect.setAttribute("id", "priority");
  prioritySelect.setAttribute("name", "priority");
  prioritySelect.setAttribute("required", "");

  const lowOption = document.createElement("option");
  lowOption.setAttribute("value", "low");
  lowOption.textContent = "Low";

  const mediumOption = document.createElement("option");
  mediumOption.setAttribute("value", "medium");
  mediumOption.textContent = "Medium";

  const highOption = document.createElement("option");
  highOption.setAttribute("value", "high");
  highOption.textContent = "High";

  prioritySelect.appendChild(lowOption);
  prioritySelect.appendChild(mediumOption);
  prioritySelect.appendChild(highOption);

  const addButton = document.createElement("button");
  addButton.classList.add("priorBtn");
  addButton.setAttribute("id", "add");
  addButton.setAttribute("type", "submit");
  addButton.textContent = "add to do";

  priorityDiv.appendChild(priorityLabel);
  priorityDiv.appendChild(prioritySelect);
  priorityDiv.appendChild(addButton);

  top.appendChild(priorityDiv);

  // Append the top div to the form
  form.appendChild(top);
}

export function createNoteForm() {
  const form = document.getElementById("form");
  const top = document.getElementsByClassName("modal-current-project-todo")[0];
  top.innerHTML = "";
  // Create and append the title textarea with its attributes
  const titleTextarea = document.createElement("textarea");
  titleTextarea.setAttribute("name", "title");
  titleTextarea.setAttribute("id", "textarea-title");
  titleTextarea.setAttribute("cols", "30");
  titleTextarea.setAttribute("rows", "1");
  titleTextarea.setAttribute("placeholder", "Title: Pay bills...");
  titleTextarea.setAttribute("required", "");

  top.appendChild(titleTextarea);

  // Create and append the details textarea with its attributes
  const detailsTextarea = document.createElement("textarea");
  detailsTextarea.setAttribute("name", "details");
  detailsTextarea.setAttribute("id", "textarea-details");
  detailsTextarea.setAttribute("cols", "30");
  detailsTextarea.setAttribute("rows", "10");
  detailsTextarea.setAttribute("placeholder", "Details: e.g internet, gas...");

  top.appendChild(detailsTextarea);
  const addButton = document.createElement("button");
  addButton.classList.add("priorBtn");
  addButton.setAttribute("id", "add");
  addButton.setAttribute("type", "submit");
  addButton.textContent = "Create Note";
  top.appendChild(addButton);
  form.appendChild(top);
}

export function createProjectForm() {
  const form = document.getElementById("form");
  const top = document.getElementsByClassName("modal-current-project-todo")[0];
  top.innerHTML = "";
  // Create and append the title textarea with its attributes
  const titleTextarea = document.createElement("textarea");
  titleTextarea.setAttribute("name", "title");
  titleTextarea.setAttribute("id", "textarea-title");
  titleTextarea.setAttribute("cols", "30");
  titleTextarea.setAttribute("rows", "1");
  titleTextarea.setAttribute("placeholder", "Title: Pay bills...");
  titleTextarea.setAttribute("required", "");

  top.appendChild(titleTextarea);

  const addButton = document.createElement("button");
  addButton.classList.add("priorBtn");
  addButton.setAttribute("id", "add");
  addButton.setAttribute("type", "submit");
  addButton.textContent = "Create Note";
  top.appendChild(addButton);
  form.appendChild(top);
}

export function renderNotes() {
  main.innerHTML = "";
  const biggerDiv = document.createElement("div");
  biggerDiv.id = "biggerNotes";
  for (let i = 0; i < notesList.length; i++) {
    const note = notesList[i];
    const topDiv = document.createElement("div");
    const deleteDiv = document.createElement("div");
    topDiv.appendChild(deleteDiv);
    deleteDiv.id = "deleteNoteBtn";
    deleteDiv.dataset.index = i;
    const image = document.createElement("img");
    image.src = "../src/images/trash-can.svg";
    deleteDiv.appendChild(image);
    deleteDiv.dataset.index = i;
    deleteDiv.onclick = function (e) {
      const {index} = e.currentTarget.dataset;
      notesList.splice(index, 1);
      localStorage.setItem("notesList", JSON.stringify(notesList));
      window.location.reload();
    };
    const title = document.createElement("p");
    title.textContent = note.title;
    title.style.fontWeight = "bold";
    const details = document.createElement("p");
    details.textContent = note.detail;
    topDiv.appendChild(title);
    topDiv.appendChild(details);
    topDiv.id = "noteDiv";
    biggerDiv.appendChild(topDiv);
  }
  main.appendChild(biggerDiv);
}

function showDetails(index) {
  for (let i = 0; i < todoList.length; i++) {
    if (i == index) {
      const mainDiv = document.getElementById("main");
      mainDiv.style.transition = "filter 250ms ease-in-out";
      mainDiv.style.filter = "blur(20px)";
      const item = todoList[i];
      const detailsModal = document.getElementById("detailsModal");
      detailsModal.style.visibility = "visible";
      const detailsTitle = document.getElementById("details-title-actual");
      detailsTitle.textContent = item.title;
      const detailsDetails = document.getElementById("details-details-actual");
      detailsDetails.textContent = item.detail;
      const detailsDate = document.getElementById("details-date-actual");
      detailsDate.textContent = item.dueDate;
      const detailsPr = document.getElementById("details-priority-actual");
      detailsPr.textContent = item.priority;
      const detailsTop = document.getElementById("detailsModal-top");
      if (item.priority == "low") {
        detailsTop.style.backgroundColor = "#00e70b";
        detailsPr.style.color = "#00e70b";
      } else if (item.priority == "medium") {
        detailsTop.style.backgroundColor = "orange";
        detailsPr.style.color = "orange";
      } else if (item.priority == "high") {
        detailsTop.style.backgroundColor = "#FE2A23";
        detailsPr.style.color = "#FE2A23";
      }
    }
  }
}

// Function to create a button element
function createButton(id, text) {
  const button = document.createElement("button");
  button.id = id;
  button.textContent = text;
  return button;
}

export function handleProjects() {
  const allProjects = document.getElementsByClassName("all-projects")[0];
  allProjects.innerHTML = "";
  // Create Home button
  const homeButton = createButton("home", "Home");
  const homeBtnDiv = document.createElement("div");
  homeBtnDiv.id = "btn";
  homeBtnDiv.appendChild(homeButton);
  allProjects.appendChild(homeBtnDiv);

  const todayBtn = createButton("today", "Today");
  const todayBtnDiv = document.createElement("div");
  todayBtnDiv.id = "btn";
  todayBtnDiv.appendChild(todayBtn);
  allProjects.appendChild(todayBtnDiv);

  const weekBtn = createButton("week", "Week");
  const weekBtnDiv = document.createElement("div");
  weekBtnDiv.id = "btn";
  weekBtnDiv.appendChild(weekBtn);
  allProjects.appendChild(weekBtnDiv);

  // Create Projects button
  const pBtn = createButton("", "Projects");
  const pBtnDiv = document.createElement("div");
  pBtnDiv.id = "btn";
  pBtnDiv.appendChild(pBtn);
  allProjects.appendChild(pBtnDiv);

  const projectsDiv = document.createElement("div");
  const ul = document.createElement("ul");
  projectsDiv.id = "projects";
  for (let i = 0; i < projectsList.length; i++) {
    const {title} = projectsList[i];
    console.log("project list was ran");
    const projectBtnDiv = document.createElement("div");
    projectBtnDiv.id = "btn";
    const projectBtnDivBtn = document.createElement("button");
    projectBtnDivBtn.textContent = title;
    projectBtnDivBtn.id = "title";
    projectBtnDivBtn.classList.add("whichProject");
    projectBtnDiv.appendChild(projectBtnDivBtn);
    ul.appendChild(projectBtnDiv);
  }

  projectsDiv.appendChild(ul);
  allProjects.appendChild(projectsDiv);
  const btnDiv = document.createElement("div");
  btnDiv.id = "btn";
  const notesButton = document.createElement("button");
  notesButton.id = "notes";
  notesButton.textContent = "Notes";
  btnDiv.appendChild(notesButton);
  allProjects.appendChild(btnDiv);

  const createBtnDiv = document.createElement("div");
  createBtnDiv.id = "createBtnDiv";
  const createBtn = document.createElement("button");
  createBtn.id = "createBtn";
  createBtn.textContent = "+";
  createBtnDiv.appendChild(createBtn);
  allProjects.appendChild(createBtnDiv);
}

function handleEditing(index) {
  for (let i = 0; i < todoList.length; i++) {
    if (index == i) {
      const item = todoList[i];
      const mainDiv = document.getElementById("main");

      mainDiv.style.filter = "blur(10px)";
      mainDiv.style.transition = "filter 250ms ease-in-out";
      const editModal = document.getElementById("editModal");
      editModal.style.visibility = "visible";
      const textAreaTitle = document.getElementById("textarea-edit-title");
      textAreaTitle.placeholder = item.title;
      const textAreaDetails = document.getElementById("textarea-edit-details");
      textAreaDetails.placeholder = item.detail;
      const editFormDate = document.getElementById("edit-date-input");
      editFormDate.placeholder = item.dueDate;
      console.log(editFormDate);
      const editForm = document.getElementById("editForm");
      editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(editFormDate.value);
        if (textAreaTitle.value) {
          item.title = textAreaTitle.value;
        }
        if (textAreaDetails.value) {
          item.detail = textAreaDetails.value;
        }
        if (editFormDate.value) {
          item.dueDate = editFormDate.value;
        }
        item.priority = document.getElementById("editPriority").value;
        mainDiv.style.filter = "blur(0px)";
        document.getElementById("editModal").style.visibility = "hidden";
        localStorage.setItem("todoList", JSON.stringify(todoList));
        document.getElementsByClassName("current-project")[0].innerHTML = "";
        handleRendering();
      });
    }
  }
}

function isDueToday(item) {
  const today = new Date();
  const itemDate = new Date(item.dueDate);

  return (
    today.getDate() === itemDate.getDate() &&
    today.getMonth() === itemDate.getMonth() &&
    today.getFullYear() === itemDate.getFullYear()
  );
}

function isDueWeek(item) {
  const today = new Date();
  const itemDate = new Date(item.dueDate);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Start from Sunday
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // End on Saturday
  endOfWeek.setHours(23, 59, 59, 999);

  // Check if the item's due date is within the current week
  return itemDate >= startOfWeek && itemDate <= endOfWeek;
}

function getDayWithSuffix(day) {
  if (day >= 11 && day <= 13) {
    return `${day  }th`;
  }
  switch (day % 10) {
    case 1:
      return `${day  }st`;
    case 2:
      return `${day  }nd`;
    case 3:
      return `${day  }rd`;
    default:
      return `${day  }th`;
  }
}
