
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

console.log(`Test book: ${testBook}`);

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