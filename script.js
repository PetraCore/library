const myLibrary = [
    {
        title: 'The Hobbit',
        author: 'J. R. R. Tolkien',
        read: true,
        pages: 300,
        id: 0,
    },
    {
        title: 'The Last Wish',
        author: 'Andrzej Sapkowski',
        read: true,
        pages: 384,
        id: 1,
    },
    {
        title: 'Surely You\'re Joking, Mr. Feynman!',
        author: 'Ralph Leighton and Richard Feynman',
        read: true,
        pages: 400,
        id: 2,
    },
    {
        title: 'A Short History of Nearly Everything',
        author: 'Bill Bryson',
        read: false,
        pages: 544,
        id: 3,
    }
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read = false) {
    const book = new Book(title, author, pages, read);
    book.id = myLibrary.length;
    myLibrary.push(book);

    return book;
}

function assignBookIDs() {
    const loadedBooks = document.querySelectorAll('.book');

    for (let i = 0; i < myLibrary.length; i++) {
        myLibrary[i].id = i;
        loadedBooks[i].dataset.id = i;
    }
}

function removeBookFromLibrary(event) {
    const book = event.target.closest('.book');
    const id = book.dataset.id;

    book.remove();
    myLibrary.splice(id, 1);

    assignBookIDs();
};

function toggleBookStatus(event) {
    const bookElement = event.target.closest('.book');
    const id = bookElement.dataset.id;
    const flippedReadState = !myLibrary[id].read;
    myLibrary[id].read = flippedReadState;

    bookStatusElement = bookElement.querySelector('.status');
    if(flippedReadState) {
        bookStatusElement.innerHTML = 'read';
    } else {
        bookStatusElement.innerHTML = 'unread';
    }

    bookElement.classList.toggle('read');
    bookElement.querySelector('.options').innerHTML 
    = generateBookOptionsHTML(flippedReadState);

    activateBookButtons(bookElement);
}

function generateBookOptionsHTML(isBookRead) {
    return `
        <svg class="deleteBookBtn" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2M9.879 8.464a1 1 0 0 0-1.498 1.32l.084.095l2.12 2.12l-2.12 2.122a1 1 0 0 0 1.32 1.498l.094-.083L12 13.414l2.121 2.122a1 1 0 0 0 1.498-1.32l-.083-.095L13.414 12l2.122-2.121a1 1 0 0 0-1.32-1.498l-.095.083L12 10.586z"/></g></svg>
        ${isBookRead ?
            '<svg class="toggleBookStatusBtn" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M3.05 9.31a1 1 0 1 1 1.914-.577c2.086 6.986 11.982 6.987 14.07.004a1 1 0 1 1 1.918.57a9.509 9.509 0 0 1-1.813 3.417L20.414 14A1 1 0 0 1 19 15.414l-1.311-1.311a9.116 9.116 0 0 1-2.32 1.269l.357 1.335a1 1 0 1 1-1.931.518l-.364-1.357c-.947.14-1.915.14-2.862 0l-.364 1.357a1 1 0 1 1-1.931-.518l.357-1.335a9.118 9.118 0 0 1-2.32-1.27l-1.31 1.312A1 1 0 0 1 3.585 14l1.275-1.275c-.784-.936-1.41-2.074-1.812-3.414Z"/></g></svg>'
            :
            '<svg class="toggleBookStatusBtn" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 5c3.679 0 8.162 2.417 9.73 5.901c.146.328.27.71.27 1.099c0 .388-.123.771-.27 1.099C20.161 16.583 15.678 19 12 19c-3.679 0-8.162-2.417-9.73-5.901C2.124 12.77 2 12.389 2 12c0-.388.123-.771.27-1.099C3.839 7.417 8.322 5 12 5m0 3a4 4 0 1 0 0 8a4 4 0 0 0 0-8m0 2a2 2 0 1 1 0 4a2 2 0 0 1 0-4"/></g></svg>'
        }
    `;
}

