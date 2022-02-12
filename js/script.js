"use strict";
let elBookResult = document.querySelector(".book-result");
let elBookLists = document.querySelector(".card-items");
let elSearchInput = document.querySelector(".search-input")
let elLogOutBtn = document.querySelector(".homeLoginOut");
let elOrderBtn = document.querySelector(".order-btn");


let elModal = document.querySelector(".book-modal")
let elModalRightContainer = document.querySelector(".modal-container")
let elBookmarkBtn = document.querySelector(".bookmark-btn");
let elReadBtn = document.querySelector(".read")
let elBookmarkList = document.querySelector(".bookmarks-items");
let elModalTitle = document.querySelector(".modal-title");
let elAuthor = document.querySelector(".author")
let elModalCancel = document.querySelector('.modal-cancel');
let elModalImg = document.querySelector(".modal-img");
let elModalDesc = document.querySelector(".modal-desc");
let elModalAuthor = document.querySelector(".author");
let elModalAuthorItem = document.querySelector(".author-item");

const bookmarkLocal = JSON.parse(window.localStorage.getItem("bookmarks"));
const bookmarks = bookmarkLocal || [];

const API_KEY = `https://www.googleapis.com/books/v1/volumes?q=`;
let search = "";
const page = 1;
let order = "";


const renderBookmarks =  (arr, element) =>{
    element.innerHTML = null;

    arr.forEach(book => {
        const html = `
                <li class="bookmark-item">
                    <div class="bookmark-info">
                        <h3 class="card-item__title book-item__heading">${book.volumeInfo.title}</h3>
                        <p class="card-item__desc book-item__desc">${
                            book.volumeInfo.authors == undefined
                              ? "Author not found"
                              : book.volumeInfo.authors
                          }</p>
                    </div>
                    <div class="bookmark-icons">
                        <a href="#" class="read-icon">
                            <img src="./images/read.svg" alt="Bookmark read Button" class="bookmark-read-img">
                        </a>
                        <a href="#" class="delete-icon">
                            <img src="./images/delete 1.svg" alt="Bookmark delete Button" class="bookmark-delete-img">
                        </a>
                    </div>
                </li>
        `;
        element.insertAdjacentHTML("beforeend" , html)
    });
};

// renderBookmarks
let arrayBookmark = [];

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

// ASYNC FUNTION:
const getBooks  = async function (book) {
    
    let response = await fetch (API_KEY + book + order);
    
    let data = await response.json();
    elBookResult.textContent = data.totalItems;

    renderBooks(data.items, elBookLists);
    // renderPagination(data, elPagination)

    elBookLists.addEventListener("click", (evt) => {
        if (evt.target.matches(".bookmark-btn")) {
            let bookmarkId = evt.target.dataset.btnBookMark ;
            const foundFilm = data.items.find(() => bookmarkId == data.items.id)
            if(!bookmarks.includes(foundFilm)){
                if (foundFilm != undefined) {
                    bookmarks.push(foundFilm);
                }
            } else{
                alert("Already added !!");
            }
            renderBookmarks(data.items, elBookmarkList);
            window.localStorage.setItem("bookmarks" , JSON.stringify(bookmarks))
        }         
    });
};
getBooks("python")

const closeModal = () => {
    elModal.classList.add("hidden");
};

elSearchInput.addEventListener("change", ()=> {
    search = elSearchInput.value;
    getBooks(search);
});
    
    
const localToken = window.localStorage.getItem("token");

if (!localToken) {
  window.location.replace("index.html");
}

elLogOutBtn.addEventListener("click", function () {
  window.localStorage.removeItem("token");

  window.location.replace("index.html");
});

elOrderBtn.addEventListener("click", () => {
    order = "&orderBy=newest";
    getBooks();
});
