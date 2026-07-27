
const books = [];

function Book(title = "untitled", author = "unknown", pages = 0, read = false){
    if (!new.target){
        throw Error("You must use the 'new' operator to call the constructor.");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.uniqueID = crypto.randomUUID();
}

const testBook = new Book("The Book", "Ronny Dingus", 32, false);
const testBookMissingValue = new Book();

books.push(testBook);
books.push(testBookMissingValue);

console.log(`Books: ${JSON.stringify(books)}`);

// create an empty table with columns defined by the attributes in Book

const table = document.createElement("table");
table.border = "1"; // for visibility

const bookProperties = Object.getOwnPropertyNames(testBook);

const headerRow = document.createElement("tr");

bookProperties.forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
});
table.appendChild(headerRow);

const row = document.createElement("tr");
table.appendChild(row);

const tableContainer = document.getElementById("table-container");
tableContainer.appendChild(table);


// take an array of Books and a reference to a table element; for each Book, append a row to the table with the book's property values 
function displayBooks(bookArray, table){
    bookArray.forEach((book, i) => {
        const row = document.createElement("tr");
        Object.values(book).forEach((value, i) => {
            const cell = document.createElement("td");
            cell.className = Object.getOwnPropertyNames(book)[i];
            cell.textContent = value;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
}

displayBooks(books, table);

/* 
    allow users to add a new book to Books;
    - add a button to top of page; 
    - on click, present a modal with book form 
    - on submission of form, create a new book object, add to books array and update table
*/

const newBookButton = document.getElementById("newBookButton");
const newBookDialog = document.getElementById("newBookDialog");
const newBookForm = document.getElementById("newBookForm");
const confirmButton = newBookDialog.querySelector("#confirmButton");
const outputBox = document.querySelector("output");


newBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
});

newBookDialog.addEventListener("close", (e) =>{
    outputBox.value = 
        newBookDialog.returnValue === "default" 
            ? "Submitted"
            : `ReturnValue: ${newBookDialog.returnValue}`;
});

function handleForm(form) {
    console.log("Form handling:");
    console.log(form);

    const formElements = form.elements;
    console.log(formElements);

    const formInputs = document.getElementsByClassName("formInput");
    console.log(formInputs[0].id);

    console.log("End of form handling");
}

confirmButton.addEventListener("click", (event) => {
    event.preventDefault();
    newBookDialog.close("Form submitted");
    handleForm(newBookForm);
})



/**
 * allow users to remove books from the table
 * - each row has a button; 
 * - on click, remove that row from the table and display the updated table
 */

/**
 * allow users to change a book's "read" status
 * - each cell in "read" column is clickable
 * - clicking toggles that cell's value between true and false
 */