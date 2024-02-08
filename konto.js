"use strict";
const helloUser = document.querySelector(".hello__user");
const showTime = document.querySelector(".show__time");
const inputFile = document.querySelector(".input__file");
const profileImg = document.querySelector(".profile__img");
const showEmail = document.querySelector(".showEmail");

const data = JSON.parse(sessionStorage.getItem("user"));
console.log(data);

class App {
  constructor() {
    this._showUserName();
    setInterval(() => this._showTime(), 1000);
    inputFile.addEventListener("change", this._showProfileImage);
    this._showEmail();
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
}

const app = new App();
