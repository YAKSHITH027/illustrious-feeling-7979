let val = JSON.parse(localStorage.getItem("productId"));
const baseURL2 = "https://relince-data-sever-fp05-318.onrender.com/products";

console.log(val);
const getRequest = async (URL) => {
  try {
    let res = await fetch(`${URL}/${val}`);
    let data = await res.json();
    console.log(res);
    let total = res.headers.get("x-total-count");
    let totalPage = Math.ceil(total / 6);
    renderData([data]);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
getRequest(baseURL2);

let renderData = (data) => {
  //   console.log(data);
  let newData = data.map((item) => {
    return `
          <div class="left">
          <div>
            <img
              src=${item.image}
              alt=""
            />
          </div>
          <div class="btn-container">
            <button class="buy">buy now</button>
            <button class="add-cart" id="${item.id}">add to cart</button>
          </div>
        </div>
        <div class="right">
          <h2>${item.title}</h2>
          <p><span class="rate">${item.rating.rate}</span> 99,345 Ratings & 990 reviews</p>
          <p class="extra">extra 4000 off</p>
          <p class="price">$ ${item.price}</p>
          <h3>available offers</h3>
          <div class="offer">
            <p>
              Bank Offer10% off on Kotak Bank Credit Cards and Credit EMI Trxns,
              up to ₹750. On orders of ₹5,000 and aboveT&C
            </p>
            <p>
              Bank Offer10% off on Kotak Bank Credit Cards and Credit EMI Trxns,
              up to ₹750. On orders of ₹5,000 and aboveT&C
            </p>
            <p>
              Bank Offer10% off on Kotak Bank Credit Cards and Credit EMI Trxns,
              up to ₹750. On orders of ₹5,000 and aboveT&C
            </p>
            <p>
              Bank Offer10% off on Kotak Bank Credit Cards and Credit EMI Trxns,
              up to ₹750. On orders of ₹5,000 and aboveT&C
            </p>
          </div>
          <p class="view">view all offers</p>
        </div>
          `;
  });
  document.querySelector(".container").innerHTML = newData.join("");
  let storageData = JSON.parse(localStorage.getItem("cart")) || [];
  document.querySelector(".add-cart").addEventListener("click", (e) => {
    storageData.push(...data);
    localStorage.setItem("cart", JSON.stringify(storageData));
  });
};

// d***************************************

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
  }
  if (finalData.length > 0) {
    let alltar = document.querySelectorAll(".suggestio");
    alltar.forEach((single) => {
      single.addEventListener("click", (e) => {
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