function generateBookHTML(book) {
    return `
        <div class="card book ${book.read ? 'read' : ''}" data-id="${book.id}">
            <div class="options">
                ${generateBookOptionsHTML(book.read)}
            </div>
            <div class="title">
                ${book.title}
            </div>
            <div class="author">
                ${book.author}
            </div>
            <div class="status">
                ${book.read ? 'read' : 'unread'} 
            </div>
            <div class="pages">
                ${book.pages} pages
            </div>
        </div>
    `;
}

function generateBookCreatorHTML() {
    return `
        <div class="card openBookCreatorBtn" id="openBookCreatorBtn">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4v4a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-4H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h4zm4 0h-2v5a1 1 0 0 1-1 1H5v2h5a1 1 0 0 1 1 1v5h2v-5a1 1 0 0 1 1-1h5v-2h-5a1 1 0 0 1-1-1z"/></g></svg>
        </div>

        <dialog class="bookCreator" id="bookCreator">
            <form id="bookCreatorForm" class="card" method="dialog">
                <div class="options">
                    <svg id="closeBookCreatorBtn" class="closeBookCreatorBtn" xmlns="http://www.w2.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2M9.879 8.464a1 1 0 0 0-1.498 1.32l.084.095l2.12 2.12l-2.12 2.122a1 1 0 0 0 1.32 1.498l.094-.083L12 13.414l2.121 2.122a1 1 0 0 0 1.498-1.32l-.083-.095L13.414 12l2.122-2.121a1 1 0 0 0-1.32-1.498l-.095.083L12 10.586z" /></g></svg>
                </div>
                <div class="inputWrapper">
                    <label for="title">Title</label>
                    <input type="text" name="title" id="title" placeholder="Crime and Punishment" required>
                </div>
                <div class="inputWrapper">
                    <label for="author">Author</label>
                    <input type="text" name="author" id="author" placeholder="Fyodor Dostoevsky" required>
                </div>
                <div class="inputWrapper">
                    <label for="pages">Pages</label>
                    <input type="number" name="pages" id="pages" min="0" placeholder="671" required>
                </div>
                <div class="inputWrapper">
                    <label for="read">I finished reading the book</label>
                    <input type="checkbox" name="read" id="read">
                </div>
                <button>Add book</button>
            </form>
        </dialog>
    `;
}

function generateLibraryHTML() {
    htmlCode = '';

    myLibrary.forEach(book => {
        htmlCode += generateBookHTML(book);
    });

    htmlCode += generateBookCreatorHTML();

    return htmlCode;
}

function activateBookButtons(book) {
    const deleteBookBtn = book.querySelector('.deleteBookBtn');
    deleteBookBtn.addEventListener('click', removeBookFromLibrary);

    const toggleBookStatusBtn = book.querySelector('.toggleBookStatusBtn');
    toggleBookStatusBtn.addEventListener('click', toggleBookStatus);
}

function activateLibraryButtons() {
    const bookCreator = document.querySelector('#bookCreator');
    const openBookCreatorBtn = document.querySelector('#openBookCreatorBtn');
    const closeBookCreatorBtn = document.querySelector('#closeBookCreatorBtn');
    const bookCreatorForm = document.querySelector('#bookCreatorForm');

    openBookCreatorBtn.addEventListener('click', () => {
        bookCreator.showModal();
    });

    closeBookCreatorBtn.addEventListener('click', () => {
        bookCreator.close();
    });

    bookCreatorForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const pages = document.querySelector('#pages').value;
        const read = document.querySelector('#read').checked;

        const book = addBookToLibrary(title, author, pages, read);
        openBookCreatorBtn.insertAdjacentHTML('beforebegin', generateBookHTML(book));

        const bookElement = document.querySelector('.book:has(+#openBookCreatorBtn)');
        activateBookButtons(bookElement);

        bookCreatorForm.reset();
        bookCreator.close(); 
    });

    const books = document.querySelectorAll('.book');
    books.forEach(book => {
        activateBookButtons(book);
    });
}

function loadLibrary() {
    const libraryContainer = document.querySelector('#library');
    libraryContainer.innerHTML = generateLibraryHTML();
    activateLibraryButtons();
}

loadLibrary();