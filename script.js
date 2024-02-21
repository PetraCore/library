const myLibrary = [
    {
        title: 'The Hobbit',
        author: 'J. R. R. Tolkien',
        read: true,
        pages: 300,
    },
    {
        title: 'The Last Wish',
        author: 'Andrzej Sapkowski',
        read: true,
        pages: 384,
    },
    {
        title: 'Surely You\'re Joking, Mr. Feynman!',
        author: 'Ralph Leighton and Richard Feynman',
        read: true,
        pages: 400,
    },
    {
        title: 'A Short History of Nearly Everything',
        author: 'Bill Bryson',
        read: false,
        pages: 544,
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
    myLibrary.push(book);
}

function generateLibraryHTML() {
    htmlCode = '';

    myLibrary.forEach(book => {
        nodeCode = `
            <div class="book">
                <div class="options">

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
        htmlCode += nodeCode;
    });

    return htmlCode;
}

function loadLibrary() {
    const libraryContainer = document.querySelector('#library');
    libraryContainer.innerHTML = generateLibraryHTML();
}

loadLibrary();