"use strict";
const newsletterInput = document.querySelector(".newsletter__input");
// const loginForm = document.querySelector(".login");
const loginSwitch = document.querySelectorAll(".login__link");
const loginSection = document.querySelector(".login");
const name = document.querySelector(".name");
const loginValue = document.querySelector(".loginValue");
const emailValue = document.querySelector(".emailValue");
const passwordValue = document.querySelector(".passwordValue");
const registerButton = document.querySelector(".register__button");
const register = document.querySelector(".register");
const loginButton = document.querySelector(".login__button");
const logpasswordValue = document.querySelector(".logpasswordValue");
const logpLoginValue = document.querySelector(".logLoginValue");

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
    newsletterInput.addEventListener("keydown", this.checkEmail.bind(this));
    loginSwitch.forEach((el) => {
      el.addEventListener("click", this._switch.bind(this));
    });
    loginButton.addEventListener("click", this._loginCheck.bind(this));
    registerButton.addEventListener("click", this._checkValidation.bind(this));
  }
  // zmiana logowania na rejestracje i z powrotem
  _switch() {
    if (loginSection.classList.contains("active")) {
      loginSection.classList.remove("active");
      name.textContent = "Zarejestruj się";
      register.classList.add("active");
    } else {
      loginSection.classList.add("active");
      name.textContent = "Logowanie";
      register.classList.remove("active");
    }
  }
  // sprawdzanie maila
  emailvalidation(x) {
    const input = x;
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
  }
  checkEmail(e) {
    const inputValue1 = newsletterInput.value;
    if (e.key === "Enter") {
      this.emailvalidation(inputValue1);
      newsletterInput.value = "";
    }
  }
  // Sprawdzanie danych rejestracji
  _checkValidation() {
    let isValid = false;
    const inputValue = emailValue.value;
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

    if (!isValid === false && this.emailvalidation(inputValue)) {
      user = new newUser(
        loginValue.value,
        emailValue.value,
        passwordValue.value
      );
      this.#account.push(user);
      console.log(this.#account);
      loginValue.value = emailValue.value = passwordValue.value = "";
    }
  }

  _loginCheck() {
    console.log(logpLoginValue.value, logpasswordValue.value);
    this.#account.forEach((el) => {
      console.log(this.#account.el.password);
    });
  }
}

const loginApp = new loginAndRegisterApp();
