
const books = [];

function Book(title, author, pages, read){
    if (!new.target){
        throw Error("You must use the 'new' operator to call the constructor.");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.uniqueID = crypto.randomUUID();
}

// instance of Book object used to create table headers 
const testBook = new Book("The Book", "Ronny Dingus", 32, false);

books.push(testBook);




// create an empty table with columns defined by the attributes in Book

function createTableHeaders(bookObject) {
    const table = document.createElement("table");
    table.border = "1"; // for visibility
    table.id = "bookTable";

    const bookProperties = Object.getOwnPropertyNames(bookObject);

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

    return table;
}

// take an array of Books and a reference to a table element; for each Book, append a row to the table with the book's property values 
function displayBooks(bookArray, table){

    bookArray.forEach((book, i) => {
        const row = document.createElement("tr");
        row.className = "bookRow";
        Object.values(book).forEach((value, i) => {
            const cell = document.createElement("td");
            const bookProperty = Object.getOwnPropertyNames(book)[i];
            // each row has the same ID as the book it represents
            if (bookProperty == "uniqueID") {row.id = value};
            cell.className = bookProperty;
            cell.textContent = value;
            row.appendChild(cell);
            
        });
        const removeButtonCell = document.createElement("td");
        removeButtonCell.textContent = "Remove";
        row.addEventListener("click", (event) => {
            handleRowClick(event);
        });
        row.appendChild(removeButtonCell);
        table.appendChild(row);
    });
}

// *** add a dialog to ask users to confirm before removing
function handleRowClick(event) {
    console.log(event.target.textContent);
    console.log(event.currentTarget);
    if (event.target.textContent == "Remove"){
        removeRow(event.currentTarget.id);
    }
}

function removeRow(rowId){
    console.log(`Removing row ${rowId}`);
    document.getElementById(rowId).remove();

    const objectIndex = books.findIndex(book => book.uniqueID === rowId);

    console.log(`Object found at index ${objectIndex}: ${books[objectIndex]}`);
    books.splice(objectIndex, 1);
    console.log(books);
    
}


function createTable(bookObject, bookArray){
    const table = createTableHeaders(bookObject);
    displayBooks(bookArray, table);
}

createTable(testBook, books);


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
const clearFormButton = document.getElementById("clearFormButton");

clearFormButton.addEventListener("click", () => {
    newBookForm.reset();
});

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

    const formInputs = document.getElementsByClassName("formInput");
    console.log(formInputs[0].id);

    if (formInputs.length !== Book.length){
        console.error("Number of form inputs does not match number of arguments passed to Book constructor");
    }

    let formValues = [];

    for(let i = 0; i < formInputs.length; i++){
        switch (true){
            case formInputs[i].type == "checkbox":
                formValues.push(formInputs[i].checked);
                break;
            case formInputs[i].value == "":
                formValues.push("Unknown");
                break;
            default:
                formValues.push(formInputs[i].value);
        }
        
    }


 
    const newBook = new Book(...formValues);
    books.push(newBook);
}

confirmButton.addEventListener("click", (event) => {
    event.preventDefault();
    newBookDialog.close("Form submitted");

    handleForm(newBookForm);
    const table = document.getElementById("bookTable");
    table.remove();
    createTable(testBook, books);
    newBookForm.reset();
});



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