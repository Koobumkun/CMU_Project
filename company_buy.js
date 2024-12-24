// Load data from localStorage
const productList = document.getElementById("product-list");
const storedProducts = JSON.parse(localStorage.getItem("products"));

document.getElementById("buy-menu-item").addEventListener("click", function () {
  window.location.href = "company_buy.html"; // Target page
});

document
  .getElementById("dashboard-menu-item")
  .addEventListener("click", function () {
    window.location.href = "company_dashboard.html"; // Target page
  });

// Render products
function renderProducts(products) {
  productList.innerHTML = "";
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
              <img src="${product.image}" alt="${product.name}">
              <h3>${product.name}</h3>
              <p>$${product.price}</p>
              <p>Stock: ${product.quantity}</p>
              <div class="quantity-group">
            <label for="quantity-${product.id}">Amount:</label>
            <input type="number" id="quantity-${product.id}" name="quantity" min="1" value="1">
            </div>
            <div class="button-group">
              <button id="buy-${product.id}">Buy</button>
            </div>
          `;

    productList.appendChild(productDiv);

    document
      .getElementById(`buy-${product.id}`)
      .addEventListener("click", () => {
        const isConfirmed = confirm("Do you want to buy?");
        if (!isConfirmed) {
          return; // 사용자가 취소를 눌렀을 경우 중단
        }

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

        // 성공 알림 표시
        alert("The transaction has been successfully completed!");
      });
  });
}

// 현재 로그인된 사용자 정보 렌더링
function renderUserName() {
  const currentUser = JSON.parse(localStorage.getItem("current_login"));

  if (currentUser && currentUser.name) {
    document.getElementById("user-name").textContent = currentUser.name;
  } else {
    document.getElementById("user-name").textContent = "Guest";
  }
}

document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", () => {
    // 모든 메뉴 항목에서 `selected` 클래스 제거
    document.querySelectorAll(".menu-item").forEach((menu) => {
      menu.classList.remove("selected");
    });

    // 클릭된 항목에 `selected` 클래스 추가
    item.classList.add("selected");
  });
});

// 초기화 시 실행
document.addEventListener("DOMContentLoaded", () => {
  renderUserName(); // 유저 이름 렌더링

  // 로그아웃 이벤트 처리
  document.getElementById("logout-section").addEventListener("click", () => {
    // 로컬스토리지에서 current_login 삭제
    localStorage.removeItem("current_login");

    // 로그인 페이지로 리다이렉트
    window.location.href = "./login.html";
  });
});

renderProducts(storedProducts);
