"use strict";
const myObj = {};
const h = document.getElementById("y");
h.addEventListener("click", function (e) {
  myObj.u = document.querySelector("#x").value;

  let myObj_serialized = JSON.stringify(myObj);

  localStorage.setItem("myObj", myObj_serialized);
});

console.log(myObj.u);
console.log(localStorage);
