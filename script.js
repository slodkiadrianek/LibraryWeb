"use strict";

const quotePlace = document.querySelector(".text__quote");
const quotePlaceAuthor = document.querySelector(".text__quote__author");
const dailyBookImage = document.querySelector(".daily__book__image");
const proposalBookText = document.querySelector(".proposal__book__text");
const proposalAuthorText = document.querySelector(".proposal__author__text");
const actualTemperature = document.querySelector(".actual__temperature");
const actualWindSpeed = document.querySelector(".actual__wind__speed");
const actualElevation = document.querySelector(".actual__elevation");

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
    this._getPosition();
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
  // Tworzenie książki
  _bookOfTheDay() {
    allBooks = epikBook.concat(lirykBook).concat(dramaBook);
    const indexOfBook = Math.trunc(Math.random() * 91);
    const randomBook = allBooks[indexOfBook];
    dailyBookImage.src = `${randomBook.simple_thumb}`;
    proposalBookText.textContent = randomBook.title;
    proposalAuthorText.textContent = randomBook.author;
  }
  _getPosition() {
    navigator.geolocation.getCurrentPosition(this._actualWheather, function () {
      console.log(`nie udało się pobrać Twojej pozycji`);
    });
  }
  async _actualWheather(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const keyApi = "82c2d0a4b2d3714d4b07a02dce36340c";
    const ApiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
    const response = await fetch(ApiURL + `&appid=${keyApi}`);
    const weather = await response.json();
    console.log(weather);
    const { temperature_2m } = weather.current;
    const { wind_speed_10m } = weather.current;
    const { elevation } = weather;
    actualElevation.textContent = `Znajdujesz się ${elevation}m nad poziomeme morza`;
    actualTemperature.textContent = `Obecna temperatura: ${temperature_2m}°C`;
    actualWindSpeed.textContent = `Wiatr wieje z prędkością: ${wind_speed_10m} km/h`;
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
