// module import
import { format, lightFormat,differenceInDays } from "date-fns";
import { createCategory, createTodo } from "./todoOperation";
import { createModal, createUpdateModal, updateCategoryForm,updateTodoModal } from "./modal";
import { savetoLocalStorage, getFromLocalStorage } from "./localStorageOperation";


export const mainTodoArray = getFromLocalStorage();

const createdCategoryContainer = document.querySelector("#created-categories");

const todoContainer = document.querySelector("#todo-container");

export const createCategoryForm = () => {
  const categoryForm = document.createElement("form");
  categoryForm.classList.add("category-form");
  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.placeholder = "category name";

  const addCategory = document.createElement("input");
  addCategory.type = "submit";
  addCategory.value = "ADD";
  const errorMessage = document.createElement("p");
  errorMessage.style.color = "red";
  errorMessage.textContent = "";

  categoryForm.append(categoryInput, addCategory, errorMessage);
  createdCategoryContainer.appendChild(categoryForm);

  //event listener
  categoryInput.addEventListener(
    "input",
    () => (errorMessage.textContent = "")
  );
  categoryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(categoryInput.value);
    const categoryValue = categoryInput.value.trim();
    errorMessage.style.opacity = 0;
    // define regex pattern
    const regex =
      /^[^0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\\/]*[a-zA-Z][^!@#$%^&*()_+={}\[\]:;"'<>,.?\\/]*$/;
    if (categoryValue && regex.test(categoryValue)) {
      createCategory(categoryValue, mainTodoArray);
      categoryForm.reset();
      renderCreatedCategoryList(mainTodoArray);
      console.log(mainTodoArray);
    } else {
      if (!categoryValue) {
        errorMessage.textContent = "*Category name is empty";
        console.log("field is empty");
      } else if (!regex.test(categoryValue)) {
        errorMessage.textContent = "*invalid category name";
        console.log("invalid category name");
      }

      errorMessage.style.opacity = 1;
    }
  });
};

const categoryList = (category) => {
  const catList = document.createElement("li");
  catList.classList.add("category-list");
  const catName = document.createElement("span");
  catName.textContent = category;
  catList.append(catName, createUpdateButton(), createDeleteButton());
  console.log(category);
  return catList;
};

export const renderCreatedCategoryList = (mainArray) => {
  //check if if container has previous ul
  const existingUl = createdCategoryContainer.querySelector("ul");
  existingUl && existingUl.remove();

  if (mainArray.length) {
    const categoryUl = document.createElement("ul");
    categoryUl.classList.add("categoryUl");
    //event listeners
    categoryUl.addEventListener("click", (e) => {
      const listItem = e.target.closest("li");
      console.log(listItem);
      if (!listItem) return;
      const span = listItem.querySelector("span");
      const clickedCategory = span.textContent;
      const delButton = listItem.querySelector(".del-btn");
      if (e.target === span) {
        renderTodos(clickedCategory, mainArray);
      } else if (e.target === delButton) {
        if (e.target.getAttribute("data-action") === "delete button") {
          handleDelete(mainArray, clickedCategory);
          renderTodos(clickedCategory, mainArray);
          renderCreatedCategoryList(mainArray);
        }
      } else if (e.target.dataset.action === "update button") {
        createUpdateModal(
          createdCategoryContainer,
          updateCategoryForm(clickedCategory)
        );
      }
      // if(e.target.tagName.toLowerCase() === 'li') {
      //     console.log(e.target.textContent)
      //     const clickedCategory = e.target.textContent
      //     // renderTodos(clickedCategory,mainArray)
      // }else if(e.target.tagName.toLowerCase() === 'button')if(e.target.getAttribute('data-action') === "delete button"){
      //     console.log('pressed delete')
      // }
    });

    mainArray.forEach((element) => {
      categoryUl.appendChild(categoryList(element.categoryName));
    });
    createdCategoryContainer.appendChild(categoryUl);
  } else {
    console.log("array is empty");
  }
};

const createAddTodoBtn = (container, category) => {
  const addTodoButton = document.createElement("button");
  const addTodoButtonText = document.createElement("span");
  addTodoButtonText.textContent = "Add Todo";
  const addTodoButtonIcon = document.createElement("span");
  addTodoButtonIcon.classList.add("fa-regular", "fa-plus", "fa-lg");
  addTodoButton.append(addTodoButtonText, addTodoButtonIcon);

  addTodoButton.addEventListener("click", () => {
    createModal(container, category);
  });
  return addTodoButton;
};

export const renderTodos = (category, mainArray) => {
  const clearTodoContainer = () => {
    while (todoContainer.firstChild) {
      todoContainer.removeChild(todoContainer.firstChild);
    }
  };
  const findCategory = mainArray.find((item) => item.categoryName === category);
  if (findCategory) {
    //check if if container has previous div and remove it
    clearTodoContainer();

    if (findCategory.todoArray.length > 0) {
      todoContainer.append(
        createAddTodoBtn(todoContainer, findCategory.categoryName)
      );
      findCategory.todoArray.forEach((todo, _, todoArray) => {
        todoContainer.append(todoCard(todo, findCategory.categoryName));
      });
    } else {
      clearTodoContainer();
      console.log("no todos found");
      const initialPara = document.createElement("p");
      initialPara.textContent = `Add Todos for  ${findCategory.categoryName}`;

      todoContainer.append(
        initialPara,
        createAddTodoBtn(todoContainer, findCategory.categoryName)
      );
    }
  } else {
    clearTodoContainer();
    console.log("no category found");
  }
};

