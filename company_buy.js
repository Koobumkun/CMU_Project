// Sample data to simulate localStorage
const products = [
  {
    id: 1,
    name: "AA Lithium Battery",
    price: 800,
    quantity: 10,
    image: "battery.jpg",
  },
  {
    id: 2,
    name: "AAA Lithium Battery",
    price: 700,
    quantity: 30,
    image: "battery.jpg",
  },
  {
    id: 3,
    name: "C Lithium Battery",
    price: 1200,
    quantity: 120,
    image: "battery.jpg",
  },
];

// Save data to localStorage
localStorage.setItem("products", JSON.stringify(products));

// Load data from localStorage
const productList = document.getElementById("product-list");
const storedProducts = JSON.parse(localStorage.getItem("products"));

// Render products
function renderProducts(products) {
  productList.innerHTML = "";
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
              <img src="${product.image}" alt="${product.name}">
              <h3>${product.name}</h3>
              <p>₩${product.price}</p>
              <p>수량: ${product.quantity}</p>
            <label for="quantity-${product.id}">수량:</label>
            <input type="number" id="quantity-${product.id}" name="quantity" min="1" value="1">
              <button id="buy-${product.id}">구매</button>
          `;

    productList.appendChild(productDiv);

    document
      .getElementById(`buy-${product.id}`)
      .addEventListener("click", () => {
        const quantityInput = document.getElementById(`quantity-${product.id}`);
        const quantity = parseInt(quantityInput.value);
        if (quantity > 0 && quantity <= product.quantity) {
          product.quantity -= quantity;

          // Save purchase information to localStorage
          const purchases = JSON.parse(localStorage.getItem("purchases")) || [];
          purchases.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            date: new Date().toISOString(),
          });
          localStorage.setItem("purchases", JSON.stringify(purchases));

          localStorage.setItem("products", JSON.stringify(storedProducts));
          renderProducts(storedProducts);
        } else {
          alert("Invalid quantity");
        }
      });
  });
}

renderProducts(storedProducts);
