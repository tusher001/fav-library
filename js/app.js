console.log('Welcome to T Library');

//Constructor
function Book(name, author, type){
    this.name = name;
    this.author = author;
    this.type = type;
}

//Display Constructor
function Display(){

}

//Save in the local storage
Display.prototype.store = function (book){
    let books = localStorage.getItem('books');
    if (books == null) {
        booksObj = [];
    }
    else{
        booksObj = JSON.parse(books);
    }
    let myObj = {
        name: book.name,
        author: book.author,
        type: book.type
    };
    booksObj.push(myObj);
    localStorage.setItem('books', JSON.stringify(booksObj));
}

//Delete function
function myFunc(index){
    let books = localStorage.getItem('books');
    if (books == null) {
        booksObj = [];
    }
    else{
        booksObj = JSON.parse(books);
    }
    booksObj.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(booksObj));
    Display.prototype.add();
}

//Add method to display prototype
Display.prototype.add = function(){
    let books = localStorage.getItem('books');
    if (books == null) {
        booksObj =[];
    }
    else{
        booksObj = JSON.parse(books);
    }
    let addedBody ='';
    booksObj.forEach(function (element, index) {
        addedBody += `<tr>
                        <td>${element.name}</td>
                        <td>${element.author}</td>
                        <td>${element.type}</td>
                        <td><button onclick=myFunc(${index}) type="button" class="btn btn-danger">Delete</button></td>
                      </tr>`;
    });
    let tBody = document.getElementById('tableBody');
    tBody.innerHTML = addedBody;
}

//implement the clear function
Display.prototype.clear = function(){
    document.getElementById('libararyFrom').reset();
}

//implement the validate function
Display.prototype.validate = function(book){
    if(book.name.length<2 || book.author.length<2){
        return false;
    }
    else{
        return true;
    }
}


//implement the show function
Display.prototype.show = function(type){
    let msg = document.getElementById('msg');
    if (type == 'success') {
        msg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                            <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </symbol>
                        </svg>
                        <div class="alert alert-success d-flex align-items-center" role="alert">
                            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                            <div>
                            <strong>Success:</strong> Your book is successfully added.
                            </div>
                        </div>`
    }
    else if(type == 'error'){
        msg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </symbol>
                        </svg>
                        <div class="alert alert-danger d-flex align-items-center" role="alert">
                            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                            <div>
                                <strong>Error:</strong> Sorry you can't this book.
                            </div>
                        </div>`
    }
    setTimeout(() => {
        msg.innerHTML = '';
    }, 3000);
}

Display.prototype.add();

//Add submit Event Listener
document.getElementById('libraryFrom').addEventListener('submit', libraryFromSubmit)
function libraryFromSubmit(e){
    e.preventDefault();
    let name = document.getElementById('name').value;
    let author = document.getElementById('author').value;
    let programming = document.getElementById('programming');
    let novel = document.getElementById('novel');
    let fiction = document.getElementById('fiction');
    let type ;
    if (programming.checked) {
        type = programming.value;
    }
    else if(novel.checked){
        type = novel.value;
    }
    else if(fiction.checked){
        type = fiction.value;
    }
    let book = new Book(name, author, type);
    let display = new Display();
    if(display.validate(book)){
        display.store(book);
        display.add();
        display.clear();
        display.show('success');
    }
    else{
        display.show('error');
    }
}
