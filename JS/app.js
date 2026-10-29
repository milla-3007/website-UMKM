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

const formatRupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
});

console.log(formatRupiah.format(produkUmkm[2].harga));

function statusStok(stok) {
    if (stok === 0) {
       return { label: "Habis", className: "empty" };
    }

    if (stok <= 5) {
       return { label: "Stok terbatas", className: "warning" };
    }

    return { label: "Tersedia", className: "" };
}

console.log("Stok:", produkUmkm[2].stok);
console.log("Status:", statusStok(produkUmkm[2].stok));

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


function renderProduk() {
    const grid = document.querySelector("#produk-dinamis");
    const ringkasan = document.querySelector("#produk-ringkasan");
     
    if (!grid || !ringkasan) {
        return;
    }

    let jumlahTersedia = 0;
    let markup = "";

    for (const produk of produkUmkm) {
        const status = statusStok(produk.stok);
        const labelUnggulan = produk.unggulan
            ? `<span class="product-badge">Produk Unggulan</span>`
            : "";
        const kategori = labelKategori(produk);
        const labelAksi = produk.stok > 0
         ? "Siap dipesan"
         : "Hubungi admin";

        if (produk.stok > 0) {
            jumlahTersedia = jumlahTersedia + 1;
        }

        markup = markup + `
        <article class="js-product-card">
           <h3>${produk.nama}</h3>
           <p>${kategori}</p>
           <p class="price">${formatRupiah.format(produk.harga)}</p>
           <span class="stock-badge ${status.className}">${status.label}</span>
           <p>${labelAksi}</p>
           ${labelUnggulan}
        </article>
      `;
    }

    grid.innerHTML = markup;
    ringkasan.textContent = `${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data.`;
}

document.addEventListener("DOMContentLoaded", renderProduk);
