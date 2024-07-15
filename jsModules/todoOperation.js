// module Import

import { category, todos } from "./todoObjects";
import {savetoLocalStorage} from "./localStorageOperation";


import {format} from "date-fns"

const categoryCheck = (category, mainArray) => {
  return mainArray.some(
    (cat) => cat.categoryName.toLowerCase() === category.toLowerCase()
  );
};

export const createCategory = (todoCategory, mainArray) => {
  if (categoryCheck(todoCategory, mainArray)) {
    console.log("category Already exists");
  } else {
    const newCategory = category(todoCategory);
    mainArray.push(newCategory);
    savetoLocalStorage(mainArray);
  }
};

export const createTodo = (
  category,
  mainArray,
  title,
  note,
  priority,
  dueDate
) => {
  const existedCategory = mainArray.find(
    (cat) => cat.categoryName === category
  );
  if (existedCategory) {
    const createdTodo = todos(title, note, priority, dueDate);
    existedCategory.todoArray.push(createdTodo);
    savetoLocalStorage(mainArray);
  } else {
    console.log("category was not found");
  }
};

export const updateTodo = (
  category,
  mainArray,
  todoId,
  title,
  note,
  priority,
  dueDate
) => {
  const existedCategory = mainArray.find(
    (cat) => cat.categoryName === category
  );
  if (existedCategory) {
    const existedTodo = existedCategory.todoArray.find(
      (todo) => todo.id === todoId
    );
    if (existedTodo) {
      existedTodo.title = title;
      existedTodo.updatedDate = format(new Date(),"yyyy/MM/dd");
      existedTodo.note = note;
      existedTodo.priority = priority;
      existedTodo.dueDate = dueDate; 
    }
    savetoLocalStorage(mainArray)
  }
};

// test function calls
