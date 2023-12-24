export function createTodo(title, detail, dueDate, priority, done, project) {
  console.log("Received parameters:", title, detail, dueDate, priority, done);
  return {
    title: title,
    detail: detail,
    dueDate: dueDate,
    priority: priority,
    done: done,
    project: project,
  };
}

export function handleCreateButton() {
  const createButton = document.getElementById("createBtn");
  createButton.addEventListener("click", () => {
    const main = document.getElementById("main");
    main.style.transition = "filter 250ms ease-in-out";
    main.style.filter = "blur(20px)";
    document.getElementById("modal").style.visibility =
      document.getElementById("modal").style.visibility == "visible"
        ? "hidden"
        : "visible";
  });
}

export function createNote(title, detail) {
  return {
    title: title,
    detail: detail,
  };
}

export function createProject(title) {
  return {
    title: title,
  };
}
