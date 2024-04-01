"use strict";
const helloUser = document.querySelector(".hello__user");
const showTime = document.querySelector(".show__time");
const inputFile = document.querySelector(".input__file");
const profileImg = document.querySelector(".profile__img");
const showEmail = document.querySelector(".showEmail");
const listedBookLiked = document.querySelector(".listed__book__liked");
const liked = document.querySelector(".liked");
const likedQuote = document.querySelector('.liked__quote')
const reserved = document.querySelector(".reserved");
const changeH = document.querySelector(".changeH");
const changeL = document.querySelector(".changeL");
const data = JSON.parse(sessionStorage.getItem("user"));

const convertDataLiked = data.liked;
data.likes = new Set([...convertDataLiked]);
const convertDataReserved = data.reserved;
data.reserve = new Set([...convertDataReserved]);
const convertDataQuote = data.likedQuotes
data.likedQuote = new Set([...convertDataQuote])
class App {
  constructor() {
    this._showUserName();
    setInterval(() => this._showTime(), 1000);
    inputFile.addEventListener("change", this._showProfileImage);
    this._showEmail();
    this._likeBooks();
    liked.addEventListener("click", this._likeBooks);
    reserved.addEventListener("click", this._reservedBooks);
    changeL.addEventListener("click", this._showChangeLogin.bind(this));
    changeH.addEventListener("click", this._showChangePass.bind(this));
    likedQuote.addEventListener('click', this._likedQuotes)
  }
  _showUserName() {
    helloUser.textContent = `Witaj ${data.login}`;
  }
  _showTime() {
    const date = new Date();
    const hours = `${date.getHours()}`.padStart(2, "0");
    const min = `${date.getMinutes()}`.padStart(2, "0");
    const sec = `${date.getSeconds()}`.padStart(2, "0");
    showTime.textContent = `${hours}:${min}:${sec}`;
  }
  _showProfileImage() {
    profileImg.src = URL.createObjectURL(inputFile.files[0]);
  }
  _showEmail() {
    showEmail.textContent = `Twój email to ${data.email}`;
  }
  _likeBooks() {
    listedBookLiked.textContent = "";
    data.likes.forEach((el) => {
      const likedBooks = `
      <p class="book_liked">${el}</p>
    `;
      listedBookLiked.insertAdjacentHTML("afterbegin", likedBooks);
    });
  }
  _likedQuotes(){
    listedBookLiked.textContent = "";
    data.likedQuote.forEach((el) => {
      const likedBooks = `
      <p class="book_liked">${el}</p>
    `;
      listedBookLiked.insertAdjacentHTML("afterbegin", likedBooks);
    });
  }
  _reservedBooks() {
    listedBookLiked.textContent = "";
    data.reserve.forEach((el) => {
      const likedBooks = `
      <p class="book_liked">${el}</p>
    `;
      listedBookLiked.insertAdjacentHTML("afterbegin", likedBooks);
    });
  }
  _showChangeLogin() {
    listedBookLiked.textContent = "";
    const likedBooks = `
      <article class="change__login">
              <input
                class="input__change newLogin"
                type="text"
                placeholder="Wprowadź nowy login"
                required
              />
              <button class="input__change acceptChanges">Zatwierdź</button>
            </article>
    `;
    listedBookLiked.insertAdjacentHTML("afterbegin", likedBooks);
    const newLogin = document.querySelector(".newLogin");
    const acceptChanges = document.querySelector(".acceptChanges");
    acceptChanges.addEventListener(
      "click",
      function () {
        data.login = newLogin.value;
        this._showUserName();
        newLogin.value = "";
      }.bind(this)
    );
  }

  _showChangePass() {
    listedBookLiked.textContent = "";
    const likedBooks = `
      <article class="change__login">
          <input
                class="input__change oldPass"
                type="text"
                placeholder="Wprowadź stare hasło"
                required
              />
              <input
                class="input__change newPass"
                type="text"
                placeholder="Wprowadź nowe hasło"
                required
              />
              <button class="input__change acceptChanges">Zatwierdź</button>
            </article>
    `;
    listedBookLiked.insertAdjacentHTML("afterbegin", likedBooks);
    const oldPass = document.querySelector(".oldPass");
    const newPass = document.querySelector(".newPass");
    const acceptChanges = document.querySelector(".acceptChanges");
    acceptChanges.addEventListener(
      "click",
      function () {
        if (oldPass.value === data.password) {
          data.password = newPass.value;
          oldPass.value = newPass.value = "";
        } else {
          alert("wprowadź poprawne");
        }
      }.bind(this)
    );
  }
}

const app = new App();
