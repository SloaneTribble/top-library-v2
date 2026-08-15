
const books = [];

function Book(title, author, pages, read){
    if (!new.target){
        throw Error("You must use the 'new' operator to call the constructor.");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; // (boolean)
    this.uniqueID = crypto.randomUUID();
}

// instance of Book object used to create table headers 
const testBook = new Book("The Book", "Ronny Dangus", 312, false);

// for styling -- delete later
const testBook2 = new Book("Ancient Angles", "Terrellia Burgen", 240, true);

const testBook3 = new Book("Roots of all Perplexities", "Sherrel Sauce Hipster", 1018, true);

books.push(testBook);
books.push(testBook2);
books.push(testBook3);


// create an empty table with columns defined by the attributes in Book

function createTableHeaders(bookObject) {
    const table = document.createElement("table");
    table.border = "1"; // for visibility
    table.id = "book-table";

    const bookProperties = Object.getOwnPropertyNames(bookObject);

    const headerRow = document.createElement("tr");
    headerRow.id = "header-row";

    bookProperties.forEach(text => {
        // users don't need to see the book's ID 
        if(text == "uniqueID"){return;}
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
            if (bookProperty == "uniqueID") {
                row.id = value;
                // no need to create a cell with uniqueID -- users don't need it
                return;
            };
            if (bookProperty == "read"){
                cell.className = `${bookProperty}-${value}`;
            } else {
                cell.className = bookProperty;
            }
            
            cell.textContent = value;
            row.appendChild(cell);
            
        });
        const removeButtonCell = document.createElement("td");
        removeButtonCell.className = "remove-button-cell";
        removeButtonCell.textContent = "Remove";
        row.addEventListener("click", (event) => {
            handleRowClick(event);
        });
        row.appendChild(removeButtonCell);
        table.appendChild(row);
    });
}




function createTable(bookObject, bookArray){
    const table = createTableHeaders(bookObject);
    displayBooks(bookArray, table);
}

createTable(testBook, books);

function resetTable(){
    const table = document.getElementById("book-table");

    if(table){
        table.remove();
    }

    createTable(testBook, books);
}



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

const clearFormButton = document.getElementById("clearFormButton");

clearFormButton.addEventListener("click", () => {
    newBookForm.reset();
});

newBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
});

// const outputBox = document.querySelector("output");
// newBookDialog.addEventListener("close", (e) =>{
//     outputBox.value = 
//         newBookDialog.returnValue === "default" 
//             ? "Submitted"
//             : newBookDialog.returnValue;
// });

function handleForm(form) {

    const formInputs = document.getElementsByClassName("formInput");

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
    newBookDialog.close("New book added.");

    handleForm(newBookForm);
    resetTable();
    newBookForm.reset();
});

function handleRowClick(event) {
    const targetTextContent = event.target.textContent;
    const rowId = event.currentTarget.id;
    if (targetTextContent == "Remove"){
        removeRow(rowId);
    }
    else if (targetTextContent == "true" || targetTextContent == "false"){
        toggleReadStatus(rowId);
    } else{
        return;
    }
}

function findBookIndex(bookArray, uniqueId){
    return bookArray.findIndex(book => book.uniqueID === uniqueId);
}

function removeRow(rowId){
    document.getElementById(rowId).remove();

    const bookIndex = findBookIndex(books, rowId);

    books.splice(bookIndex, 1);

    if(books.length == 0){
        const table = document.getElementById("book-table");
        table.remove();
    }
}

function toggleReadStatus(rowId){
    const bookIndex = findBookIndex(books, rowId);

    const bookReadStatus = books[bookIndex].read;

    books[bookIndex].read = bookReadStatus == true ? false : true;

    resetTable();

}







