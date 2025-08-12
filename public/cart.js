function tampilkanCart() {
  const container = document.getElementById("data-product");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  container.innerHTML = ""; // kosongkan sebelum render ulang

  if (cart.length === 0) {
    container.innerHTML = "<p class='text-gray-500'>Keranjang kamu kosong.</p>";
    updateRingkasan(0);
    return;
  }

  cart.forEach((item, index) => {
    const el = document.createElement("div");
    el.className = "flex gap-4 border-b pb-4";

    el.innerHTML = `
      <input type="checkbox" class="self-start item-checkbox" data-index="${index}" checked />
      <img src="${item.image}" alt="${item.title}" class="w-24 h-24 object-contain" />
      <div class="flex-1">
        <h3 class="font-semibold">${item.title}</h3>
        <p class="text-sm text-gray-500">Color: ${item.color} | Package: ${item.package}</p>
        <p class="text-sm">Qty: ${item.quantity}</p>
        <p class="text-sm font-medium text-gray-700">Price: $ ${item.price.toLocaleString("id-ID")}</p>
      </div>
      <button onclick="hapusItem(${index})" class="text-red-500 text-sm hover:underline">Remove</button>
    `;
    container.appendChild(el);
  });

  // Pasang event listener untuk checkbox supaya update subtotal saat berubah
  document.querySelectorAll(".item-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", updateSubtotalByCheckbox);
  });

  // Hitung subtotal awal (semua dicentang)
  updateSubtotalByCheckbox();
}

function updateSubtotalByCheckbox() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const checkboxes = document.querySelectorAll(".item-checkbox");

  let subtotal = 0;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const index = parseInt(checkbox.dataset.index);
      const item = cart[index];
      subtotal += item.price * item.quantity;
    }
  });

  updateRingkasan(subtotal);
}

function updateRingkasan(subtotal) {
  // Misal discount 20% (kalau mau pakai)
  const delivery = 0;
  const tax = 0;
  const total = subtotal + delivery + tax;

  document.getElementById("subtotal").innerText = `$ ${subtotal.toLocaleString("id-ID")}`;
  document.querySelector("#total").innerText = `$ ${total.toLocaleString("id-ID")}`;
}

function hapusItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  tampilkanCart();
}

document.getElementById("clear-all").addEventListener("click", () => {
  localStorage.removeItem("cart");
  tampilkanCart();
});

tampilkanCart();