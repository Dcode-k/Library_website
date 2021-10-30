console.log("this is index.js");
// Todos"
// 1. Store all the data to the localStorage
// 2. Give another column as an option to delete the book
// 3. Add a scroll bar to the view


// Constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

// Display constructor
function Display() {

}

// Add methods to display prototype
Display.prototype.add = function (book) {
  console.log("Adding to UI");
  tableBody = document.getElementById("tableBody");
  let uiString = ` <tr>
                    
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.type}</td>
  </tr>`;
  tableBody.innerHTML+=uiString;
};

Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

Display.prototype.validate=function (book){
    if(book.name.length<2||book.author.length<2){
        return false; 
    }
    else{
        return true;
    }
}

Display.prototype.show=function show(type,displayMessage){
    let message = document.getElementById('message');
    let boldText;
        if(type==='success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);

}

// Add submit eventListner to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  console.log("abc");

  let name = document.getElementById("bookName").value;
  let author = document.getElementById("bookAuthor").value;
  let type;
  let fiction = document.getElementById("fiction");
  let anime = document.getElementById("anime");
  let inspirational = document.getElementById("inspirational");
  if (fiction.checked) {
    type = fiction.value;
  } else if (anime.checked) {
    type = anime.value;
  } else if (inspirational.checked) {
    type = inspirational.value;
  }
  let book = new Book(name, author, type);
  console.log(book);
  let display = new Display();
  if(display.validate(book)){
      display.add(book);
      display.clear();
      display.show('success','Your book has been successfully added')
  }
  else{
      display.show('danger','Sorry! You can not add this book');
  }
  e.preventDefault();
}
