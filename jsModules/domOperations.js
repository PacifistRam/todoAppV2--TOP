// module import
import { format, lightFormat } from "date-fns";
import { createCategory, createTodo } from "./todoOperation";
import { createModal } from "./modal";

export const mainTodoArray = [];

const createdCategoryContainer = document.querySelector('#created-categories')

const todoContainer = document.querySelector('#todo-container')


export const createCategoryForm = () => {
    const categoryForm = document.createElement('form');
    categoryForm.classList.add('category-form')
    const categoryInput = document.createElement('input')
    categoryInput.type = 'text'
    categoryInput.placeholder = 'category name'

    const addCategory = document.createElement('input');
    addCategory.type = 'submit'
    addCategory.value = "ADD"

    categoryForm.append(categoryInput,addCategory)
    createdCategoryContainer.appendChild(categoryForm)

    //event listener
    categoryForm.addEventListener('submit',(e) => {
        e.preventDefault();
        console.log(categoryInput.value)
        const categoryValue = categoryInput.value;
        if(categoryValue) {
            createCategory(categoryValue,mainTodoArray)
            categoryForm.reset();
            renderCreatedCategoryList(mainTodoArray);
            console.log(mainTodoArray);
        } else {
            console.log('field is empty')
        }

    })
}

const categoryList = (category) => {
    const catList = document.createElement('li');
    catList.classList.add('category-list')
    const catName =document.createElement('span')
    catName.textContent = category
    catList.append(catName,createDeleteButton());
    console.log(category)
    return catList
}

const renderCreatedCategoryList = (mainArray) => {
    //check if if container has previous ul
    const existingUl = createdCategoryContainer.querySelector('ul');
    existingUl && existingUl.remove();

    if(mainArray.length) {
        const categoryUl = document.createElement('ul');
        categoryUl.classList.add('categoryUl')
        //event listeners
        categoryUl.addEventListener('click',(e) => {
            const listItem = e.target.closest('li')
            console.log(listItem);
            if(!listItem) return;
            const span = listItem.querySelector('span')
            const clickedCategory = span.textContent
            const button  = listItem.querySelector('.del-btn')
            if(e.target === span){
                renderTodos(clickedCategory,mainArray)
            }else if(e.target === button) {
                if(e.target.getAttribute("data-action") === "delete button"){
                   handleDelete(mainArray,clickedCategory);
                   renderTodos(clickedCategory,mainArray);
                   renderCreatedCategoryList(mainArray);
                }
            }
            // if(e.target.tagName.toLowerCase() === 'li') {
            //     console.log(e.target.textContent)
            //     const clickedCategory = e.target.textContent
            //     // renderTodos(clickedCategory,mainArray)
            // }else if(e.target.tagName.toLowerCase() === 'button')if(e.target.getAttribute('data-action') === "delete button"){
            //     console.log('pressed delete')
            // }
        })

        mainArray.forEach(element => {
            categoryUl.appendChild(categoryList(element.categoryName))
        });
        createdCategoryContainer.appendChild(categoryUl);
    } else{
        console.log('array is empty')
    }
}

const createAddTodoBtn = (container,category) => {
    const addTodoButton = document.createElement('button');
    const addTodoButtonText = document.createElement('span')
    addTodoButtonText.textContent = 'Add Todo' 
    const addTodoButtonIcon = document.createElement('span')
    addTodoButtonIcon.classList.add("fa-regular","fa-plus","fa-lg")
    addTodoButton.append(addTodoButtonText,addTodoButtonIcon)

    addTodoButton.addEventListener('click',() =>{
        createModal(container,category);
    })
    return addTodoButton;
}

export const renderTodos = (category,mainArray) => {
    const clearTodoContainer = () => {
        while (todoContainer.firstChild) {
            todoContainer.removeChild(todoContainer.firstChild);
        }
    }
    const findCategory = mainArray.find(item => item.categoryName === category);
    if(findCategory) {
        //check if if container has previous div and remove it
        clearTodoContainer()

        if(findCategory.todoArray.length > 0){
            todoContainer.append(createAddTodoBtn(todoContainer,findCategory.categoryName))
            findCategory.todoArray.forEach((todo,_,todoArray) => {
               todoContainer.append(todoCard(todo));
            });
        } else {
            clearTodoContainer();
            console.log("no todos found")
            const initialPara = document.createElement('p')
            initialPara.textContent = `Add Todos for  ${findCategory.categoryName}`
            
            todoContainer.append(initialPara,createAddTodoBtn(todoContainer,findCategory.categoryName) );
        }

    }else{
       clearTodoContainer()
        console.log('no category found')
    }

}

const todoCard = (todo) => {
    // title,note,priority,dueDate
    const todoArticle = document.createElement('div')
    const todoTitle = document.createElement('p');
    const todoNote = document.createElement('p');
    const todoPriority = document.createElement('p');
    const todoDueDate = document.createElement('p');

    todoTitle.textContent = todo.title;
    todoNote.textContent = todo.note;
    todoPriority.textContent = todo.priority;
    todoDueDate.textContent = todo.dueDate;

    todoArticle.append(todoTitle,todoNote,todoPriority,todoDueDate,createDeleteButton());

    return todoArticle;
}

const handleDelete = (mainArray,elementName) => {
    const currentIndex = mainArray.findIndex(item => item.
    categoryName === elementName );
    if(currentIndex !== -1) {
        mainArray.splice(currentIndex,1)
    }
    else {
        console.log(`element ${elementName} not found` )
    }
    
}

const createDeleteButton = () => {
    const delBtn = document.createElement('button');
    delBtn.classList.add('del-btn')
    delBtn.textContent = "DEL"
    delBtn.setAttribute('data-action','delete button')
    return delBtn
}

// renderCreatedCategoryList(mainTodoArray);

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


