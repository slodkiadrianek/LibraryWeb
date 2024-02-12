"use strict";

const buttonBox = document.querySelectorAll(".button__box");
const main = document.querySelector(".main");
const allBooks = document.querySelector("#all__books");
const main__text = document.querySelector(".main__text");
const backButton = document.querySelector(".back__button");
const user = JSON.parse(sessionStorage.getItem("user"));
const searchField = document.querySelector(".searchField");

const epikBook = JSON.parse(sessionStorage.getItem("epikBook"));
const lirykBook = JSON.parse(sessionStorage.getItem("lirykBook"));
const dramaBook = JSON.parse(sessionStorage.getItem("dramaBook"));
console.log(epikBook);
console.log(lirykBook);
console.log(dramaBook);
let bookCard;

class App {
  constructor() {
    buttonBox.forEach((el) => {
      el.addEventListener(
        "click",
        function (e) {
          const x = el.dataset.type;
          main.classList.add("hidden");
          backButton.classList.remove("hidden");
          searchField.classList.remove("hidden");
          if (x === "epikBook") {
            this._showBooks(epikBook);
            main__text.textContent = `Epika`;
            main__text.dataset.set = "epikBook";
          }
          if (x === "dramaBook") {
            this._showBooks(dramaBook);
            main__text.textContent = `Dramat`;
            main__text.dataset.set = "dramaBook";
          }
          if (x === "lirykBook") {
            this._showBooks(lirykBook);
            main__text.textContent = `Liryka`;
            main__text.dataset.set = "lirykBook";
          }
        }.bind(this)
      );
    });
    backButton.addEventListener("click", this._backToMenu);
    allBooks.addEventListener("click", this._closestData);
    searchField.addEventListener("keyup", this._findBook);
  }
  _showBooks(x) {
    bookCard = "";
    allBooks.style.display = `grid`;
    allBooks.textContent = bookCard;
    x.forEach((el) => {
      bookCard = `
       <article class="box book">
        <img src="${el.simple_thumb}" alt="">
        <h3 class="book__title">${el.title}</h3>
        <p class="book__author">${el.author}</p>
        <div class="action"> 
        <button class="book__button_reserve">Zarezerwuj</button>
        <button class="book__button_like"><img class="book__img" src="images/heart-svgrepo-com.svg" alt=""></button> 
        </div>
      </article>`;
      allBooks.insertAdjacentHTML("afterbegin", bookCard);
    });
  }
  _backToMenu() {
    main__text.textContent = `Wybierz rodzaj książki`;
    allBooks.style.display = `none`;
    main.classList.remove("hidden");
    backButton.classList.add("hidden");
    searchField.classList.add("hidden");
    searchField.value = "";
  }
  _closestData(e) {
    if (
      e.target.classList.contains("book__button_like") ||
      e.target.classList.contains("book__button_reserve")
    ) {
      const type = e.target;
      console.log(type);
      const parent = e.target.closest(".action");
      const higherParent = parent.closest(".box");
      console.log(higherParent.children);
      const likedObject = higherParent.children[1].textContent;
      type.classList.contains("book__button_reserve")
        ? user.reserved.push(likedObject)
        : user.liked.push(likedObject);
      console.log(user);
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      return;
    }
  }
  _findBook(e) {
    const input = searchField.value;
    let typeOfBook = searchField.previousElementSibling.dataset.set;
    switch (typeOfBook) {
      case "epikBook":
        typeOfBook = epikBook;
        break;
      case "lirykBook":
        typeOfBook = lirykBook;
        break;
      case "dramaBook":
        typeOfBook = dramaBook;
        break;
    }
    bookCard = "";
    allBooks.style.display = `grid`;
    allBooks.textContent = bookCard;
    typeOfBook.forEach((el) => {
      if (el.title === input || el.author === input) {
        bookCard = `
       <article class="box book">
        <img src="${el.simple_thumb}" alt="">
        <h3 class="book__title">${el.title}</h3>
        <p class="book__author">${el.author}</p>
        <div class="action"> 
        <button class="book__button_reserve">Zarezerwuj</button>
        <button class="book__button_like"><img class="book__img" src="images/heart-svgrepo-com.svg" alt=""></button> 
        </div>
      </article>`;
        allBooks.insertAdjacentHTML("afterbegin", bookCard);
      }
    });
  }
}
const app = new App();
