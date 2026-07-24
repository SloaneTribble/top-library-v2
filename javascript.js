
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

const testBook = new Book("The Book", "Ronny Dingus", 32, false);

console.log(`Test book: ${testBook}`);

books.push(testBook);

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


// function to iterate through the Books array and display each on the page via a table


// function to create a Book object from arguments and store it in an array



// function to allow users to add a new book to Books

// function to allow users to remove a book from Books 

// function to change a book's "read" status