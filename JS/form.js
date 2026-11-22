const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview-form");
const formFeedback = document.querySelector("#form-feedback");
const fields = ["nama", "email", "menu-produk", "pesan", "whatsApp", "setuju"]
  .map((id) => document.querySelector(`#${id}`));

const topikInputs = document.querySelectorAll('input[name="topik"]');

console.log(fields);

function getFieldError(field) {
  const validity = field.validity;

  if (validity.valueMissing) return "Bagian ini wajib diisi.";
  if (validity.typeMismatch) return "Format data belum sesuai.";
  if (validity.tooShort) return `Isi minimal ${field.minLength} karakter.`;
  if (validity.patternMismatch) return "Format belum sesuai contoh yang diminta.";

  return "";
}

function tampilkanError(field, pesan) {
  const error = document.querySelector(`#${field.id}-error`);
  field.setCustomValidity(pesan);
  field.setAttribute("aria-invalid", pesan ? "true" : "false");

  if (error) {
    error.textContent = pesan;
  }
}

function validasiField(field) {
  field.setCustomValidity("");
  const pesan = getFieldError(field);
  tampilkanError(field, pesan);
  return pesan === "";
}

const STORAGE_KEY = "cafe-light-rose-preferensi-kontak";

function simpanPreferensi() {
  const data = new FormData(form);

  const preferensi = {
    menu: data.get("menu-produk"),
    topik: data.get("topik"),
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferensi));
}

function muatPreferensi() {
  try {
    const tersimpan = localStorage.getItem(STORAGE_KEY);
    if (!tersimpan) return;

    const preferensi = JSON.parse(tersimpan);

    document.querySelector("#menu-produk").value = preferensi.menu ?? "";

    const topik = document.querySelector(
      `input[name="topik"][value="${preferensi.topik}"]`
    );

    if (topik) topik.checked = true;
  } catch (error) {
    console.warn("Preferensi tidak valid.", error);
    localStorage.removeItem(STORAGE_KEY);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const semuaValid = fields.every((field) => validasiField(field));
  const topikValid = Array.from(topikInputs).some((input) => input.checked);
  
  if (!semuaValid || !topikValid || !form.checkValidity()) {
    formFeedback.textContent = "Periksa kembali bagian yang ditandai.";
    formFeedback.classList.remove("success");

    form.reportValidity();
    form.querySelector(":invalid")?.focus();
    return;
  }
  
  simpanPreferensi();

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

  formFeedback.textContent = "Form valid. Preview berhasil dibuat.";
  formFeedback.classList.add("success");
});

muatPreferensi();