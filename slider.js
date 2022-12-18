const productContainers = [...document.querySelectorAll(".product-container")];
const nxtBtn = [...document.querySelectorAll(".nxt-btn")];
const preBtn = [...document.querySelectorAll(".pre-btn")];
console.dir(productContainers);
productContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth;
  });

  preBtn[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth;
  });
});

// auto slider

const slidesHolder = document.querySelector(".slides");

const slides = document.querySelectorAll(".slide");
setInterval(() => {
  slidesHolder.style.transform = "translate(-100%)";
  slidesHolder.style.transition = "all 0.5s";
  // console.log('hey there')
}, 2000);
slidesHolder.addEventListener("transitionend", () => {
  slidesHolder.appendChild(slidesHolder.firstElementChild);
  // console.log("hello");
  slidesHolder.style.transition = "none";
  slidesHolder.style.transform = "translate(0)";
  setTimeout(function () {
    slidesHolder.style.transition = "all 0.5s";
  });
});

// another
const slidesHolder2 = document.querySelector(".slides2");

const slides2 = document.querySelectorAll(".slide2");
setInterval(() => {
  slidesHolder2.style.transform = "translate(-100%)";
  slidesHolder2.style.transition = "all 0.5s";
  // console.log('hey there')
}, 2000);
slidesHolder2.addEventListener("transitionend", () => {
  slidesHolder2.appendChild(slidesHolder2.firstElementChild);
  // console.log("hello");
  slidesHolder2.style.transition = "none";
  slidesHolder2.style.transform = "translate(0)";
  setTimeout(function () {
    slidesHolder2.style.transition = "all 0.5s";
  });
});
