(() => {
  "use strict";
  const t = document.getElementsByClassName("current-project")[0];
  console.log(t);
  let e = [],
    n = [],
    o = [];
  function i(n) {
    (t.innerHTML = ""), console.log("handle rendering was ran.");
    for (let u = 0; u < e.length; u++) {
      const p = e[u],
        y = document.createElement("div");
      (y.dataset.index = u), (y.id = "todoBox");
      const g = document.createElement("div");
      g.classList.add("todo-tick");
      const b = document.createElement("div");
      b.classList.add("todo-title"), (b.textContent = p.title);
      const E = document.createElement("div");
      E.classList.add("todo-details");
      const h = document.createElement("button");
      (h.id = "todo-details-btn"),
        (h.dataset.index = u),
        (h.onclick = function (t) {
          const e = t.currentTarget.dataset.index;
          console.log("details was ran"), l(e);
        }),
        (h.textContent = "details"),
        E.appendChild(h);
      const v = document.createElement("div");
      var i = p.dueDate,
        d = new Date(i),
        m =
          d.toLocaleString("default", { month: "long" }) + " " + r(d.getDate());
      (v.textContent = m), v.classList.add("todo-date");
      const C = document.createElement("div");
      C.classList.add("todo-edit"),
        (C.onclick = function (t) {
          const e = t.currentTarget.dataset.index;
          console.log("edit button aws ran"), s(e);
        }),
        (C.dataset.index = u);
      const x = document.createElement("img");
      (x.src = "../src/images/square-edit-outline.svg"),
        C.appendChild(x),
        (C.dataset.index = u);
      const f = document.createElement("div");
      f.classList.add("todo-delete");
      const B = document.createElement("img");
      if (
        ((B.src = "../src/images/trash-can.svg"),
        f.appendChild(B),
        (f.dataset.index = u),
        (f.onclick = function (t) {
          const n = t.currentTarget.dataset.index;
          e.splice(n, 1),
            localStorage.setItem("todoList", JSON.stringify(e)),
            window.location.reload();
        }),
        "low" == p.priority
          ? ((v.style.color = "#00e70b"),
            (h.style.border = "1px solid #00e70b"),
            (h.style.color = "#00e70b"),
            (y.style.borderLeft = "8px solid #00e70b"))
          : "medium" == p.priority
            ? ((v.style.color = "orange"),
              (h.style.border = "1px solid orange"),
              (h.style.color = "orange"),
              (y.style.borderLeft = "8px solid orange"))
            : "high" == p.priority &&
              ((v.style.color = "#FE2A23"),
              (h.style.border = "1px solid #FE2A23"),
              (h.style.color = "#FE2A23"),
              (y.style.borderLeft = "8px solid #FE2A23")),
        (g.onclick = function () {
          (p.done = !p.done),
            1 == p.done
              ? ((g.style.background =
                  "url(../src/images/checkbox-marked.svg)"),
                (b.style.textDecoration = "line-through"),
                (b.style.opacity = "0.6"),
                (b.style.transition = "opacity 250ms ease-in-out"),
                (E.style.opacity = "0.6"),
                (E.style.transition = "opacity 250ms ease-in-out"),
                (v.style.opacity = "0.6"),
                (v.style.transition = "opacity 250ms ease-in-out"),
                (C.style.opacity = "0.6"),
                (C.style.transition = "opacity 250ms ease-in-out"),
                (f.style.opacity = "0.6"),
                (f.style.transition = "opacity 250ms ease-in-out"))
              : ((g.style.background =
                  "url(../src/images/checkbox-blank-outline.svg)"),
                (b.style.textDecoration = "none"),
                (b.style.opacity = "1"),
                (b.style.transition = "opacity 250ms ease-in-out"),
                (E.style.opacity = "1"),
                (E.style.transition = "opacity 250ms ease-in-out"),
                (v.style.opacity = "1"),
                (v.style.transition = "opacity 250ms ease-in-out"),
                (C.style.opacity = "1"),
                (C.style.transition = "opacity 250ms ease-in-out"),
                (f.style.opacity = "1"),
                (f.style.transition = "opacity 250ms ease-in-out"));
        }),
        y.appendChild(g),
        y.appendChild(b),
        y.appendChild(E),
        y.appendChild(v),
        y.appendChild(C),
        y.appendChild(f),
        t.appendChild(y),
        ("today" == n && !a(p)) || ("week" == n && !c(p)))
      )
        y.style.display = "none";
      else if ("home" == n) y.style.display = "flex";
      else
        for (let t = 0; t < o.length; t++)
          n == o[t].title && p.project === o[t].title
            ? (y.style.display = "flex")
            : (y.style.display = "none");
    }
  }
  function l(t) {
    for (let n = 0; n < e.length; n++)
      if (n == t) {
        const t = document.getElementById("main");
        (t.style.transition = "filter 250ms ease-in-out"),
          (t.style.filter = "blur(20px)");
        const o = e[n];
        (document.getElementById("detailsModal").style.visibility = "visible"),
          (document.getElementById("details-title-actual").textContent =
            o.title),
          (document.getElementById("details-details-actual").textContent =
            o.detail),
          (document.getElementById("details-date-actual").textContent =
            o.dueDate);
        const i = document.getElementById("details-priority-actual");
        i.textContent = o.priority;
        const l = document.getElementById("detailsModal-top");
        "low" == o.priority
          ? ((l.style.backgroundColor = "#00e70b"), (i.style.color = "#00e70b"))
          : "medium" == o.priority
            ? ((l.style.backgroundColor = "orange"), (i.style.color = "orange"))
            : "high" == o.priority &&
              ((l.style.backgroundColor = "#FE2A23"),
              (i.style.color = "#FE2A23"));
      }
  }
  function d(t, e) {
    const n = document.createElement("button");
    return (n.id = t), (n.textContent = e), n;
  }
  function s(t) {
    for (let n = 0; n < e.length; n++)
      if (t == n) {
        const t = e[n],
          o = document.getElementById("main");
        (o.style.filter = "blur(10px)"),
          (o.style.transition = "filter 250ms ease-in-out"),
          (document.getElementById("editModal").style.visibility = "visible");
        const l = document.getElementById("textarea-edit-title");
        l.placeholder = t.title;
        const d = document.getElementById("textarea-edit-details");
        d.placeholder = t.detail;
        const s = document.getElementById("edit-date-input");
        (s.placeholder = t.dueDate),
          console.log(s),
          document
            .getElementById("editForm")
            .addEventListener("submit", function (n) {
              n.preventDefault(),
                console.log(s.value),
                l.value && (t.title = l.value),
                d.value && (t.detail = d.value),
                s.value && (t.dueDate = s.value),
                (t.priority = document.getElementById("editPriority").value),
                (o.style.filter = "blur(0px)"),
                (document.getElementById("editModal").style.visibility =
                  "hidden"),
                localStorage.setItem("todoList", JSON.stringify(e)),
                (document.getElementsByClassName(
                  "current-project",
                )[0].innerHTML = ""),
                i();
            });
      }
  }
  function a(t) {
    const e = new Date(),
      n = new Date(t.dueDate);
    return (
      e.getDate() === n.getDate() &&
      e.getMonth() === n.getMonth() &&
      e.getFullYear() === n.getFullYear()
    );
  }
  function c(t) {
    const e = new Date(),
      n = new Date(t.dueDate),
      o = new Date(e);
    o.setDate(e.getDate() - e.getDay()), o.setHours(0, 0, 0, 0);
    const i = new Date(o);
    return (
      i.setDate(o.getDate() + 6), i.setHours(23, 59, 59, 999), n >= o && n <= i
    );
  }
  function r(t) {
    if (t >= 11 && t <= 13) return t + "th";
    switch (t % 10) {
      case 1:
        return t + "st";
      case 2:
        return t + "nd";
      case 3:
        return t + "rd";
      default:
        return t + "th";
    }
  }
  !(function () {
    const t = localStorage.getItem("todoList");
    t && (e = JSON.parse(t));
    const i = localStorage.getItem("notesList");
    i && (n = JSON.parse(i));
    const l = localStorage.getItem("projectsList");
    l && (o = JSON.parse(l));
  })();
  let m = [],
    u = [],
    p = [];
  function y() {
    (h.style.border = "none"),
      (v.style.border = "none"),
      (C.style.border = "none");
  }
  const g = document.getElementById("main");
  let b = "todo",
    E = "home";
  !(function () {
    const t = localStorage.getItem("todoList");
    t && (m = JSON.parse(t));
    const e = localStorage.getItem("notesList");
    e && (u = JSON.parse(e));
    const n = localStorage.getItem("projectsList");
    n && (p = JSON.parse(n));
  })(),
    (function () {
      const t = document.getElementsByClassName("all-projects")[0];
      t.innerHTML = "";
      const e = d("home", "Home"),
        n = document.createElement("div");
      (n.id = "btn"), n.appendChild(e), t.appendChild(n);
      const i = d("today", "Today"),
        l = document.createElement("div");
      (l.id = "btn"), l.appendChild(i), t.appendChild(l);
      const s = d("week", "Week"),
        a = document.createElement("div");
      (a.id = "btn"), a.appendChild(s), t.appendChild(a);
      const c = d("", "Projects"),
        r = document.createElement("div");
      (r.id = "btn"), r.appendChild(c), t.appendChild(r);
      const m = document.createElement("div"),
        u = document.createElement("ul");
      m.id = "projects";
      for (let t = 0; t < o.length; t++) {
        const e = o[t].title;
        console.log("project list was ran");
        const n = document.createElement("div");
        n.id = "btn";
        const i = document.createElement("button");
        (i.textContent = e),
          (i.id = "title"),
          i.classList.add("whichProject"),
          n.appendChild(i),
          u.appendChild(n);
      }
      m.appendChild(u), t.appendChild(m);
      var p = document.createElement("div");
      p.id = "btn";
      var y = document.createElement("button");
      (y.id = "notes"),
        (y.textContent = "Notes"),
        p.appendChild(y),
        t.appendChild(p);
      var g = document.createElement("div");
      g.id = "createBtnDiv";
      var b = document.createElement("button");
      (b.id = "createBtn"),
        (b.textContent = "+"),
        g.appendChild(b),
        t.appendChild(g);
    })(),
    document.getElementById("form").addEventListener("submit", (t) => {
      if ((t.preventDefault(), "todo" == b)) {
        const t = !1,
          e = (function (t, e, n, o, i, l) {
            return (
              console.log("Received parameters:", t, e, n, o, i),
              {
                title: t,
                detail: e,
                dueDate: n,
                priority: o,
                done: i,
                project: l,
              }
            );
          })(
            document.getElementById("textarea-title").value,
            document.getElementById("textarea-details").value,
            document.getElementById("modal-date").value,
            document.getElementById("priority").value,
            t,
            E,
          );
        (E = ""),
          console.log(e),
          m.push(e),
          localStorage.setItem("todoList", JSON.stringify(m));
      } else if ("note" == b) {
        const t = {
          title: document.getElementById("textarea-title").value,
          detail: document.getElementById("textarea-details").value,
        };
        console.log(t),
          console.log(u),
          u.push(t),
          localStorage.setItem("notesList", JSON.stringify(u));
      } else if ("project" == b) {
        const t = { title: document.getElementById("textarea-title").value };
        p.push(t), localStorage.setItem("projectsList", JSON.stringify(p));
      }
      (g.style.filter = "blur(0px)"),
        (document.getElementById("modal").style.visibility =
          "visible" == document.getElementById("modal").style.visibility
            ? "hidden"
            : "visible"),
        window.location.reload();
    }),
    i("home"),
    document.getElementById("createBtn").addEventListener("click", () => {
      const t = document.getElementById("main");
      (t.style.transition = "filter 250ms ease-in-out"),
        (t.style.filter = "blur(20px)"),
        (document.getElementById("modal").style.visibility =
          "visible" == document.getElementById("modal").style.visibility
            ? "hidden"
            : "visible");
    }),
    [...document.getElementsByClassName("whichProject")].forEach((t) =>
      t.addEventListener("click", (t) => {
        (E = t.currentTarget.value), i(E);
      }),
    ),
    document.getElementById("Btntodo").addEventListener("click", () => {
      (b = "todo"),
        (function () {
          const t = document.getElementById("form"),
            e = document.getElementsByClassName(
              "modal-current-project-todo",
            )[0];
          e.innerHTML = "";
          const n = document.createElement("textarea");
          n.setAttribute("name", "title"),
            n.setAttribute("id", "textarea-title"),
            n.setAttribute("cols", "30"),
            n.setAttribute("rows", "1"),
            n.setAttribute("placeholder", "Title: Pay bills..."),
            n.setAttribute("required", ""),
            e.appendChild(n);
          const o = document.createElement("textarea");
          o.setAttribute("name", "details"),
            o.setAttribute("id", "textarea-details"),
            o.setAttribute("cols", "30"),
            o.setAttribute("rows", "10"),
            o.setAttribute("placeholder", "Details: e.g internet, gas..."),
            e.appendChild(o);
          const i = document.createElement("div");
          i.classList.add("dueDate");
          const l = document.createElement("p");
          l.textContent = "Due Date: ";
          const d = document.createElement("input");
          d.setAttribute("type", "date"),
            d.setAttribute("id", "modal-date"),
            d.setAttribute("required", ""),
            i.appendChild(l),
            i.appendChild(d),
            e.appendChild(i);
          const s = document.createElement("div");
          s.classList.add("priority");
          const a = document.createElement("label");
          a.setAttribute("for", "priority"), (a.textContent = "Priority: ");
          const c = document.createElement("select");
          c.setAttribute("id", "priority"),
            c.setAttribute("name", "priority"),
            c.setAttribute("required", "");
          const r = document.createElement("option");
          r.setAttribute("value", "low"), (r.textContent = "Low");
          const m = document.createElement("option");
          m.setAttribute("value", "medium"), (m.textContent = "Medium");
          const u = document.createElement("option");
          u.setAttribute("value", "high"),
            (u.textContent = "High"),
            c.appendChild(r),
            c.appendChild(m),
            c.appendChild(u);
          const p = document.createElement("button");
          p.classList.add("priorBtn"),
            p.setAttribute("id", "add"),
            p.setAttribute("type", "submit"),
            (p.textContent = "add to do"),
            s.appendChild(a),
            s.appendChild(c),
            s.appendChild(p),
            e.appendChild(s),
            t.appendChild(e);
        })();
    }),
    document.getElementById("Btnproject").addEventListener("click", () => {
      (b = "project"),
        (function () {
          const t = document.getElementById("form"),
            e = document.getElementsByClassName(
              "modal-current-project-todo",
            )[0];
          e.innerHTML = "";
          const n = document.createElement("textarea");
          n.setAttribute("name", "title"),
            n.setAttribute("id", "textarea-title"),
            n.setAttribute("cols", "30"),
            n.setAttribute("rows", "1"),
            n.setAttribute("placeholder", "Title: Pay bills..."),
            n.setAttribute("required", ""),
            e.appendChild(n);
          const o = document.createElement("button");
          o.classList.add("priorBtn"),
            o.setAttribute("id", "add"),
            o.setAttribute("type", "submit"),
            (o.textContent = "Create Note"),
            e.appendChild(o),
            t.appendChild(e);
        })();
    }),
    document.getElementById("Btnnote").addEventListener("click", () => {
      (b = "note"),
        (function () {
          const t = document.getElementById("form"),
            e = document.getElementsByClassName(
              "modal-current-project-todo",
            )[0];
          e.innerHTML = "";
          const n = document.createElement("textarea");
          n.setAttribute("name", "title"),
            n.setAttribute("id", "textarea-title"),
            n.setAttribute("cols", "30"),
            n.setAttribute("rows", "1"),
            n.setAttribute("placeholder", "Title: Pay bills..."),
            n.setAttribute("required", ""),
            e.appendChild(n);
          const o = document.createElement("textarea");
          o.setAttribute("name", "details"),
            o.setAttribute("id", "textarea-details"),
            o.setAttribute("cols", "30"),
            o.setAttribute("rows", "10"),
            o.setAttribute("placeholder", "Details: e.g internet, gas..."),
            e.appendChild(o);
          const i = document.createElement("button");
          i.classList.add("priorBtn"),
            i.setAttribute("id", "add"),
            i.setAttribute("type", "submit"),
            (i.textContent = "Create Note"),
            e.appendChild(i),
            t.appendChild(e);
        })();
    });
  const h = document.getElementById("today");
  h.addEventListener("click", () => {
    y(), (h.style.border = "1px solid #3A3A3A"), i("today");
  });
  const v = document.getElementById("home");
  v.addEventListener("click", () => {
    y(), (v.style.border = "1px solid #3A3A3A"), i("home");
  });
  const C = document.getElementById("week");
  C.addEventListener("click", () => {
    y(), (C.style.border = "1px solid #3A3A3A"), i("week");
  }),
    document.getElementById("notes").addEventListener("click", () => {
      !(function () {
        t.innerHTML = "";
        const e = document.createElement("div");
        e.id = "biggerNotes";
        for (let t = 0; t < n.length; t++) {
          const o = n[t],
            i = document.createElement("div"),
            l = document.createElement("div");
          i.appendChild(l), (l.id = "deleteNoteBtn"), (l.dataset.index = t);
          const d = document.createElement("img");
          (d.src = "../src/images/trash-can.svg"),
            l.appendChild(d),
            (l.dataset.index = t),
            (l.onclick = function (t) {
              const e = t.currentTarget.dataset.index;
              n.splice(e, 1),
                localStorage.setItem("notesList", JSON.stringify(n)),
                window.location.reload();
            });
          const s = document.createElement("p");
          (s.textContent = o.title), (s.style.fontWeight = "bold");
          const a = document.createElement("p");
          (a.textContent = o.detail),
            i.appendChild(s),
            i.appendChild(a),
            (i.id = "noteDiv"),
            e.appendChild(i);
        }
        t.appendChild(e);
      })();
    }),
    document.getElementById("modal-top-close").addEventListener("click", () => {
      (g.style.filter = "blur(0px)"),
        (document.getElementById("modal").style.visibility =
          "visible" == document.getElementById("modal").style.visibility
            ? "hidden"
            : "visible");
    }),
    document
      .getElementById("detailsModal-top-close")
      .addEventListener("click", () => {
        (g.style.filter = "blur(0px)"),
          (document.getElementById("detailsModal").style.visibility = "hidden");
      }),
    document
      .getElementById("editModal-top-close")
      .addEventListener("click", () => {
        (g.style.filter = "blur(0px)"),
          (document.getElementById("editModal").style.visibility = "hidden");
      });
})();
