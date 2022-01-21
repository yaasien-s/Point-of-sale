let products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : [
      {
        title: "HP Chromebook",
        category: "Laptop",
        price: 5499.00,
        img: "https://www.hpshop.co.za/media/catalog/product/cache/63689dd856b78a7afdd4a03117abe73a/5/0/502z4ea_1.jpg",
      },
      {
        title: "HP Chromebook x360 i3",
        category: "Laptop",
        price: 14999.00,
        img: "https://www.hpshop.co.za/media/catalog/product/cache/63689dd856b78a7afdd4a03117abe73a/4/u/4u0d4ea_1.jpg",
      },
      {
        title: "lenovo intel core i5 laptop",
        category: "Laptop",
        price: 7999.00,
        img: "https://www.game.co.za/medias/816853-EA-1200x1200.jpg?context=bWFzdGVyfGltYWdlc19vbmVjb218MjQyOTMzfGltYWdlL2pwZWd8aDc5L2hjOS84ODgzMDk0NDU0MzAyLmpwZ3xiNzEzODY4NjA2ZDg5MzExMjI2OTc1YmE5YzlkOTI5OWFlMzFkYzg1OWZhMGY5NTdlZGE1MjAxZjEzZDc1NTdh",
      },
      {
        title: "Huawei MateBook i5",
        category: "Laptop",
        price: 13999.00,
        img: "https://www.incredible.co.za/media/catalog/product/cache/7ce9addd40d23ee411c2cc726ad5e7ed/N/5/N5_b9f3.jpg",
      },
      {
        title: "Acer Nitro 5 i5 10300H ",
        category: "Laptop",
        price: 16999.00,
        img: "https://www.incredible.co.za/media/catalog/product/cache/7ce9addd40d23ee411c2cc726ad5e7ed/A/c/Acer_Nitro_5_AN515_54_wp_01_b443.jpg",
      },
      {
        title: "ASUS X409 Core i7 8565U",
        category: "Laptop",
        price: 14999.00,
        img: "https://www.everyshop.co.za/media/catalog/product/cache/ea1c1d49663f18175f3f3520f39859aa/7/J/7JhWRdhLRFFBrj9H_setting_xxx_0_90_end_1000_6cbe.jpg",
      },
    ];

let cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// READ
function readProducts(products) {
  document.querySelector("#products").innerHTML = "";
  products.forEach((product, position) => {
    document.querySelector("#products").innerHTML += `
      <div class="card">
        <img src="${product.img}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">R${product.price}</p>
          <div class="d-flex mb-3">
            <input type="number" class="form-control" value=1 min=1 id="addToCart${position}">
            <button type="button" class="btn btn-secondary ms-3" onclick="addToCart(${position})"><i class="fas fa-cart-plus"></i></button>
          </div>
          
          
          
          </div>
          <div class="d-flex justify-content-end card-footer">
            <button type="button" class="btn btn-primary w-50" data-bs-toggle="modal" data-bs-target="#editProduct${position}" >
              Edit
            </button>
            <button type="button" class="btn btn-danger w-50 ms-3" onclick="deleteProduct(${position})" >
              Delete
            </button>
          </div>
      </div>
      <div
                class="modal fade"
                id="editProduct${position}"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Edit ${product.title}
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label for="editTitle${position}" class="form-label">Title</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editTitle${position}"
                          id="editTitle${position}"
                          value="${product.title}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editCategory${position}" class="form-label">Category</label>
                        <select
                          class="form-select"
                          name="editCategory${position}"
                          id="editCategory${position}"
                        >
                          <option value="Fruit">Fruit</option>
                          <option value="Vegetables">Vegetables</option>
                          <option value="Meat">Meat</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="editPrice${position}" class="form-label">Price</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editPrice${position}"
                          id="editPrice${position}"
                          value="${product.price}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editImg${position}" class="form-label">Image URL</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editImg${position}"
                          id="editImg${position}"
                          value="${product.img}"
                        />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        onclick="updateProduct(${position})"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
    `;
  });
}

readProducts(products);
showCartBadge();

// CREATE
function createProduct() {
  let title = document.querySelector("#addTitle").value;
  let category = document.querySelector("#addCategory").value;
  let price = document.querySelector("#addPrice").value;
  let img = document.querySelector("#addImg").value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products.push({
      title,
      category,
      price,
      img,
    });
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// UPDATE
function updateProduct(position) {
  let title = document.querySelector(`#editTitle${position}`).value;
  let category = document.querySelector(`#editCategory${position}`).value;
  let price = document.querySelector(`#editPrice${position}`).value;
  let img = document.querySelector(`#editImg${position}`).value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products[position] = {
      title,
      category,
      price,
      img,
    };
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// DELETE
function deleteProduct(position) {
  let confirmation = confirm(
    "Are you sure you want to delete the selected product?"
  );

  if (confirmation) {
    products.splice(position, 1);
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  }
}

// ADD TO CART
function addToCart(position) {
  let qty = document.querySelector(`#addToCart${position}`).value;
  let added = false;
  cart.forEach((product) => {
    if (product.title == products[position].title) {
      alert(
        `You have successfully added ${qty} ${products[position].title} to the cart`
      );
      product.qty = parseInt(product.qty) + parseInt(qty);
      added = true;
    }
  });
  if (!added) {
    cart.push({ ...products[position], qty });
    alert(
      `You have successfully added ${qty} ${products[position].title} to the cart`
    );
  }

  showCartBadge();

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update Cart Badge
function showCartBadge() {
  document.querySelector("#badge").innerHTML = cart ? cart.length : "";
}

// SORT BY CATEGORY
function sortCategory() {
  let category = document.querySelector("#sortCategory").value;

  if (category == "All") {
    return readProducts(products);
  }

  let foundProducts = products.filter((product) => {
    return product.category == category;
  });

  readProducts(foundProducts);
  console.log(foundProducts);
}

// SORT BY NAME

function sortName() {
  let direction = document.querySelector("#sortName").value;

  let sortedProducts = products.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  if (direction == "descending") sortedProducts.reverse();
  console.log(sortedProducts);
  readProducts(products);
}

// SORT BY PRICE

function sortPrice() {
  let direction = document.querySelector("#sortPrice").value;

  let sortedProducts = products.sort((a, b) => a.price - b.price);

  console.log(sortedProducts);

  if (direction == "descending") sortedProducts.reverse();
  readProducts(sortedProducts);
}