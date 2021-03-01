const formToggler = document.getElementById('formToggler');
const form = document.getElementById('form');
const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');
const pagesInput = document.getElementById('pagesInput');
const checkboxInput = document.getElementById('readCheckbox');
const bookList = document.getElementById('bookList');

let myBooks = [];

function Book(title = '', author = '', pages = '', read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(event) {
  event.preventDefault();
  if (myBooks.some(({ book }) => book.title === titleInput.value)) {
    alert('Same book');
    return
  }
  
  const book = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    checkboxInput.checked
  );
  
  myBooks.push({ book });
  updateBooks();
  form.reset();
}

function removeBook(event) {
  const title = event.target.parentElement.dataset.title;
  myBooks = myBooks.filter(({ book }) => book.title !== title);

  updateBooks();
}

function toggleReadStatus(event) {
  const title = event.target.parentElement.dataset.title;
  const bookIndex = myBooks.findIndex(({ book }) => book.title === title);
  myBooks[bookIndex].book.read = !myBooks[bookIndex].book.read;

  updateBooks();
}

function updateBooks() {
  bookList.innerHTML = '';
  myBooks.forEach(({ book }) => createBookCard(book));
}

function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.setAttribute('data-title', book.title);

  const bookTitle = document.createElement('h3');
  const bookAuthor = document.createElement('h3');
  const bookPages = document.createElement('p');
  const readStatus = document.createElement('p');

  const removeButton = document.createElement('button');
  removeButton.setAttribute('type', 'button');
  removeButton.innerText = 'Remove book';

  const readButton = document.createElement('button');
  readButton.setAttribute('type', 'button');
  readButton.innerText = book.read ? 'Unread' : 'Read';

  bookCard.classList.add('book-card');
  bookTitle.innerText = `Title: ${book.title}`;
  bookAuthor.innerText = `Author: ${book.author}`;
  bookPages.innerText = `Pages: ${book.pages}`;
  readStatus.innerText = `Read: ${book.read}`;

  bookCard.append(bookTitle);
  bookCard.append(bookAuthor);
  bookCard.append(bookPages);
  bookCard.append(readStatus);
  bookCard.append(removeButton);
  bookCard.append(readButton);
  bookList.append(bookCard);

  removeButton.addEventListener('click', removeBook);
  readButton.addEventListener('click', toggleReadStatus);
}

formToggler.addEventListener('click', function () {
  form.toggleAttribute('hidden');
});

form.addEventListener('submit', function (event) {
  addBookToLibrary(event);
});
