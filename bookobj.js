function Book (title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function(){
        return(this.title + ' by '+ this.author + ',' + this.pages + ',' + this.read)
    }
}

const librarySection = document.querySelector("#main-area")
const myLibrary = []

function addBookToLibrary() {
  // do stuff here
}

function displayLibrary(){
	while (librarySection.hasChildNodes()) {
		librarySection.removeChild(librarySection.firstChild);
	}
	myLibrary.forEach(book => createBook(book));
}

function createBook(book){
	const background = document.createElement("div");
	const titleElement = document.createElement("h2");
	const authorElement = document.createElement("p");
	const nameElement = document.createElement("span");
	const pagesElement = document.createElement("p");
	const numberElement = document.createElement("span");
	const modifyElement = document.createElement("div");
	const readElement = document.createElement("button");
	const removeElement = document.createElement("button");

	titleElement.textContent =`${book.title}`;
	authorElement.textContent = "Author: ";
	nameElement.textContent = `${book.author}`;
	pagesElement.textContent = "Pages: ";
	numberElement.textContent = `${book.pages}`;
	readElement.textContent = `${book.read}`;
	removeElement.textContent = "Remove";

	background.classList.add("book");
	titleElement.classList.add("title");
	authorElement.classList.add("author");
	nameElement.classList.add("author-name");
	pagesElement.classList.add("pages");
	numberElement.classList.add("page-number");
	modifyElement.classList.add("modify-book");
	readElement.classList.add("primary-button", "book-read");
	removeElement.classList.add("primary-button", "remove-book");

	readElement.setAttribute("data-index", myLibrary.indexOf(book));
	removeElement.setAttribute("data-index", myLibrary.indexOf(book));

	readElement.addEventListener("click", toggleState);
	removeElement.addEventListener("click", removeBook);

	modifyElement.appendChild(readElement);
	modifyElement.appendChild(removeElement);
	pagesElement.appendChild(numberElement);
	authorElement.appendChild(nameElement);
	background.appendChild(titleElement);
	background.appendChild(authorElement);
	background.appendChild(pagesElement);
	background.appendChild(modifyElement);
	librarySection.appendChild(background);	
}

function removeBook(e){
	const bookIndex = e.target.getAttribute("data-index");
	myLibrary.splice(bookIndex, 1);
	displayLibrary();
}

function toggleState(e){
	const bookIndex = e.target.getAttribute("data-index");
	const readStatus = e.target.textContent === "read" ? "not read" : "read";
	myLibrary[bookIndex].read = readStatus;
	displayLibrary();
}

const showDialog = document.querySelector("#new-book")
const bookDialog = document.querySelector(".book-dialog")
const bookForm = document.querySelector(".form-container")
const closeButton = document.querySelector("#close-button")
const submitButton = document.querySelector("#submit-button")

showDialog.addEventListener('click',() =>{
    bookDialog.showModal()
})

submitButton.addEventListener('click',(e) =>{
    e.preventDefault();
	if (!bookForm.checkValidity()) {
		bookForm.reportValidity();
		return;
	}

    const title = document.querySelector('input[name = "title"]').value.trim()
    const author = document.querySelector('input[name = "author"]').value.trim()
    const pages = document.querySelector('input[name = "pages"]').value.trim()
    const read = document.querySelector('input[name ="read"]:checked').value.trim()

    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
    bookDialog.close()
    bookForm.reset()
    displayLibrary()
})

closeButton.addEventListener("click", (e) => {
    e.preventDefault();
	if (!bookForm.checkValidity()) {
		bookForm.reportValidity();
		return;
	}
	bookDialog.close();
	bookForm.reset();
});