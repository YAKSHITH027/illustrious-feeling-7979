const baseURL = "https://relince-data-sever-fp05-318.onrender.com/products";
let cat = localStorage.getItem("category").toLowerCase() || "mobile";
const getRequest = async (URL, page_num = 1, cat = "") => {
  try {
    let res = await fetch(`${URL}?${cat}_limit=6&_page=${page_num}`);
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
getRequest(baseURL, 1, `category=${newCat}&`);

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
};