const todoCard = (todo, currCategoryName) => {
  // title,note,priority,dueDate
  const todoArticle = document.createElement("div");
  todoArticle.classList.add("todo-article");
  const todoIsCompleted = document.createElement("input");
  todoIsCompleted.type = "checkbox";
  todoIsCompleted.setAttribute("id", `todo-check-${todo.id}`);
  const todoTitle = document.createElement("span");
  const todoNote = document.createElement("p");
  const todoPriority = document.createElement("p");
  const todoDueDate = document.createElement("p");
  const todoDaysLeft = document.createElement("p");

  todoTitle.textContent = todo.title;
  todoNote.textContent = todo.note;
  todoPriority.textContent = todo.priority;
  todoDueDate.textContent = todo.dueDate;

  // calculate days left dynamically
  const daysLeft = differenceInDays(new Date(todo.dueDate), format(new Date(),"yyyy/MM/dd"))

  todoDaysLeft.textContent = `${daysLeft} day${
    daysLeft > 1 ? "s" : ""
  } left`;

  // check or uncheck checkbox based on isCompleted property and set style
  todoIsCompleted.checked = todo.isCompleted;
  if (todo.isCompleted) {
    todoTitle.style.textDecoration = "line-through";

    if (!todoArticle.classList.contains("greyed-out")) {
      todoArticle.classList.add("greyed-out");
    }
  } else {
    todoTitle.style.textDecoration = "none";

    if (todoArticle.classList.contains("greyed-out")) {
      todoArticle.classList.remove("greyed-out");
    }
  }

  todoArticle.append(
    todoIsCompleted,
    todoTitle,
    todoNote,
    todoPriority,
    todoDueDate,
    todoDaysLeft,
    createUpdateButton(),
    createDeleteButton()
  );
  todoArticle.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      if (e.target.dataset.action === "delete button") {
        deleteTodo(currCategoryName, todo.id);
        renderTodos(currCategoryName, mainTodoArray);
      }else if(e.target.dataset.action === "update button"){
        updateTodoModal(todoContainer, currCategoryName,todo)
      }
    } else if (e.target === todoTitle || e.target === todoIsCompleted) {
      todoIsCompleted.checked = !todoIsCompleted.checked;
      handleIsCompleted(currCategoryName, todo.id);
      renderTodos(currCategoryName, mainTodoArray);
    }
  });
  return todoArticle;
};

const handleDelete = (mainArray, elementName) => {
  const currentIndex = mainArray.findIndex(
    (item) => item.categoryName === elementName
  );
  if (currentIndex !== -1) {
    mainArray.splice(currentIndex, 1);
    savetoLocalStorage(mainArray);
  } else {
    console.log(`element ${elementName} not found`);
  }
};

const createDeleteButton = () => {
  const delBtn = document.createElement("button");
  delBtn.classList.add("del-btn");
  delBtn.textContent = "DEL";
  delBtn.setAttribute("data-action", "delete button");
  return delBtn;
};
const createUpdateButton = () => {
  const updateBtn = document.createElement("button");
  updateBtn.classList.add("update-btn");
  updateBtn.textContent = "Update";
  updateBtn.setAttribute("data-action", "update button");
  return updateBtn;
};
const deleteTodo = (categoryName, todoID) => {
  const findCategory = mainTodoArray.find(
    (item) => item.categoryName === categoryName
  );
  if (findCategory) {
    const todoArray = findCategory.todoArray;
    const todoIndex = todoArray.findIndex((todo) => todo.id === todoID);
    if (todoIndex != -1) {
      todoArray.splice(todoIndex, 1);
      savetoLocalStorage(mainTodoArray);
      console.log("todo deleted");
    } else console.log("todo not found");
  } else console.log("category was not found");
};

const handleIsCompleted = (categoryName, todoID) => {
  const findCategory = mainTodoArray.find(
    (item) => item.categoryName === categoryName
  );
  if (findCategory) {
    const todoArray = findCategory.todoArray;
    todoArray.forEach((todo) => {
      if (todo.id === todoID) {
        todo.isCompleted = !todo.isCompleted;
        savetoLocalStorage(mainTodoArray);
      }
    });
  }
};

export const initialLoad = () => {
  createCategoryForm()
  renderCreatedCategoryList(mainTodoArray);
}


// test function calls

// createModal(todoContainer);
// createCategory('shopping',mainTodoArray);
// createCategory('going gym',mainTodoArray);
// createCategory('car washing',mainTodoArray);

// createTodo('shopping',mainTodoArray,'buy clothes','buy pants and shirts','moderate','2024/06/15')
// createTodo('going gym',mainTodoArray,'leg day','hit the calfs','low','2024/06/20')

// console.log(mainTodoArray)

// renderTodos('shopping',mainTodoArray);

// setTimeout(() => {
//     renderTodos('going gym',mainTodoArray);
// }, 3000);
// setTimeout(() => {
//     renderTodos('going Home',mainTodoArray);
// }, 3000);
