"use strict";

const quotePlace = document.querySelector(".text__quote");
const quotePlaceAuthor = document.querySelector(".text__quote__author");

class App {
  constructor() {
    this.quoteApi();
  }
  async quoteApi() {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    console.log(data);
    const { content } = data;
    const { author } = data;
    quotePlace.textContent = content;
    quotePlaceAuthor.textContent = author;
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
