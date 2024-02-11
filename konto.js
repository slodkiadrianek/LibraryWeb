"use strict";
const helloUser = document.querySelector(".hello__user");
const showTime = document.querySelector(".show__time");
const inputFile = document.querySelector(".input__file");
const profileImg = document.querySelector(".profile__img");
const showEmail = document.querySelector(".showEmail");
const listedBookReserved = document.querySelector(".listed__book__reserved");
const listedBookLiked = document.querySelector(".listed__book__liked");

const data = JSON.parse(sessionStorage.getItem("user"));
console.log(data);
class App {
  constructor() {
    this._showUserName();
    setInterval(() => this._showTime(), 1000);
    inputFile.addEventListener("change", this._showProfileImage);
    this._showEmail();
    this._listBooks();
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
  _listBooks() {
    console.log(data.liked);
    console.log(data.reserved);
    data.reserved.forEach((el) => {
      const likedBooks = `
    <div>
              <p>${el}</p>
              </div>
    `;
      listedBookReserved.insertAdjacentHTML("afterbegin", likedBooks);
    });

    data.liked.forEach((el) => {
      const likedBooks = `
    <div>
              <p>${el}</p>
              </div>
    `;
      listedBookLiked.insertAdjacentHTML("afterbegin", likedBooks);
    });
  }
}

const app = new App();
