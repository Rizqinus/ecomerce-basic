const productContainer = document.getElementById('product-detail');
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

async function fetchProductDetail() {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`); // Perbaiki: tambahkan backtick
    const product = await res.json();
    renderProductDetail(product);
  } catch (error) {
    productContainer.innerHTML = '<p>Gagal memuat produk</p>';
  }
}

function renderProductDetail(product) {
  productContainer.innerHTML = `
    <div>
      <img src="${product.image}" alt="${product.title}" class="w-full h-96 object-contain">
    </div>
    <div class="space-y-4">
      <h2 class="text-3xl font-bold">${product.title}</h2>
      <p class="text-gray-700">${product.description}</p>
      <p class="text-xl font-semibold text-green-600">$${product.price}</p>

      <div>
        <label class="block mb-1 font-medium">Warna</label>
        <select id="colorSelect" class="w-full p-2 border rounded">
          <option value="Merah">Merah</option>
          <option value="Biru">Biru</option>
          <option value="Hitam">Hitam</option>
        </select>
      </div>

      <div>
        <label class="block mb-1 font-medium">Ukuran</label>
        <select id="sizeSelect" class="w-full p-2 border rounded">
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <button id="decreaseQty" class="px-3 py-1 bg-gray-300 rounded">-</button>
        <span id="qty" class="px-4">1</span>
        <button id="increaseQty" class="px-3 py-1 bg-gray-300 rounded">+</button>
      </div>

      <div class="flex gap-4 mt-4">
        <button id="addToCart" class="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded">Add to Cart</button>
        <button id="buyNow" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Beli Sekarang</button>
      </div>
    </div>
  `;

  let qty = 1;
  const qtyDisplay = document.getElementById('qty');
  const decreaseBtn = document.getElementById('decreaseQty');
  const increaseBtn = document.getElementById('increaseQty');
  const addToCartBtn = document.getElementById('addToCart');
  const buyNowBtn = document.getElementById('buyNow');

  decreaseBtn.addEventListener('click', () => {
    if (qty > 1) qty--;
    qtyDisplay.textContent = qty;
  });

  increaseBtn.addEventListener('click', () => {
    qty++;
    qtyDisplay.textContent = qty;
  });

  addToCartBtn.addEventListener('click', () => {
    // Simpan ke localStorage cart
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const color = document.getElementById('colorSelect').value;
    const size = document.getElementById('sizeSelect').value;

    // Cek apakah produk dengan varian sama sudah ada
    const existing = cart.find(item => item.id == product.id && item.color == color && item.size == size);
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        color: color,
        size: size,
        quantity: qty
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Ditambahkan ke keranjang: ${product.title}\nWarna: ${color}\nUkuran: ${size}\nJumlah: ${qty}`);
  });

  buyNowBtn.addEventListener('click', () => {
    const color = document.getElementById('colorSelect').value;
    const size = document.getElementById('sizeSelect').value;
    alert(`Membeli sekarang: ${product.title}\nWarna: ${color}\nUkuran: ${size}\nJumlah: ${qty}`);
    // Bisa redirect ke halaman checkout jika diinginkan
    // window.location.href = "checkout.html";
  });
}

fetchProductDetail();