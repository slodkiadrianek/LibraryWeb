'use strict'
const haburgerMenu = document.querySelector(".haburger__menu");
const hamburgerShow = document.querySelector(".hamburger__show");

const changeState = function(){
    hamburgerShow.classList.toggle('hidden')
}
  haburgerMenu.addEventListener("click", changeState);
