// module Import

import { category,todos } from "./todoObjects";

const categoryCheck = (category,mainArray) => {
    return  mainArray.some(cat => cat.categoryName.toLowerCase() === category.toLowerCase())
  }
  
  
  export const createCategory = (todoCategory, mainArray) => {
    if (categoryCheck(todoCategory, mainArray)) {
      console.log("category Already exists");
    } else {
      const newCategory = category(todoCategory);
      mainArray.push(newCategory);
    }
  };
  
   export const createTodo = (category,mainArray,title,note,priority,dueDate) => {
    const existedCategory = mainArray.find(cat => cat.categoryName === category);
    if(existedCategory) {
      const createdTodo = todos(title,note,priority,dueDate)
      existedCategory.todoArray.push(createdTodo)
    } else{
      console.log('category was not found')
    }
  
  }


  // test function calls

 