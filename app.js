const navLinks = document.querySelector(".nav-links");
const toggle = document.querySelector(".toggle-btn");
const menuLink = document.querySelectorAll(".menu-link");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

menuLink.forEach((item) => {
  item.addEventListener("click", (e) => {
    let target = e.target.parentElement.querySelector(".sub-menu");
    target.classList.toggle("show");
  });
});
