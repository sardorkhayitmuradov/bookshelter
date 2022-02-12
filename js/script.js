"use strict";
let elBookResult = document.querySelector(".book-result");
let elBookLists = document.querySelector(".card-items");
let elSearchInput = document.querySelector(".search-input")
let elLogOutBtn = document.querySelector(".homeLoginOut");

let elBookmarkBtn = document.querySelector(".bookmark-btn");
let elReadBtn = document.querySelector(".read")
let elBookmarkList = document.querySelector(".bookmarks-items");
let elModalTitle = document.querySelector(".modal-title");
let elModalCancel = document.querySelector('.modal-cancel');
let elModalImg = document.querySelector(".modal-img");
let elModalDesc = document.querySelector(".modal-desc");
let elModalAuthor = document.querySelector(".author");
let elModalAuthorItem = document.querySelector(".author-item");

let bookmarkLocalStorage = JSON.parse(window.localStorage.getItem("bookmarks"));
let bookmarks = bookmarkLocalStorage || [];

const API_KEY = `https://www.googleapis.com/books/v1/volumes?q=`;
let search = "";
const page = 1;
let apiElement;
const renderBookmarks = function  (bookmarks) {

    for(let bookmark of bookmarks ) {
        // Getting bookmarks
        let newItem = document.createElement('li');
        let newBookmarkInfo = document.createElement('div');
        let newBookmarkIcons = document.createElement('div');
        let newBookmarkItemHeading = document.createElement('h3');
        let newBookmarkItemDesc = document.createElement('p');
        let newBookmarkItemReadInfoBtn = document.createElement('a');
        let newBookmarkItemReadInfoBtnIcon = document.createElement('img');
        let newBookmarkItemDeleteBtn = document.createElement('a');
        let newBookmarkItemDeleteBtnIcon = document.createElement('img');

        //SET ATTRIBUTE
        newItem.setAttribute("class", "bookmark-item");
        newBookmarkInfo.setAttribute("class", "bookmark-info");
        newBookmarkIcons.setAttribute("class", "bookmark-icons");
        newBookmarkItemHeading.setAttribute("class", "book-item__heading");
        newBookmarkItemDesc.setAttribute("class", "book-item__desc");
        newBookmarkItemReadInfoBtn.setAttribute("class", "read-icon");
        newBookmarkItemReadInfoBtnIcon.setAttribute("class", "bookmark-read-img");
        newBookmarkItemDeleteBtn.setAttribute("class", "delete-icon");
        newBookmarkItemDeleteBtnIcon.setAttribute("class", "bookmark-delete-img");


        //TEXT CONTENT
        newBookmarkItemHeading.textContent = bookmark.
        newBookmarkItemDesc.textContent = book.

        //Append Child
        newItem.appendChild(newBookmarkInfo)
        newItem.appendChild(newBookmarkIcons)
        newBookmarkInfo.appendChild(newBookmarkItemHeading)
        newBookmarkInfo.appendChild(newBookmarkItemDesc)
        newBookmarkIcons.appendChild(newBookmarkItemReadInfoBtn)
        newBookmarkIcons.appendChild(newBookmarkItemDeleteBtn)
        newBookmarkItemReadInfoBtn.appendChild(newBookmarkItemReadInfoBtnIcon)
        newBookmarkItemDeleteBtn.appendChild(newBookmarkItemDeleteBtnIcon)
    }
}

// renderBookmarks()
let arrayBookmark = [];


// ASYNC FUNTION:
const getBooks  = async function (book) {
    let response = await fetch (API_KEY + book);
    
    let data = await response.json();
    elBookResult.textContent = data.totalItems || 0;
    
    renderBooks(data.items, elBookLists)
    // console.log(apiElement);
    if(data.response === true && data.book.length > 1){
        renderBooks(apiElement, elBookLists);
    }
    
}
getBooks("python")


const renderBooks = (array ) =>{
    elBookLists.innerHTML = null;
    
    array.forEach(element => {
        try{
            //Getting Elements
            let newItem = document.createElement("li");
            let newCardImgBox = document.createElement("div");
            let newCardImg = document.createElement("img");
            let newCardItemTitle = document.createElement("h3");
            let newCardItemDesc = document.createElement("p");
            let newCardItemYear = document.createElement("span");
            let newCardItemInfo = document.createElement("div");
            let newBookmarkBtn = document.createElement("button");
            let newCardItemMoreInfoBtn = document.createElement("button");
            let newCardItemReadBtn = document.createElement("button");
            
            //SET ATTRIBUTE
            newItem.setAttribute("class", "card-item");
            newCardImgBox.setAttribute("class", "card-item-img");
            newCardImg.setAttribute("class", "item-images");
            newCardImg.setAttribute("src", element.volumeInfo.imageLinks.smallThumbnail || element.volumeInfo.imageLinks.thumbnail);
            newCardItemTitle.setAttribute("class", "card-item__title");
            newCardItemDesc.setAttribute("class", "card-item__desc");
            newCardItemYear.setAttribute("class", "card-item-year");
            newCardItemInfo.setAttribute("class", "card-item-info")
            newBookmarkBtn.setAttribute("class", "bookmark-btn");
            newCardItemMoreInfoBtn.setAttribute("class", "more-info");
            newCardItemReadBtn.setAttribute("class", "read");
            
            // TEXT CONTENT
            newCardItemTitle.textContent = element.volumeInfo.title;
            newCardItemDesc.textContent = element.volumeInfo.authors;
            newCardItemYear.textContent =element.volumeInfo.publishedDate;
             newBookmarkBtn.textContent = "Bookmark"
             newCardItemMoreInfoBtn.textContent = "More Info"
             newCardItemReadBtn.textContent = "Read"
             
             
             //DATASETS
            
             newBookmarkBtn.dataset.bookmarkIdBtn = element.id;
             
             // APPEND CHILD
             elBookLists.appendChild(newItem);
             newItem.appendChild(newCardImgBox)
             newCardImgBox.appendChild(newCardImg)
             newItem.appendChild(newCardItemTitle)
             newItem.appendChild(newCardItemDesc)
             newItem.appendChild(newCardItemYear)
             newItem.appendChild(newCardItemInfo)
             newCardItemInfo.appendChild(newBookmarkBtn)
             newCardItemInfo.appendChild(newCardItemMoreInfoBtn)
             newItem.appendChild(newCardItemReadBtn)
            } catch{
                alert("Xato !!!");
            }
        })  
     
        
}
 

elSearchInput.addEventListener("change", ()=> {
    search = elSearchInput.value;
    getBooks(search);
});
    
    
elBookLists.addEventListener("click" , function(evt) {
    const isBookmarkBtn = evt.target.matches(".bookmark-btn")
        if(isBookmarkBtn){
            // const bookId = evt.target.dataset.bookId
            
            apiElement.forEach(item => {
                if(item.id == evt.target.dataset.bookmarkIdBtn){
                    arrayBookmark.push({    
                })
                }
        })
    }
})
    
// elBookLists.addEventListener("click", function(evt) {
//     if(evt.target.matches(".bookmark-btn")){
//         const bookmarkIdBtn = evt.target.dataset.bookmarkBtnId;
//         const getBooksElement = getBooks();
//         const foundElement = [...getBooksElement]
//         console.log(foundElement);
//     }
// })
    
const localToken = window.localStorage.getItem("token");

// if (!localToken) {
//   window.location.replace("index.html");
// }

elLogOutBtn.addEventListener("click", function () {
  window.localStorage.removeItem("token");

  window.location.replace("index.html");
});

//MODAL !!!!!!!!!!


