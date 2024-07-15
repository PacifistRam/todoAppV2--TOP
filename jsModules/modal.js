import {
  mainTodoArray,
  renderTodos,
  renderCreatedCategoryList,
} from "./domOperations";
import { savetoLocalStorage } from "./localStorageOperation";
import { createTodo, updateTodo } from "./todoOperation";

export const createModal = (container, category) => {
  const dialog = document.createElement("dialog");
  dialog.appendChild(createTodoForm(category));
  container.appendChild(dialog);
  dialog.showModal();
  // ensures transition to be shown before dialog is created and rendered
  requestAnimationFrame(() => dialog.classList.add("show"));
  return dialog;
};

// modal for update todo form
export const updateTodoModal = (container, category, todo) => {
  const dialog = document.createElement("dialog");
  dialog.appendChild(updateTodoForm(category, todo));
  container.appendChild(dialog);
  dialog.showModal();
  // ensures transition to be shown before dialog is created and rendered
  requestAnimationFrame(() => dialog.classList.add("show"));
  return dialog;
};

export const createUpdateModal = (container, createForm) => {
  const dialog = document.createElement("dialog");
  dialog.appendChild(createForm);
  container.appendChild(dialog);
  dialog.showModal();
  // ensures transition to be shown before dialog is created and rendered
  requestAnimationFrame(() => dialog.classList.add("show"));
  return dialog;
};

export const createTodoForm = (category) => {
  const formHeader = document.createElement("header");
  formHeader.classList.add("todo-form-header");
  const todoForm = document.createElement("form");
  todoForm.classList.add("todo-form");
  const formFooter = document.createElement("footer");
  formFooter.classList.add("todo-form-footer");
  const formSection = document.createElement("section");
  formSection.classList.add("todo-form-section");

  const closeIcon = document.createElement("i");
  closeIcon.classList.add("fa-solid", "fa-xmark");
  closeIcon.style.color = "#ff0000";

  const headerTitle = document.createElement("h3");
  headerTitle.textContent = "Add Todo";
  formHeader.append(headerTitle, closeIcon);
  const footerTitle = document.createElement("h3");
  formFooter.append(footerTitle);

  const LabelTitle = document.createElement("label");
  LabelTitle.setAttribute("for", "todo-title");
  LabelTitle.textContent = "Title:";
  const inputTitle = document.createElement("input");
  inputTitle.setAttribute("id", "todo-title");
  inputTitle.type = "text";

  const LabelNote = document.createElement("label");
  LabelNote.setAttribute("for", "todo-note");
  LabelNote.textContent = "Note:";
  const textNote = document.createElement("textarea");
  textNote.setAttribute("id", "todo-note");
  textNote.maxLength = 2000;
  textNote.cols = 10;
  textNote.rows = 2;

  const LabelPriority = document.createElement("label");
  LabelPriority.setAttribute("for", "todo-priority");
  LabelPriority.textContent = "Priority:";
  const selectPriority = document.createElement("select");
  selectPriority.setAttribute("id", "todo-priority");
  const options = ["Low", "Medium", "High"];
  options.forEach((optionText) => {
    const option = document.createElement("option");
    option.value = optionText;
    option.textContent = optionText;
    selectPriority.appendChild(option);
  });

  const LabelDueDate = document.createElement("label");
  LabelDueDate.setAttribute("for", "todo-due-date");
  LabelDueDate.textContent = "Due Date:";
  const inputDueDate = document.createElement("input");
  inputDueDate.setAttribute("id", "todo-due-date");
  inputDueDate.type = "date";

  const SubmitTodo = document.createElement("input");
  SubmitTodo.type = "submit";
  SubmitTodo.value = "Submit";
  SubmitTodo.classList.add("todo-form-btn");

  formSection.append(
    LabelTitle,
    inputTitle,
    LabelNote,
    textNote,
    LabelPriority,
    selectPriority,
    LabelDueDate,
    inputDueDate
  );

  formFooter.append(SubmitTodo);

  todoForm.append(formHeader, formSection, formFooter);

  // event listeners
  closeIcon.addEventListener("click", () => {
    const dialog = closeIcon.closest("dialog");
    // Find the container of the dialog
    const container = dialog.parentElement;
    // Remove the dialog from its container

    requestAnimationFrame(() => dialog.classList.remove("show"));
    container.removeChild(dialog);
  });

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("submit pressed");
    const addTodoTitle = inputTitle.value;
    const addTodoNote = textNote.value;
    const addTodoPriority = selectPriority.value;
    const addTodoDueDate = inputDueDate.value;

    if (formCheck(addTodoTitle, addTodoNote, addTodoDueDate)) {
      createTodo(
        category,
        mainTodoArray,
        addTodoTitle,
        addTodoNote,
        addTodoPriority,
        addTodoDueDate
      );
      renderTodos(category, mainTodoArray);
      todoForm.reset();
    } else {
      console.log("data not found");
    }
  });

  return todoForm;
};

