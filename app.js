class Book {
    constructor(title, author, numPages, haveRead) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.haveRead = haveRead;
    }
    info() {
        return `${this.title} by ${this.author}, ${this.numPages} pages, ${(this.haveRead) ? 'read' : 'not read yet'}`
    }
}


let myLibrary = [];

function addBookToLibrary(book) {
    myLibrary.push(book);
    storeLibrary();
}

function removeBookFromLibrary(id) {
    myLibrary.splice(id, 1);
    storeLibrary();
}

function storeLibrary() {
    localStorage.setItem('myLibary', JSON.stringify(myLibrary));
}

if(!localStorage.getItem('myLibary')) {
    populateLibary();
  } else {
    myLibrary = JSON.parse(localStorage.getItem('myLibary'));
  }

function populateLibary() {
    myLibrary.push(new Book('The Hobbit', 'J.R.R. Tolkien', 320, false));
    myLibrary.push(new Book('Frankenstein', 'Mary Shelly', 280, true));
    myLibrary.push(new Book('To Kill a Mockingbird', 'Harper Lee', 281, true));
    myLibrary.push(new Book('Dracula', 'Bram Stoker', 418, false));
}


drawLibrary();

// Iterate over the myLibrary array and add items to page
function drawLibrary() {
    const container = document.querySelector('#container');
    // Reset container
    container.innerText = '';

    myLibrary.forEach((book, i) => {
        book.id = i;
        const bookElement = createBookElement(book);
        container.appendChild(bookElement);
    });
}

function createBookElement(book) {

    const bookElement = document.createElement('div');
    bookElement.classList.add('col');

    const card = document.createElement('div');
    card.classList.add('card', 'shadow-sm');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Card top
    const cardTopWrapper = document.createElement('div');
    cardTopWrapper.classList.add('d-flex', 'justify-content-between', 'align-items-center');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.innerText = book.title;
    cardTopWrapper.appendChild(cardTitle);

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.classList.add('btn-close');
    closeBtn.dataset.id = book.id;
    cardTopWrapper.appendChild(closeBtn);
    cardBody.appendChild(cardTopWrapper);

    // Card middle (author)
    const cardAuthor = document.createElement('h6');
    cardAuthor.classList.add('card-subtitle', 'mb-2', 'text-muted');
    cardAuthor.innerText = book.author;
    cardBody.appendChild(cardAuthor);

    // Card bottom
    const cardBottomWrapper = document.createElement('div');
    cardBottomWrapper.classList.add('d-flex', 'justify-content-between', 'align-items-center');

    const formCheck = document.createElement('div');
    formCheck.classList.add('form-check', 'form-switch');

    const readInput = document.createElement('input');
    readInput.classList.add('form-check-input');
    readInput.type = 'checkbox';
    readInput.id = 'flexSwitchCheckDefault';
    readInput.checked = book.haveRead;
    formCheck.appendChild(readInput);

    const readLabel = document.createElement('label');
    readLabel.classList.add('form-check-label');
    readLabel.setAttribute('for', 'flexSwitchCheckDefault');
    readLabel.innerText = 'Read';
    formCheck.appendChild(readLabel);

    cardBottomWrapper.appendChild(formCheck);

    const numPages = document.createElement('small');
    numPages.classList.add('text-muted');
    numPages.innerText = `${book.numPages} pages`
    cardBottomWrapper.appendChild(numPages);
    cardBody.appendChild(cardBottomWrapper);

    // Put cardBody into bookElement
    card.appendChild(cardBody);
    bookElement.appendChild(card);

    // Remove book button
    closeBtn.addEventListener('click', event => {
        const id = event.target.dataset.id;
        removeBookFromLibrary(id);
        drawLibrary();
    })

    // Toggle read checkbox
    readInput.addEventListener('change', event => {
        myLibrary[book.id].haveRead = readInput.checked;
        storeLibrary();
    })

    return bookElement;
}


function submitBook () {
    const title = document.querySelector('#titleInput').value;
    const author = document.querySelector('#authorInput').value;
    const numPages = document.querySelector('#numPagesInput').value;
    const haveRead = document.querySelector('#readCheckbox').checked;

    book = new Book(title, author, numPages, haveRead);
    addBookToLibrary(book);
    drawLibrary();

    // Clear inputs
    document.querySelector('#titleInput').value = '';
    document.querySelector('#authorInput').value = '';
    document.querySelector('#numPagesInput').value = '';
    document.querySelector('#readCheckbox').checked = false;
}


submitBookBtn = document.querySelector('#submitBookBtn');
submitBookBtn.addEventListener('click', submitBook);