"use strict";

console.log("P09 JavaScript aktif");

const produkUmkm = [
    { nama: "Rose Latte", kategori: "Minuman Kopi", harga: 35000, stok: 7, unggulan: true},
    { nama: "Cold Brew Aren", kategori: "Minuman Kopi", harga: 23000, stok: 0, unggulan: false },
    { nama: "Caramel Macchiato", kategori: "Minuman Kopi", harga: 32000, stok: 5, unggulan: false },
    { nama: "Vanilla Latte", kategori: "Minuman Kopi", harga: 28000, stok: 5, unggulan: false },
    { nama: "Hazelnut Latte", kategori: "Minuman Kopi", harga: 30000, stok: 5, unggulan: false },
    { nama: "Matcha Latte", kategori: "Minuman Kopi", harga: 27000, stok: 10, unggulan: false },
    { nama: "Americano", kategori: "Minuman Kopi", harga: 20000, stok: 9, unggulan: false },

    { nama: "Rose Tea", kategori: "Minuman Non-kopi", harga : 22000,stok: 9, unggulan: false },
    { nama: "Thai Tea", kategori: "Minuman Non-kopi", harga: 20000, stok: 5, unggulan: false },
    { nama: "Chocolate Cream", kategori: "Minuman Non-kopi", harga: 25000, stok: 11, unggulan: false },
    { nama: "Strawberry Milk", kategori: "Minuman Non-kopi", harga: 24000, stok: 8, unggulan: false },
    { nama: "Lemon Tea", kategori: "Minuman Non-kopi", harga: 18000, stok: 5, unggulan: false },

    { nama: "Bruschetta", kategori: "Makanan Kontinental", jenis: "Appetizer", harga: 25000, stok: 5, unggulan: false },
    { nama: "Cream Soup", kategori: "Makanan Kontinental", jenis: "Appetizer", harga: 23000, stok: 6, unggulan: false },
    { nama: "Garlic Bread", kategori: "Makanan Kontinental", jenis: "Appetizer", harga: 20000, stok: 0, unggulan: false },
    { nama: "Chicken Maryland", kategori: "Makanan Kontinental", jenis : "Main Course", harga: 34000, stok: 12, unggulan: false },
    { nama: "Beef Steak", kategori: "Makanan Kontinental", jenis: "Main Course", harga: 48000, stok: 5, unggulan: false },
    { nama: "Spaghetti Bolognese", kategori: "Makanan Kontinental", jenis: "Main Course", harga: 32000, stok: 5, unggulan: false },
    { nama: "Fish and Chips", kategori: "Makanan Kontinental", jenis: "Main Course", harga: 35000, stok: 8, unggulan: false },
    { nama: "Rose Cheesecake", kategori: "Makanan Kontinental", jenis: "Dessert", harga: 27000, stok: 1, unggulan: false },
    { nama: "Chocolate Brownies", kategori: "Makanan Kontinental", jenis: "Dessert", harga: 24000, stok: 11, unggulan: false },
    { nama: "Panna Cotta", kategori: "Makanan Kontinental", jenis: "Dessert", harga: 25000, stok: 0, unggulan: false },

    { nama: "Soto Tauto Pekalongan", kategori: "Menu Lokal Nusantara", harga: 25000, stok: 7, unggulan: true },
    { nama: "Nasi Megono", kategori: "Menu Lokal Nusantara", harga: 15000, stok: 5, unggulan: false },
    { nama: "Mendoan", kategori: "Menu Lokal Nusantara", harga: 10000, stok: 12, unggulan: false },
    { nama: "Pindang Tetel", kategori: "Menu Lokal Nusantara", harga: 25000, stok: 6, unggulan: false },
    { nama: "Rendang", kategori: "Menu Lokal Nusantara", harga: 35000, stok: 8, unggulan: false },
]

console.table(produkUmkm);

produkUmkm.forEach((produk) => {
    console.log("Debug produk:", produk.nama, "stok:", produk.stok);
});

 function formatRupiah(nilai) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(nilai);
}

console.log(formatRupiah(22000));

function statusStok(stok) {
    if (stok <= 0) {
       return { label: "Habis", className: "empty" };
    }

    if (stok <= 5) {
       return { label: "Stok terbatas", className: "warning" };
    }

    return { label: "Tersedia", className: "" };
}

console.log(statusStok(0));
console.log(statusStok(3));
console.log(statusStok(12));