// update to form
export const updateTodoForm = (category, todo) => {
  const formHeader = document.createElement("header");
  formHeader.classList.add("todo-form-header");
  const todoForm = document.createElement("form");
  todoForm.classList.add("todo-form");
  const formFooter = document.createElement("footer");
  formFooter.classList.add("todo-form-footer");
  const formSection = document.createElement("section");
  formSection.classList.add("todo-form-section");

  const closeIcon = document.createElement("i");
  closeIcon.classList.add("fa-solid", "fa-xmark");
  closeIcon.style.color = "#ff0000";

  const headerTitle = document.createElement("h3");
  headerTitle.textContent = "Update Todo";
  formHeader.append(headerTitle, closeIcon);
  const footerTitle = document.createElement("h3");
  formFooter.append(footerTitle);

  const LabelTitle = document.createElement("label");
  LabelTitle.setAttribute("for", "todo-title");
  LabelTitle.textContent = "Title:";
  const inputTitle = document.createElement("input");
  inputTitle.setAttribute("id", "todo-title");
  inputTitle.type = "text";

  const LabelNote = document.createElement("label");
  LabelNote.setAttribute("for", "todo-note");
  LabelNote.textContent = "Note:";
  const textNote = document.createElement("textarea");
  textNote.setAttribute("id", "todo-note");
  textNote.maxLength = 2000;
  textNote.cols = 10;
  textNote.rows = 2;

  const LabelPriority = document.createElement("label");
  LabelPriority.setAttribute("for", "todo-priority");
  LabelPriority.textContent = "Priority:";
  const selectPriority = document.createElement("select");
  selectPriority.setAttribute("id", "todo-priority");
  const options = ["Low", "Medium", "High"];
  options.forEach((optionText) => {
    const option = document.createElement("option");
    option.value = optionText;
    option.textContent = optionText;
    selectPriority.appendChild(option);
  });

  const LabelDueDate = document.createElement("label");
  LabelDueDate.setAttribute("for", "todo-due-date");
  LabelDueDate.textContent = "Due Date:";
  const inputDueDate = document.createElement("input");
  inputDueDate.setAttribute("id", "todo-due-date");
  inputDueDate.type = "date";

  const updateTodoButton = document.createElement("input");
  updateTodoButton.type = "submit";
  updateTodoButton.value = "Update";
  updateTodoButton.classList.add("todo-form-btn");

  formSection.append(
    LabelTitle,
    inputTitle,
    LabelNote,
    textNote,
    LabelPriority,
    selectPriority,
    LabelDueDate,
    inputDueDate
  );

  formFooter.append(updateTodoButton);

  todoForm.append(formHeader, formSection, formFooter);

  // event listeners
  closeIcon.addEventListener("click", () => {
    const dialog = closeIcon.closest("dialog");
    // Find the container of the dialog
    const container = dialog.parentElement;
    // Remove the dialog from its container

    requestAnimationFrame(() => dialog.classList.remove("show"));
    container.removeChild(dialog);
  });
  //  update form with values from the already created todo
  inputTitle.value = todo.title;
  textNote.value = todo.note;
  selectPriority.value = todo.priority;
  inputDueDate.value = todo.dueDate;

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("update pressed");
    const addTodoTitle = inputTitle.value;
    const addTodoNote = textNote.value;
    const addTodoPriority = selectPriority.value;
    const addTodoDueDate = inputDueDate.value;

    if (formCheck(addTodoTitle, addTodoNote, addTodoDueDate)) {
      updateTodo(
        category,
        mainTodoArray,
        todo.id,
        addTodoTitle,
        addTodoNote,
        addTodoPriority,
        addTodoDueDate
      );
      renderTodos(category, mainTodoArray);
      todoForm.reset();
    } else {
      console.log("data not found");
    }
  });

  return todoForm;
};

const formCheck = (title, note, dueDate) => {
  if (!title || !note || !dueDate) {
    console.log("todo Form Empty");
  } else return true;
};

export const updateCategoryForm = (categoryName) => {
  const formHeader = document.createElement("header");
  formHeader.classList.add("category-form-header");
  const updateCategoryForm = document.createElement("form");
  updateCategoryForm.classList.add("category-form");
  const formSection = document.createElement("section");
  formSection.classList.add("category-form-section");

  const closeIcon = document.createElement("i");
  closeIcon.classList.add("fa-solid", "fa-xmark");
  closeIcon.style.color = "#ff0000";

  closeIcon.addEventListener("click", () => {
    const dialog = updateCategoryForm.closest("dialog");
    if (dialog) {
      requestAnimationFrame(() => dialog.classList.remove("show"));
      dialog.remove();
    }
  });

  const headerTitle = document.createElement("h3");
  headerTitle.textContent = "Update Category";
  formHeader.append(headerTitle, closeIcon);

  const LabelCategoryName = document.createElement("label");
  LabelCategoryName.setAttribute("for", "category-name");
  LabelCategoryName.textContent = "Category:";
  const inputCategoryName = document.createElement("input");
  inputCategoryName.setAttribute("id", "category-name");
  inputCategoryName.type = "text";
  inputCategoryName.value = categoryName;

  const updateCategory = document.createElement("input");
  updateCategory.type = "submit";
  updateCategory.value = "Update";
  updateCategory.classList.add("update-form-btn");

  formSection.append(LabelCategoryName, inputCategoryName, updateCategory);
  updateCategoryForm.append(formHeader, formSection);
  updateCategoryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    mainTodoArray.forEach((category) => {
      if (category.categoryName === categoryName) {
        if (inputCategoryName.value !== "") {
          category.categoryName = inputCategoryName.value;
          savetoLocalStorage(mainTodoArray)
        }
        
        renderCreatedCategoryList(mainTodoArray);
      }
      //  close dialog
      const dialog = updateCategory.closest("dialog");
      if (dialog) {
        requestAnimationFrame(() => dialog.classList.remove("show"));
        dialog.remove(); // This will remove the dialog from the DOM
      }
    });
  });
  return updateCategoryForm;
};
