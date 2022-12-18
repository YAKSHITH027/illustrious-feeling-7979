const baseURL2 = "https://relince-data-sever-fp05-318.onrender.com/products";
let cat = localStorage.getItem("category").toLowerCase() || "mobile";
const getRequest = async (URL, page_num = 1, cat = "") => {
  try {
    let res = await fetch(`${URL}?${cat}_limit=10&_page=${page_num}`);
    let data = await res.json();
    console.log(res);
    let total = res.headers.get("x-total-count");
    let totalPage = Math.ceil(total / 6);
    renderData(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
let newCat = "";
for (i = 1; i < cat.length - 1; i++) {
  newCat += cat[i];
}
// console.log(cat.length);
// console.log(newCat == "mobile");
// console.log(cat, "camera");
getRequest(baseURL2, 1, `category=${newCat}&`);

const renderData = (data) => {
  let newData = data.map((item) => {
    return `
                  <div class="single-product" id="${item.id}">
          <div>
            <img
              src=${item.image}
              alt=""
            />
          </div>
          <div class="title">
            <h3>${item.title}</h3>
            <p><span class="rate">${item.rating.rate}</span> 16000 ratings</p>
            <p class="desc">
             ${item.description}
            </p>
          </div>
          <div class="price">
            <p>$ ${item.price}</p>
            <p>$ 900 discount 30% off</p>
            <p>free delevery</p>
          </div>
        </div>
        
           `;
  });
  document.querySelector(".display-data").innerHTML = newData.join("");
  let allSingleProduct = document.querySelectorAll(".single-product");
  allSingleProduct.forEach((single) => {
    single.addEventListener("click", (e) => {
      // console.log(e.currentTarget.id);
      let id = e.currentTarget.id;
      localStorage.setItem("productId", id);
      window.location.href = "../singleProductPage/singleProduct.html";
    });
  });
};

// app js code

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
             <a href="#" class="block"
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
  }
  if (finalData.length > 0) {
    let alltar = document.querySelectorAll(".suggestio");
    alltar.forEach((single) => {
      single.addEventListener("click", (e) => {
        getRequest(
          baseURL2,
          1,
          `category=${e.target.innerText.toLowerCase()}&`
        );
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
             <a href="./ProductsPage/products.html" class="block"
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
