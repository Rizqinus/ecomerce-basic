const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

const qtyInput = document.getElementById('qty-input');
const qtyMinus = document.getElementById('qty-minus');
const qtyPlus = document.getElementById('qty-plus');
const totalBarang = document.getElementById('total-barang');
const addToCartBtn = document.getElementById('add-to-cart');

let currentProduct = null; // untuk menyimpan data produk yang di-fetch

// Ambil data produk dari API
async function ambilDetail() {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    if (!res.ok) throw new Error("Produk tidak ditemukan.");

    const data = await res.json();
    currentProduct = data; // simpan produk

    document.getElementById("product-image").src = data.image;
    document.getElementById("product-image").alt = data.title;
    document.getElementById("product-title").textContent = data.title;
    document.getElementById("product-price").textContent =
       "$" + Number(data.price).toFixed(2);
    document.getElementById("product-description").textContent = data.description;

  } catch (err) {
    document.getElementById("product-title").textContent = "Produk tidak ditemukan";
    document.getElementById("product-description").textContent = err.message;
  }
}

// Fungsi update jumlah total barang
function updateTotal() {
  let qty = parseInt(qtyInput.value);
  if (isNaN(qty) || qty < 1) {
    qty = 1;
    qtyInput.value = qty;
  }
  totalBarang.textContent = qty;
}

// Event listener tombol jumlah
qtyMinus.addEventListener('click', () => {
  let current = parseInt(qtyInput.value);
  if (current > 1) {
    qtyInput.value = current - 1;
    updateTotal();
  }
});

qtyPlus.addEventListener('click', () => {
  let current = parseInt(qtyInput.value);
  qtyInput.value = current + 1;
  updateTotal();
});

qtyInput.addEventListener('input', () => {
  updateTotal();
});

// Fungsi untuk simpan ke localStorage keranjang
function tambahKeKeranjang() {
  if (!currentProduct) {
    alert("Produk belum dimuat.");
    return;
  }
  const qty = parseInt(qtyInput.value);
  if (qty < 1 || isNaN(qty)) {
    alert("Jumlah barang tidak valid.");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Cek apakah produk sudah ada di cart
  const existingIndex = cart.findIndex(item => item.id === currentProduct.id);
  if (existingIndex > -1) {
    // Update quantity jika sudah ada
    cart[existingIndex].quantity += qty;
  } else {
    // Tambah produk baru
    cart.push({
      id: currentProduct.id,
      title: currentProduct.title,
      price: Number(currentProduct.price * 15000),
      image: currentProduct.image,
      quantity: qty,
      color: "Default", // bisa diubah sesuai pilihan user jika ada
      package: "Standard" // bisa diubah sesuai pilihan user jika ada
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Produk berhasil ditambahkan ke keranjang!");
}

// Pasang event tombol Add to Cart
addToCartBtn.addEventListener('click', tambahKeKeranjang);

// Jalankan fungsi ketika DOM sudah siap
window.addEventListener('DOMContentLoaded', () => {
  ambilDetail();
  updateTotal();
});

let selectedColor = null;
let selectedSize = null;

document.querySelectorAll(".color-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".color-btn").forEach((b) =>
      b.classList.remove("bg-cyan-500", "text-white")
    );
    btn.classList.add("bg-cyan-500", "text-white");
    selectedColor = btn.dataset.color;
  });
});

document.querySelectorAll(".size-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".size-btn").forEach((b) =>
      b.classList.remove("bg-cyan-500", "text-white")
    );
    btn.classList.add("bg-cyan-500", "text-white");
    selectedSize = btn.dataset.size;
  });
});