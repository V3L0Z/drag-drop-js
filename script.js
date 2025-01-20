const sortableList = document.getElementById("sortable-list");
let draggedItem = null;

sortableList.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("draggable")) {
    draggedItem = e.target;
    e.target.classList.add("dragging");
  }

  setTimeout(() => {
    e.target.style.display = "none";
  }, 0);
});

sortableList.addEventListener("dragend", (e) => {
  if (e.target.classList.contains("draggable")) {
    e.target.classList.remove("dragging");
    setTimeout(() => {
      e.target.style.display = "";
      draggedItem = null;
    }, 0);
  }
});

sortableList.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(sortableList, e.clientX);
  if (afterElement == null) {
    sortableList.appendChild(draggedItem);
  } else {
    sortableList.insertBefore(draggedItem, afterElement);
  }
});

const getDragAfterElement = (container, x) => {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = x - box.left - box.width / 2;
      if (offset < 0 && offset > closest.offset) {
        return {
          offset: offset,
          element: child,
        };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
};
