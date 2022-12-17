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
            <button class="add-cart">add to cart</button>
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
};
