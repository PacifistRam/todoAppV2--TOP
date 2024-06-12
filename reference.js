import './style.css'


//Constructor function
function Book(title, author, pages,arrayOfPeople) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.borrowersList = arrayOfPeople
  this.readStatus = false;
  this.info = function () {
    return `${this.title} by ${this.author},${pages} pages ${
      this.readStatus ? "read" : "not read yet"
    }`;
  };
}


//factory function

function book(title, author, pages) {
  return {
    title: title,
    author: author,
    pages: pages,
    readStatus: false,
    info: function () {
      return `${this.title} by ${this.author},${pages} pages ${
        this.readStatus ? "read" : "not read yet"
      }`;
    },
  };
}


const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295); //constructor function call

const harry = book("Harry Potter", "J.k. Rowling", 395); //factory function call
// console.log(hobbit);
// console.log(harry);

// console.log(hobbit.info());
// console.log(harry.info());


// const hobbit2 = new Book("The Hobbit", "J.R.R. Tolkien", 295,['sam','john','miranda','eddy']); //constructor function call
// console.log(hobbit2.borrowersList)

// const newJSON =  JSON.stringify(hobbit2)
// console.log(newJSON);

// const parsedObject = JSON.parse(newJSON)
// console.log(parsedObject)


function book2(title,author,noOfPages) {
  return{
    title:title,
    author:author,
    noOfPages:noOfPages,
  }
}

function bookDetail(book){
  return `${book.title} is written by ${book.author}, containing ${book.noOfPages} pages`
    
}


const openWater = book2("Open Water","Carmilla Azumah","268")

console.log(bookDetail(openWater));


