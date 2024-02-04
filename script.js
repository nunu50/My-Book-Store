const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function() {
    var readStatus = this.read ? "read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
  };

  this.toggleRead = function() {
    this.read = !this.read;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function displayBooks() {
  var table = document.createElement('table'); // Create a table element

  // Loop through the myLibrary array
  for (var i = 0; i < myLibrary.length; i++) {
    var book = myLibrary[i];
    var row = table.insertRow(); // Insert a new row in the table

    // Insert cells in the row for each book property
    var titleCell = row.insertCell();
    titleCell.textContent = book.title;

    var authorCell = row.insertCell();
    authorCell.textContent = book.author;

    var pagesCell = row.insertCell();
    pagesCell.textContent = book.pages;

    var readCell = row.insertCell();
    readCell.textContent = book.read ? "Read" : "Not Read Yet";

    var removeCell = row.insertCell();
    var removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.addEventListener('click', removeBook.bind(null, i)); // Pass the index as an argument
    removeCell.appendChild(removeButton);

    var toggleCell = row.insertCell();
    var toggleButton = document.createElement('button');
    toggleButton.textContent = "Toggle Read";
    toggleButton.addEventListener('click', book.toggleRead.bind(book));
    toggleCell.appendChild(toggleButton);
  }

  // Append the table to the book-container element on the page
  var container = document.getElementById('book-container');
  container.innerHTML = ''; // Clear the container
  container.appendChild(table);
}

function openForm() {
  var formContainer = document.getElementById('form-container');
  formContainer.classList.remove('hidden');
}

function closeForm() {
  var formContainer = document.getElementById('form-container');
  formContainer.classList.add('hidden');
  document.getElementById('book-form').reset();
}

function addBook(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value);
  const read = document.getElementById('read').checked;

  const book = new Book(title, author, pages, read);
  addBookToLibrary(book);
  displayBooks();
  closeForm();
}

displayBooks();