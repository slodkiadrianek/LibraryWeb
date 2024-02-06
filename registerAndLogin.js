"use strict";
const newsletterInput = document.querySelector(".newsletter__input");
// const loginForm = document.querySelector(".login");
const loginSwitch = document.querySelector(".login__link");
const loginSection = document.querySelector(".login");
const name = document.querySelector(".name");
const loginValue = document.querySelector(".loginValue");
const emailValue = document.querySelector(".emailValue");
const passwordValue = document.querySelector(".passwordValue");
const registerButton = document.querySelector(".register__button");

// class login {
//   constructor() {}
// }

let user;
class newUser {
  #password;
  constructor(login, email, password) {
    this.login = login;
    this.email = email;
    this.#password = password;
  }
}

class loginAndRegisterApp {
  #account = [];
  constructor() {
    newsletterInput.addEventListener(
      "keydown",
      this.checkEmail.bind(newsletterInput)
    );
    loginSwitch.addEventListener("click", this._switch);
    registerButton.addEventListener("click", this._checkValidation.bind(this));
  }

  _switch() {
    if (loginSection.classList.contains("active")) {
      loginSection.classList.remove("active");
      name.textContent = "Zarejestruj się";
    }
  }
  checkEmail(e) {
    let x = this;
    const emailValidation = function () {
      const input = x.value;
      if (input === "") alert("To pole nie może być puste");
      else {
        const specialCharacters = ["@", ".com"];
        if (specialCharacters.every((el) => input.includes(el))) {
          const splitted = input.split("@");
          const firstHalf = splitted[0];
          const secondHalf = splitted[1].split(".com");
          if (firstHalf.length > 0 && secondHalf[0].length > 0) {
            console.log(`Email poprawny`);
            return true;
          } else {
            alert("Niepoprawne dane e-mail");
            return false;
          }
        } else {
          alert("Niepoprawne dane e-mail");
          return false;
        }
      }
    };

    if (e.key === "Enter") {
      emailValidation();
    }
  }
  //   #accounts;
  _checkValidation() {
    let isValid = false;
    const emailValidation = function () {
      const input = emailValue.value;
      if (input === "") alert("To pole nie może być puste");
      else {
        const specialCharacters = ["@", ".com"];
        if (specialCharacters.every((el) => input.includes(el))) {
          const splitted = input.split("@");
          const firstHalf = splitted[0];
          const secondHalf = splitted[1].split(".com");
          if (firstHalf.length > 0 && secondHalf[0].length > 0) {
            console.log(`Email poprawny`);
            return true;
          } else {
            alert("Niepoprawne dane e-mail");
            return false;
          }
        } else {
          alert("Niepoprawne dane e-mail");
          return false;
        }
      }
    };

    if (this.#account.length > 0) {
      this.#account.forEach((el) => {
        if (
          el.login.includes(loginValue.value) ||
          el.email.includes(emailValue.value)
        )
          isValid = false;
        else isValid = true;
      });
    } else {
      isValid = true;
    }

    if (!isValid === false && emailValidation()) {
      user = new newUser(
        loginValue.value,
        emailValue.value,
        passwordValue.value
      );
      this.#account.push(user);
      console.log(this.#account);
    }
  }
}

const loginApp = new loginAndRegisterApp();
