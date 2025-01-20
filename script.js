// Class for sorting html cards
class SortableList {
  constructor(id) {
    this.sortableList = document.getElementById(id);
    this.draggedItem = null;

    this.initEventListeners();
  }

  initEventListeners() {
    this.sortableList.addEventListener(
      "dragstart",
      this.onDragStart.bind(this)
    );
    this.sortableList.addEventListener("dragend", this.onDragEnd.bind(this));
    this.sortableList.addEventListener("dragover", this.onDragOver.bind(this));
    this.sortableList.addEventListener("drop", this.onDrop.bind(this));
  }

  onDragStart(e) {
    if (e.target.classList.contains("draggable")) {
      this.draggedItem = e.target;
      e.target.classList.add("dragging");

      setTimeout(() => {
        e.target.style.display = "none";
      }, 0);
    }
  }

  onDragEnd(e) {
    if (e.target.classList.contains("draggable")) {
      e.target.classList.remove("dragging");

      setTimeout(() => {
        e.target.style.display = "";
        this.draggedItem = null;
      }, 0);
    }
  }

  onDragOver(e) {
    e.preventDefault();
    const afterElement = this.getDragAfterElement(e.clientX);
    const currentItem = this.draggedItem;
    if (afterElement == null) {
      this.sortableList.appendChild(currentItem);
    } else {
      this.sortableList.insertBefore(currentItem, afterElement);
    }
  }

  onDrop(e) {
    e.preventDefault();
    this.sortableList.querySelectorAll(".draggable").forEach((item) => {
      item.style.display = "";
    });
  }

  getDragAfterElement(x) {
    const draggableElements = [
      ...this.sortableList.querySelectorAll(".draggable:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const { left, width } = child.getBoundingClientRect();
        const offset = x - left - width / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
}

// Usage
const sortableList = new SortableList("sortable-list");
