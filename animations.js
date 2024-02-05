"use strict";

const header = document.querySelector("#header");
const section1 = document.querySelector("#section___1");

const section1Heaight = section1.getBoundingClientRect().height;
console.log(section1Heaight);

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    header.classList.add("stickyheader");
  } else {
    header.classList.remove("stickyheader");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${section1Heaight}px`,
});

headerObserver.observe(section1);
