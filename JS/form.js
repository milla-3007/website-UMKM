const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  preview.textContent = [
    `Nama: ${data.get("nama")}`,
    `Email: ${data.get("email")}`,
    `Kategori: ${data.get("kategori")}`,
    `Menu: ${data.get("menu-produk")}`,
    `Topik: ${data.get("topik")}`,
    `Pesan: ${data.get("pesan")}`,
    `WhatsApp: ${data.get("whatsApp")}`,
    `Waktu kontak: ${data.get("waktu")}`,
  ].join("\n");
});