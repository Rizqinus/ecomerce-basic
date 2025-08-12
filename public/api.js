async function ambilData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    const container = document.getElementById("data-product");

    container.classList.add("grid", "grid-cols-2", "md:grid-cols-3", "lg:grid-cols-4", "gap-6");

    data.forEach((post) => {
  const postElement = document.createElement("div");
  postElement.className = "bg-white rounded-lg p-4 border border-gray-200 shadow hover:shadow-lg cursor-pointer"; // tambahkan cursor-pointer

  postElement.innerHTML = `
    <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-contain mb-2" />
    <h3 class="text-base font-semibold mb-1 line-clamp-2">${post.title}</h3>
    <p class="text-sm text-gray-600 line-clamp-3 mb-2">${post.description}</p>
    <p class="text-sm font-medium text-gray-800">Price: $${post.price}</p>
    <p class="text-sm text-gray-500">Category: ${post.category}</p>
    <p class="text-sm text-yellow-500">Rating: ${post.rating.rate} (${post.rating.count} reviews)</p>
    <div class="mt-3 flex flex-col gap-2">
      <button 
        class="buy-now bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        data-id="${post.id}"
      >
        Buy Now
      </button>
      <button 
        class="add-cart bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        data-id="${post.id}"
      >
        Add to Cart
      </button>
    </div>
  `;

  // Event: klik pada card (kecuali tombol)
  postElement.addEventListener("click", (e) => {
    if (!e.target.classList.contains("buy-now") && !e.target.classList.contains("add-cart")) {
      window.location.href = `detail.html?id=${post.id}`;
    }
  });

  container.appendChild(postElement);
});

 
    // Event listener untuk tombol Buy Now
    document.querySelectorAll(".buy-now").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        window.location.href = `detail.html?id=${id}`;
      });
    });

// Event listener untuk tombol Add to Cart
document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.id;
    // Cari produk yang sesuai
    const product = data.find(item => item.id == id);
    if (!product) return;

    // Ambil cart dari localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Cek apakah produk sudah ada di cart
    const existing = cart.find(item => item.id == id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    // Simpan kembali ke localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produk ditambahkan ke keranjang!");
  });
});

    console.log("Data yang diambil:", data);
  } catch (error) {
    console.log("Data Error:", error);
  }
}

ambilData();