const produkGrid = document.querySelector("#produk-grid");
const produkStatus = document.querySelector("#produk-status");
const tombolFilter = document.querySelectorAll("[data-filter]");
const areaSubkategoriKontinental = document.querySelector(".continental-categories");
const tombolSubkategori = document.querySelectorAll("[data-subcategory]");

function labelKategori(produk) {
    switch (produk.kategori) {
        case "Minuman Kopi":
            if (produk.nama === "Rose Latte") {
                return "Perpaduan espresso, susu creamy, dan sirup mawar yang harum.";
            }
            if (produk.nama === "Cold Brew Aren") {
                return "Minuman kopi dingin dengan manis aren yang seimbang.";
            }
            break;

        case "Minuman Non-kopi":
            return "Teh rose dengan aroma bunga yang lembut dan menyegarkan.";

        case "Makanan Kontinental":
            return "Hidangan kontinental, terbuat dari ayam yang disajikan dengan Saus Béchamel.";

        case "Menu Lokal Nusantara":
            return "Soto khas Pekalongan dengan kuah tauco yang gurih dan kaya rempah.";
    }

    return "Menu pilihan Cafe Light Rose.";
}

function buatKartuProduk(produk) {
    const status = statusStok(produk.stok);

    return`
    <article class="js-product-card">
        <h3>${produk.nama}</h3>
        <p class="category-note">${produk.kategori}</p>
        <span class="stock-badge ${status.className}">${status.label}</span>
        </article>
    `;
}

function buatElemenProduk(produk) {
    const card = document.createElement("article");
    card.classList.add("product-card");

    const title = document.createElement("h3");
    title.textContent  = produk.nama;

    const category = document.createElement("p");
    category.classList.add("category-note");
    category.textContent = produk.kategori;

    const price = document.createElement("p");
    price.classList.add("price");
    price.textContent = formatRupiah(produk.harga);

    const stock = document.createElement("span");
    const status = statusStok(produk.stok);
    stock.classList.add("stock-badge");
    if (status.className) {
        stock.classList.add(status.className);
    }
    stock.textContent = status.label;

    card.append(title, category, price, stock);
    
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Sembunyikan";
    removeButton.classList.add("ghost-button");

    removeButton.addEventListener("click", () => {
       card.remove();
       produkStatus.textContent = "Satu kartu disembunyikan dari tampilan sementara.";
});

card.append(removeButton);

    return card;
}

function buatEmptyState(kategori) {
    const empty = document.createElement("p");
    empty.classList.add("empty-state");
    empty.textContent = `Belum ada produk pada kategori ${kategori}.`;
    return empty;
}

function renderProduk(kategoriAktif = "Semua", jenisAktif = "Semua") {
    if (!produkGrid || !produkStatus) {
        console.warn("Target render produk tidak ditemukan.");
        return;
    }

     let produkTampil = kategoriAktif === "Semua"
      ? produkUmkm
      : produkUmkm.filter((produk) => produk.kategori === kategoriAktif);

    if (kategoriAktif === "Makanan Kontinental" && jenisAktif !== "Semua") {
        produkTampil = produkTampil.filter((produk) => produk.jenis === jenisAktif);
    }
      produkGrid.replaceChildren();

     if (produkTampil.length === 0) {
    produkGrid.append(
        buatEmptyState(
            kategoriAktif === "Makanan Kontinental" && jenisAktif !== "Semua"
                ? jenisAktif
                : kategoriAktif
        )
    );
    produkStatus.textContent = "0 produk ditemukan.";
    return;
}
    produkTampil.forEach((produk) => {
        produkGrid.append(buatElemenProduk(produk));
    });

    produkStatus.textContent = `${produkTampil.length} produk ditampilkan.`;
}

    tombolFilter.forEach((tombol) => {
    tombol.addEventListener("click", (event) => {
        const tombolAktif = event.currentTarget;
        const kategori = tombolAktif.dataset.filter;

        tombolFilter.forEach((item) => item.classList.remove("is-active"));
        tombolAktif.classList.add("is-active");

        if (areaSubkategoriKontinental) {
            areaSubkategoriKontinental.hidden = kategori !== "Makanan Kontinental";
        }

        tombolSubkategori.forEach((item) => item.classList.remove("is-active"));

        renderProduk(kategori);
    });
});

tombolSubkategori.forEach((tombol) => {
    tombol.addEventListener("click", (event) => {
        const jenis = event.currentTarget.dataset.subcategory;

        tombolSubkategori.forEach((item) => item.classList.remove("is-active"));
        event.currentTarget.classList.add("is-active");

        renderProduk("Makanan Kontinental", jenis);
    });
});

renderProduk();
