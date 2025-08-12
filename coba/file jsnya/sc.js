async function ambilData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    const container = document.getElementById("data-product");
async function ambilData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    const container = document.getElementById("data-product");

    // Tambahkan grid untuk layout 5x5
    container.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6";

    data.forEach((produk) => {
      const card = document.createElement("div");
      card.className =
        "bg-white text-black p-4 rounded-lg shadow hover:shadow-xl hover:scale-105 transition cursor-pointer flex flex-col";

      card.innerHTML = `
        <img src="${produk.image}" alt="${produk.title}" class="w-full h-40 object-contain mb-3 img-detail" style="cursor:pointer;">
        <h3 class="font-semibold text-base mb-1 truncate">${produk.title}</h3>
        <p class="text-green-600 font-medium mb-1">Rp. ${Math.round(produk.price * 15000).toLocaleString("id-ID")}</p>
        <p class="text-sm text-gray-700 mb-3 line-clamp-2">${produk.description.substring(0, 60)}...</p>
        <button class="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Beli</button>
      `;

      // Klik gambar ke detail
      card.querySelector('.img-detail').addEventListener("click", (e) => {
        e.stopPropagation();
        window.location.href = `detail.html?id=${produk.id}`;
      });

      // Klik ke detail jika klik seluruh card (kecuali tombol dan gambar)
      card.addEventListener("click", (e) => {
        if (!e.target.closest("button") && !e.target.classList.contains("img-detail")) {
          window.location.href = `detail.html?id=${produk.id}`;
        }
      });

      // Tombol beli (supaya gak ikut klik ke detail)
      const btn = card.querySelector("button");
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        alert(`Anda membeli: ${produk.title}`);
      });

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Gagal mengambil data:", err);
    document.getElementById("data-product").innerHTML =
      `<p class="text-red-500 text-center">Gagal memuat data produk.</p>`;
  }
}

ambilData();
    // Tambahkan grid untuk layout 5x5
    container.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6";

    data.forEach((produk) => {
      const card = document.createElement("div");
      card.className =
        "bg-white text-black p-4 rounded-lg shadow hover:shadow-xl hover:scale-105 transition cursor-pointer flex flex-col";

      card.innerHTML = `
        <img src="${produk.image}" alt="${produk.title}" class="w-full h-40 object-contain mb-3">
        <h3 class="font-semibold text-base mb-1 truncate">${produk.title}</h3>
        <p class="text-green-600 font-medium mb-1">Rp. ${Math.round(produk.price * 15000).toLocaleString("id-ID")}</p>
        <p class="text-sm text-gray-700 mb-3 line-clamp-2">${produk.description.substring(0, 60)}...</p>
        <button class="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Beli</button>
      `;

      // Klik ke detail
      card.addEventListener("click", () => {
        window.location.href = `detail.html?id=${produk.id}`;
      });

      // Tombol beli (supaya gak ikut klik ke detail)
      const btn = card.querySelector("button");
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        alert(`Anda membeli: ${produk.title}`);
      });

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Gagal mengambil data:", err);
    document.getElementById("data-product").innerHTML =
      `<p class="text-red-500 text-center">Gagal memuat data produk.</p>`;
  }
}

ambilData();