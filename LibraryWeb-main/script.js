"use strict";

const quotePlace = document.querySelector(".text__quote");
const quotePlaceAuthor = document.querySelector(".text__quote__author");
const dailyBookImage = document.querySelector(".daily__book__image");
const proposalBookText = document.querySelector(".proposal__book__text");
const proposalAuthorText = document.querySelector(".proposal__author__text");
const actualTemperature = document.querySelector(".actual__temperature");
const actualWindSpeed = document.querySelector(".actual__wind__speed");
const actualElevation = document.querySelector(".actual__elevation");
const recomendation = document.querySelector(".recomendation");
const newsletterInput = document.querySelector(".newsletter__input");

const actualWeather = document.querySelector('.actual__weather')

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
    newsletterInput.addEventListener("keydown", this.checkEmail);
  }
  // Tworzenie cytatów
  async quoteApi() {
    try {
      const response = await fetch("https://api.quotable.io/random");
    this.dataQuote = await response.json();
    const { content } = this.dataQuote;
    const { author } = this.dataQuote;
    quotePlace.textContent = content;
    quotePlaceAuthor.textContent = author;
      
    } catch (error) {
      quotePlace.textContent = `⚠Wystąpił z pobieraniem cytatu. Sprawdź połączenie z siecią`
    }
    
  }
  // Tworzenie Książek
  async bookAPI() {
    try {
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
      sessionStorage.setItem("epikBook", JSON.stringify(epikBook));
      sessionStorage.setItem("lirykBook", JSON.stringify(lirykBook));
      sessionStorage.setItem("dramaBook", JSON.stringify(dramaBook));
    } catch (error) {
      console.error(`Wystąpił problem z pobieraniem książęk. Sprawdź połaczenie z siecią`);
      dailyBookImage.alt = `⚠Wystąpił problem z pobieraniem książęk. Sprawdź połaczenie z siecią`
      proposalBookText.textContent = `⚠Wystąpił problem z pobieraniem książęk. Sprawdź połaczenie z siecią`
      proposalAuthorText.textContent = `⚠Wystąpił problem z pobieraniem książęk. Sprawdź połaczenie z siecią`
    }
   
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
  // Pobieranie pozycji i aktualnej pogody w twoim miejscu zamieszkania
  _getPosition() {
    navigator.geolocation.getCurrentPosition(this._actualWheather, function () {
      console.log(`nie udało się pobrać Twojej pozycji`);
    });
  }
  async _actualWheather(position) {
    try{
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const keyApi = "82c2d0a4b2d3714d4b07a02dce36340c";
      const ApiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
      const response = await fetch(ApiURL + `&appid=${keyApi}`);
      const weather = await response.json();
      const { temperature_2m } = weather.current;
      const { wind_speed_10m } = weather.current;
      const { elevation } = weather;
      actualElevation.textContent = `Znajdujesz się ${elevation}m nad poziomem morza`;
      actualTemperature.textContent = `Obecna temperatura: ${temperature_2m}°C`;
      actualWindSpeed.textContent = `Wiatr wieje z prędkością: ${wind_speed_10m} km/h`;
      if (temperature_2m < 6) {
        recomendation.textContent = `Zalecamy pozostać w domu🥶`;
      } else if (temperature_2m < 20) {
        recomendation.textContent = `Zalecamy  przejść się na spacer😉`;
      } else if (temperature_2m > 20) {
        recomendation.textContent = `Pamiętaj o odpowiednim nawodnieniu🥵`;
      }
    }catch(error){
      actualWeather.textContent = `⚠Wystąpił błąd z pobieraniem pogody. Sprawdź połączenie lub czy zezwoliłeś na udostępnienie lokalizacji.`
    }
   
  }
  // Zapis do newslettera, sprawdzanie poprawności maila
  checkEmail(e) {
    const emailValidation = function () {
      const input = newsletterInput.value;
      if (input === "") alert("To pole nie może być puste");
      else {
        const haveEmailCharacter = '@';
        const haveSpecialEndCharacters = ['.com', '.org', '.gov', '.pl']
        if (input.includes(haveEmailCharacter) && haveSpecialEndCharacters.some(el => input.includes(el))) {
          const splitted = input.split("@");
          const firstHalf = splitted[0];
          const secondHalf = splitted[1].split('.com')
          if (firstHalf.length > 0 && secondHalf[0].length > 0) {
            alert("Zostałeś zapisany do newslettera");
          } else {
            alert("Niepoprawne dane e-mail");
          }
        } else {
          alert("Niepoprawne dane e-mail");
        }
      }
    };

    if (e.key === "Enter") {
      emailValidation();
    }
  }
  
}
const app = new App();
