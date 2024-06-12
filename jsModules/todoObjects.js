//library imports

import {v4 as uuidv4} from 'uuid'

import {format, differenceInDays} from "date-fns"



// Factory functions ---------

// Category factory ----------
export const category = (categoryName) => {
 const id = uuidv4();
 const todoArray = []

 return { id,categoryName,todoArray}
}

//todo factory
export const todos = (title,note,priority,dueDate) => {
  const id = uuidv4();
  const createdDate = format(new Date(),"yyyy/MM/dd");
  const dayDifference = differenceInDays(new Date(dueDate), createdDate)
  
  return{id,title,note,priority,createdDate,dueDate,dayDifference}
}