"use strict";

const quotePlace = document.querySelector(".text__quote");
const quotePlaceAuthor = document.querySelector(".text__quote__author");
const dailyBookImage = document.querySelector(".daily__book__image");
const proposalBookText = document.querySelector(".proposal__book__text");
const proposalAuthorText = document.querySelector(".proposal__author__text");

const epikBook = [];
const lirykBook = [];
const dramaBook = [];
let allBooks;
// const

class App {
  constructor() {
    this.dataQuote;
    this.dataBook;

    this.quoteApi();
    this.bookAPI();
  }
  // Tworzenie cytatów
  async quoteApi() {
    const response = await fetch("https://api.quotable.io/random");
    this.dataQuote = await response.json();
    const { content } = this.dataQuote;
    const { author } = this.dataQuote;
    quotePlace.textContent = content;
    quotePlaceAuthor.textContent = author;
  }
  // Tworzenie Książek
  async bookAPI() {
    const response = await fetch("https://wolnelektury.pl/api/books/");
    this.dataBook = await response.json();
    this.dataBook.map((el) => {
      if (el.kind == "Epika") {
        if (epikBook.length < 30) epikBook.push(el);
      }
      if (el.kind == "Liryka") {
        if (lirykBook.length < 30) lirykBook.push(el);
      }
      if (el.kind == "Dramat") {
        if (dramaBook.length < 30) dramaBook.push(el);
      }
    });
    this._bookOfTheDay();
  }
  // Tworzenie książki dnia
  _bookOfTheDay() {
    allBooks = epikBook.concat(lirykBook).concat(dramaBook);
    const indexOfBook = Math.trunc(Math.random() * 91);
    const randomBook = allBooks[indexOfBook];
    dailyBookImage.src = `${randomBook.simple_thumb}`;
    proposalBookText.textContent = randomBook.title;
    proposalAuthorText.textContent = randomBook.author;
  }
}
const app = new App();

// const myObj = {};
// const h = document.getElementById("y");
// h.addEventListener("click", function (e) {
//   myObj.u = document.querySelector("#x").value;

//   let myObj_serialized = JSON.stringify(myObj);

//   localStorage.setItem("myObj", myObj_serialized);
// });

// console.log(myObj.u);
// console.log(localStorage);
