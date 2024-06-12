import { mainTodoArray,renderTodos } from "./domOperations";
import { createTodo } from "./todoOperation";

export const createModal = (container,category) => {
    const dialog = document.createElement('dialog');
    dialog.appendChild(createTodoForm(category))
    container.appendChild(dialog);
    dialog.showModal();
    return dialog
    
}



export const createTodoForm = (category) => {
    const formHeader = document.createElement('header');
    formHeader.classList.add('todo-form-header');
    const todoForm = document.createElement('form');
    todoForm.classList.add('todo-form');
    const formFooter = document.createElement('footer');
    formFooter.classList.add('todo-form-footer');
    const formSection = document.createElement('section')
    formSection.classList.add('todo-form-section')

    const closeIcon = document.createElement('i');
    closeIcon.classList.add("fa-solid", "fa-xmark")
    closeIcon.style.color = '#ff0000'

    const headerTitle = document.createElement('h3');
    headerTitle.textContent = "Add Todo"
    formHeader.append(headerTitle,closeIcon);
    const footerTitle = document.createElement('h3')
    formFooter.append(footerTitle)

    const LabelTitle = document.createElement('label')
    LabelTitle.setAttribute('for','todo-title')
    LabelTitle.textContent = "Title:"
    const inputTitle = document.createElement('input');
    inputTitle.setAttribute('id','todo-title')
    inputTitle.type = "text"


    const LabelNote = document.createElement('label')
    LabelNote.setAttribute('for','todo-note')
    LabelNote.textContent  = "Note:"
    const textNote = document.createElement('textarea');
    textNote.setAttribute('id','todo-note');
    textNote.maxLength = 2000;
    textNote.cols  = 10;
    textNote.rows = 2;


    const LabelPriority = document.createElement('label')
    LabelPriority.setAttribute('for','todo-priority')
    LabelPriority.textContent  = "Priority:"
    const selectPriority = document.createElement('select');
    selectPriority.setAttribute('id','todo-priority')
    const options = ["Low", "Medium","High"];
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        selectPriority.appendChild(option);
    })
    
    const LabelDueDate = document.createElement('label')
    LabelDueDate.setAttribute('for','todo-due-date')
    LabelDueDate.textContent  = "Due Date:"
    const inputDueDate = document.createElement('input');
    inputDueDate.setAttribute('id','todo-due-date');
    inputDueDate.type = "date"


    const SubmitTodo = document.createElement('input');
    SubmitTodo.type = 'submit';
    SubmitTodo.value = "Submit"
    SubmitTodo.classList.add('todo-form-btn')

    formSection.append(LabelTitle,inputTitle,LabelNote,textNote,LabelPriority,selectPriority,LabelDueDate,inputDueDate)

    formFooter.append(SubmitTodo);

    todoForm.append(formHeader,formSection,formFooter);

    // event listeners
    closeIcon.addEventListener('click', () => {
        const dialog = closeIcon.closest('dialog');
        // Find the container of the dialog
        const container = dialog.parentElement;
        // Remove the dialog from its container
        container.removeChild(dialog);
    })

    todoForm.addEventListener("submit", (e) => {
      e.preventDefault();

      console.log("submit pressed");
      const addTodoTitle = inputTitle.value;
      const addTodoNote = textNote.value;
      const addTodoPriority = selectPriority.value;
      const addTodoDueDate = inputDueDate.value;

      if (formCheck(addTodoTitle, addTodoNote, addTodoDueDate)) {
        createTodo(category,mainTodoArray,addTodoTitle,addTodoNote,addTodoPriority,addTodoDueDate);
        renderTodos(category,mainTodoArray)
        todoForm.reset();
      } else {
        console.log("data not found");
      }
    });
    

    return todoForm;
}

const formCheck = (title,note,dueDate) => {
    if(!title || !note || !dueDate) {
        console.log('todo Form Empty')
    }
    else return true
}





// test function call
