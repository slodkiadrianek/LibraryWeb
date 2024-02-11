"use strict";

const buttonBox = document.querySelectorAll(".button__box");
const main = document.querySelector("#main");
const allBooks = document.querySelector("#all__books");

const epikBook = JSON.parse(sessionStorage.getItem("epikBook"));
const lirykBook = JSON.parse(sessionStorage.getItem("lirykBook"));
const dramaBook = JSON.parse(sessionStorage.getItem("dramaBook"));
console.log(epikBook);
console.log(lirykBook);
console.log(dramaBook);

class App {
  constructor() {
    buttonBox.forEach((el) => {
      el.addEventListener(
        "click",
        function (e) {
          let x = el.dataset.type;
          if (x === "epikBook") {
            this._showBooks(epikBook);
          }
          if (x === "dramaBook") {
            this._showBooks(dramaBook);
          }
          if (x === "lirykBook") {
            this._showBooks(lirykBook);
          }
        }.bind(this)
      );
    });
  }
  _showBooks(x) {
    let bookCard = "";

    allBooks.textContent = bookCard;
    x.forEach((el) => {
      bookCard = `
       <article class="box">
        <img src="${el.simple_thumb}" alt="">
        <h3>${el.title}</h3>
        <p>${el.author}</p>
        <button>reserve</button>
        <button>plub</button> 
      </article>`;
      allBooks.insertAdjacentHTML("afterbegin", bookCard);
    });
  }
}
const app = new App();
