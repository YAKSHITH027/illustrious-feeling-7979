const baseURL = "https://relince-data-sever-fp05-318.onrender.com/products";
const productsDataContainer = document.querySelector(".products-data");

// main GET

const mainGET = async (URL) => {
  let res = await fetch(URL);
  let data = await res.json();
  let unique = data.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
      acc.push(item.category);
    }
    return acc;
  }, []);
  console.log(unique);
  sortCategory(unique);
};
mainGET(baseURL);
// GET request form the product

const getRequest = async (URL, page_num = 1) => {
  try {
    let res = await fetch(`${URL}?_limit=6&_page=${page_num}`);
    let data = await res.json();

    let total = res.headers.get("x-total-count");
    let totalPage = Math.ceil(total / 6);

    renderProduct(data);
    renderPagination(totalPage);
    colorChange();
  } catch (error) {
    console.log(error);
  }
};
getRequest(baseURL);

// POST request for the product

const postRequest = async (data) => {
  try {
    let res = await fetch(baseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(res);
    getRequest(baseURL);
  } catch (error) {
    console.log(error);
  }
};

// PATCH request

const patchRequest = async (id, data) => {
  try {
    let res = await fetch(`${baseURL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(res);
    getRequest(baseURL);
  } catch (error) {
    console.log(error);
  }
};

// DELETE request

const deleteRequest = async (id) => {
  try {
    let res = await fetch(`${baseURL}/${id}`, {
      method: "DELETE",
    });
    console.log(res);
    getRequest(baseURL);
  } catch (error) {
    console.log(error);
  }
};

// Rendering the data of GET request

const renderProduct = (data) => {
  let newData = data.map((item) => {
    let category = item.category;
    let desc = item.description;
    let id = item.id;
    let image = item.image;
    let price = item.price;
    let quntity = item.rating.count;
    let title = item.title;
    return `
                <div class="single-product-data" data-id="${id}">
                    <div class="single-img">
                        <img
                        src=${image}
                        alt=${title}
                        id="hold-img"
                        />
                    </div>
                    <input type="text" id="title-id" value=${title} readonly />
                    <input type="text" id="category-id" value=${category} readonly />
                    <input type="text" id="price-id" value="${price}" readonly />
                    <input type="text" id="quntity-id" value="${quntity}" readonly />
                    <div>
                        <button class="edit" data-id="${id}">edit</button>
                    </div>
                    <div>
                        <button class="delete" data-id=${id}>delete</button>
                    </div>
                    </div>   
            `;
  });

  productsDataContainer.innerHTML = newData.join("");

  // edit product

  const editProduct = document.querySelectorAll(".edit");
  editProduct.forEach((singleEdit) => {
    singleEdit.addEventListener("click", (e) => {
      const title =
        e.target.parentElement.parentElement.querySelector("#title-id");
      const category =
        e.target.parentElement.parentElement.querySelector("#category-id");
      const price =
        e.target.parentElement.parentElement.querySelector("#price-id");
      const quntity =
        e.target.parentElement.parentElement.querySelector("#quntity-id");

      const targetText = e.target.innerText;
      if (targetText == "Edit") {
        e.target.innerText = "Save";
        title.removeAttribute("readonly");
        category.removeAttribute("readonly");
        price.removeAttribute("readonly");
        quntity.removeAttribute("readonly");
        title.focus();
      } else {
        e.target.innerText = "Edit";
        title.readOnly = true;
        category.readOnly = true;
        price.readOnly = true;
        quntity.readOnly = true;
        const changedData = {
          title: title.value,
          category: category.value,
          price: Number(price.value),
          quntity: Number(quntity.value),
        };
        const editId = e.target.dataset.id;
        // patchRequest(editId, changedData);
        // console.log(changedData);
      }
    });
  });

  //   delete product

  const deleteProduct = document.querySelectorAll(".delete");
  deleteProduct.forEach((singleDelete) => {
    singleDelete.addEventListener("click", (e) => {
      const deleteId = +e.target.dataset.id;
      //   deleteRequest(deleteId);
    });
  });
};

// getting the data from the form

const productForm = document.querySelector("#form");

const getData = (e) => {
  e.preventDefault();

  const title = document.querySelector(".form-title-in").value;
  const price = document.querySelector(".form-price-in").value;
  const description = document.querySelector(".form-desc-in").value;
  const category = document.querySelector(".form-category-in").value;
  const image = document.querySelector(".form-img-in").value;
  const quntity = document.querySelector(".form-qun-in").value;
  const rating = { rate: 4.6, count: quntity };
  const productObj = {
    title,
    price,
    category,
    description,
    image,
    rating,
  };
  //   postRequest(productObj);
  console.log(productObj);
};

productForm.addEventListener("submit", getData);

// Pagination rendering

const pagContainer = document.querySelector(".pagination-container");
const renderPagination = (totalPage) => {
  const pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(` <button class="pag-btn" data-id="${i}">${i}</button>`);
  }
  pagContainer.innerHTML = pages.join("");
  let allpag = document.querySelectorAll(".pag-btn");
  allpag.forEach((singleBtn) => {
    singleBtn.addEventListener("click", (e) => {
      let pageNum = e.target.dataset.id;
      getRequest(baseURL, pageNum);
    });
  });
};

const colorChange = () => {
  let allpag = document.querySelectorAll(".pag-btn");
  allpag.forEach((singleBtn) => {
    singleBtn.addEventListener("click", (e) => {
      removeColor();
      e.target.style.backgroundColor = "black";
      e.target.style.color = "white";
      console.log(pageNum, e.target);
    });
  });
  function removeColor() {
    allpag.forEach((item) => {
      item.style.backgroundColor = "white";
    });
  }
};

// append sort option

const sortCategory = (data) => {
  let appendOption = document.querySelector("#sort-category");
  let options = data.map((item) => {
    return `
            <option value="${item}">${item}</option>
         `;
  });
  appendOption.innerHTML = options.join("");
};
