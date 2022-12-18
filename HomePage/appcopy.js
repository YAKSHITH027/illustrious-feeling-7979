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

// auto suggestion
const baseURL = "https://relince-data-sever-fp05-318.onrender.com/products";
let allData = [];
const mainGET = async (URL) => {
  let res = await fetch(URL);
  let data = await res.json();
  let unique = data.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
      acc.push(item.category);
    }
    return acc;
  }, []);
  // console.log("in");
  console.log("index", unique);
  allData = unique;
};
mainGET(baseURL);
console.log("hello");

document.querySelector("#search").addEventListener("input", (e) => {
  val = e.target.value;
  let finalData = allData.map((item) => {
    if (val.length > 0 && item.includes(val)) {
      return `
             <a href="../ProductsPage/products.html" class="block"
                  ><div class="suggestio">${item}</div></a
                >
          `;
    }
  });
  finalData = finalData.filter((item) => {
    if (item) {
      return item;
    }
  });
  console.log("finaldata", finalData);
  if (finalData.length != 0) {
    document.querySelector(".suggestion").innerHTML = finalData.join("");
    let ab = document.querySelector(".sugg");
    console.log(ab);
  } else {
    document.querySelector(".suggestion").innerHTML = "";
  }
  if (finalData.length > 0) {
    let alltar = document.querySelectorAll(".suggestio");
    alltar.forEach((single) => {
      single.addEventListener("click", (e) => {
        document.querySelector(".suggestion").innerHTML = "";
        document.querySelector("#search").value = "";
        localStorage.setItem(
          "category",
          JSON.stringify(e.target.innerText.toLowerCase())
        );
      });
    });
  }
});

// small

document.querySelector("#search2").addEventListener("input", (e) => {
  val = e.target.value;
  let finalData = allData.map((item) => {
    if (val.length > 0 && item.includes(val)) {
      return `
             <a href="../ProductsPage/products.html" class="block"
                  ><div class="suggestio">${item}</div></a
                >
          `;
    }
  });
  // console.log(finalData);
  finalData = finalData.filter((item) => {
    if (item) {
      return item;
    }
  });
  if (finalData.length != 0) {
    // document.querySelector(".suggestion").innerHTML = finalData.join("");
    let ab = (document.querySelector(".sugg").innerHTML = finalData.join(""));
    // console.log(ab);
  }
  if (finalData.length > 0) {
    let alltar = document.querySelectorAll(".suggestio");
    alltar.forEach((single) => {
      single.addEventListener("click", (e) => {
        localStorage.setItem("category", e.target.innerText.toLowerCase());
      });
    });
  }
});

document.querySelector(".userName").innerText =
  JSON.parse(localStorage.getItem("userName")) || "yakshithh";
