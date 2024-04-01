"use strict";

const header = document.querySelector("#header");
const section1 = document.querySelector("#section___1");
const dailyBookImageBlured = document.querySelectorAll(".daily__book__image");
const heightOfFirstSection = function(firstSection){
  const section1Heaight = firstSection.getBoundingClientRect().height;
  return section1Heaight
}
const section = document.querySelectorAll(".section");

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    header.classList.add("stickyheader");
  } else {
    header.classList.remove("stickyheader");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${heightOfFirstSection(section1) + 50}px`,
});

headerObserver.observe(section1);

const blurEffect = function (entries, observer) {
  const [imgEntry] = entries;
  if (!imgEntry.isIntersecting) return;
  imgEntry.target.classList.remove("daily__book__image__blured");
  observer.unobserve(imgEntry.target);
};

const imageObserver = new IntersectionObserver(blurEffect, {
  root: null,
  threshold: 0,
  rootMargin: "-300px",
});

section.forEach(function (section) {
  //wybieranie każdej pokolei sekcji
  imageObserver.observe(section);
});
