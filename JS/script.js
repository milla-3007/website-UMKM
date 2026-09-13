const promoButton = document.querySelector("#promoButton");

promoButton.addEventListener("click", () => {
    promoButton.textContent = "promo; Beli 2 gratis tester!";
    console.log("Promo Kafe LR berhasil ditampilkan.");
});