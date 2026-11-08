"use strict";

console.log("P09 JavaScript aktif");

const produkUmkm = [
    { nama: "Rose Latte", kategori: "Minuman Kopi", harga: 35000, stok: 7, unggulan: true},
    { nama: "Cold Brew Aren", kategori: "Minuman Kopi", harga: 23000, stok: 0, unggulan: false },
    { nama: "Rose Tea", kategori: "Minuman Non-kopi", harga : 22000,stok: 9, unggulan: false },
    { nama: "Chicken Maryland", kategori: "Makanan Kontinental-Main course", harga: 34000, stok: 5, unggulan: false },
    { nama: "Soto Tauto Pekalongan", kategori: "Menu Lokal Nusantara", harga: 25000, stok: 5, unggulan: true },
];

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

        case "Makanan Kontinental-Main course":
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

function renderProduk() {
    const grid = document.querySelector("#produk-dinamis");
    const ringkasan = document.querySelector("#produk-ringkasan");
    const unggulan = document.querySelector("#produk-unggulan");
     
    if (!grid || !ringkasan || !unggulan) {
        return;
    }

    const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
    const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);
    const markupProduk = produkTersedia.map(buatKartuProduk).join("");

    grid.innerHTML = markupProduk;

    ringkasan.textContent = `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;


    unggulan.textContent = produkUnggulan
    ? `produk unggulan: ${produkUnggulan.nama}`
    : "belum ada produk unggulan.";

     console.table(produkUmkm); 

}

document.addEventListener("DOMContentLoaded", renderProduk);

    